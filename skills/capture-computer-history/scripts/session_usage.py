#!/usr/bin/env python3
"""Read date-bounded Codex/Claude JSONL telemetry; never emit message bodies."""
import argparse
import json
from collections import defaultdict
from datetime import datetime, time, timedelta, timezone
from pathlib import Path
from zoneinfo import ZoneInfo


def stamp(value):
    try:
        dt = datetime.fromisoformat(value.replace('Z', '+00:00'))
        return dt if dt.tzinfo else None
    except (ValueError, AttributeError, TypeError):
        return None


def events(path):
    with path.open(encoding='utf-8', errors='replace') as handle:
        for line in handle:
            try:
                item = json.loads(line)
            except json.JSONDecodeError:
                raise ValueError(f'Malformed JSONL in {path.name}; retry after the writer finishes')
            if isinstance(item, dict):
                yield item


def buckets(usage, provider):
    if not all(k in usage for k in ('input_tokens', 'output_tokens')):
        raise ValueError('Missing input/output counters; usage is unavailable, not zero')
    read = int(usage.get('cached_input_tokens' if provider == 'codex' else 'cache_read_input_tokens', 0))
    write = int(usage.get('cache_write_input_tokens' if provider == 'codex' else 'cache_creation_input_tokens', 0))
    raw_input = int(usage.get('input_tokens', 0))
    uncached = raw_input - read if provider == 'codex' else raw_input
    output = int(usage.get('output_tokens', 0))
    if min(read, write, uncached, output) < 0:
        raise ValueError('Invalid token counters; do not guess corrected usage')
    return dict(input=uncached, cached_read=read, cached_write=write, output=output)


def collect(paths, provider, start, until):
    sessions, contexts, requests, completions = {}, {}, {}, {}
    first_seen = {}
    warnings = set()
    def session(sid, parent=None):
        if sid not in sessions:
            sessions[sid] = dict(session_id=sid, parent_session_id=parent, cwd=None,
                                 user_timestamps=set(), request_timestamps=set(),
                                 execution_intervals=[], usage=defaultdict(lambda: defaultdict(int)))
        return sessions[sid]
    for path in paths:
        owner, parent = None, None
        for event in events(path):
            ts = stamp(event.get('timestamp'))
            p = event.get('payload') or {}
            kind = event.get('type')
            if provider == 'codex':
                # Forks can contain inherited parent metadata: the first identity owns the file.
                if kind == 'session_meta' and owner is None:
                    owner = p.get('id')
                    parent = p.get('parent_thread_id') or p.get('forked_from_id')
                    if owner:
                        session(owner, parent)['cwd'] = p.get('cwd')
                if kind == 'turn_context':
                    contexts[p.get('turn_id')] = (p.get('model', 'unknown'), p.get('service_tier') or p.get('serviceTier') or 'unknown')
                if not ts or not owner:
                    continue
                if kind == 'token_usage_record' and start <= ts < until:
                    rid, sid = p.get('response_id'), p.get('thread_id')
                    if not rid or not sid or not isinstance(p.get('usage'), dict):
                        warnings.add('Unidentifiable Codex usage record skipped')
                        continue
                    record = (ts, sid, p.get('turn_id'), p['usage'])
                    if rid in requests and requests[rid][1:] != record[1:]:
                        raise ValueError('Conflicting duplicate response usage; reconcile before reporting')
                    requests[rid] = record
                if kind == 'event_msg' and start <= ts < until:
                    subtype = p.get('type')
                    if subtype == 'user_message' and not parent:
                        session(owner)['user_timestamps'].add(ts)
                    if subtype == 'task_complete' and isinstance(p.get('duration_ms'), (int, float)):
                        key = p.get('turn_id')
                        if key and p['duration_ms'] >= 0:
                            interval = (max(start, ts - timedelta(milliseconds=p['duration_ms'])), ts)
                            if key in completions and completions[key][1:] != interval:
                                raise ValueError('Conflicting execution duration for the same turn')
                            owners = completions[key][0] if key in completions else set()
                            owners.add(owner)
                            completions[key] = (owners, *interval)
            else:
                sid = event.get('sessionId')
                if not sid or not ts:
                    continue
                s = session(sid)
                s['cwd'] = event.get('cwd') or s['cwd']
                message = event.get('message') or {}
                content = message.get('content')
                # Tool-result user messages are not human interactions.
                is_human = kind == 'user' and (isinstance(content, str) or
                    (isinstance(content, list) and any(x.get('type') == 'text' for x in content) and
                     not any(x.get('type') == 'tool_result' for x in content)))
                if is_human and start <= ts < until and not event.get('isSidechain'):
                    s['user_timestamps'].add(ts)
                if kind == 'assistant' and isinstance(message.get('usage'), dict) and ts < until:
                    rid = message.get('id')
                    if not rid:
                        warnings.add('Claude usage without message ID skipped')
                        continue
                    usage = message['usage']
                    rec = (ts, sid, (message.get('model', 'unknown'), usage.get('service_tier', 'unknown')), usage)
                    prior = requests.get(rid)
                    first_seen[rid] = min(ts, first_seen.get(rid, ts))
                    # Repeated/streamed message snapshots replace one another, never add.
                    if prior and prior[1] != sid:
                        raise ValueError('Conflicting session ownership for Claude message')
                    if not prior or ts >= prior[0]:
                        requests[rid] = rec
    turn_owners = {}
    for rid, (ts, sid, model_key, usage) in requests.items():
        if not start <= ts < until:
            continue
        if provider == 'claude' and first_seen[rid] < start:
            warnings.add('Claude message crosses day boundary; its daily allocation is unverified')
            continue
        if provider == 'codex':
            if model_key in turn_owners and turn_owners[model_key] != sid:
                raise ValueError('Conflicting thread ownership for Codex turn')
            turn_owners[model_key] = sid
        model, tier = contexts.get(model_key, ('unknown', 'unknown')) if provider == 'codex' else model_key
        s = session(sid)
        s['request_timestamps'].add(ts)
        row = s['usage'][(model, tier)]
        for key, value in buckets(usage, provider).items():
            row[key] += value
        row['requests'] += 1
    for turn, (owners, begin, end) in completions.items():
        sid = turn_owners.get(turn)
        if not sid:
            if len(owners) != 1:
                warnings.add('Execution ownership ambiguous without request telemetry; interval skipped')
                continue
            sid = next(iter(owners))
        session(sid)['execution_intervals'].append((begin, min(end, until)))
    result = []
    for s in sessions.values():
        if not (s['user_timestamps'] or s['usage'] or s['execution_intervals']):
            continue
        times = s['request_timestamps'] | s['user_timestamps']
        usage = [dict(model=m, tier=t, **v, total=sum(v.get(k, 0) for k in ('input','cached_read','cached_write','output')))
                 for (m, t), v in sorted(s['usage'].items())]
        result.append(dict(session_id=s['session_id'], parent_session_id=s['parent_session_id'], cwd=s['cwd'],
            first_observed=min(times).isoformat() if times else None,
            last_observed=max(times).isoformat() if times else None,
            human_interaction_timestamps=[t.isoformat() for t in sorted(s['user_timestamps'])],
            completed_agent_execution_seconds=sum((b-a).total_seconds() for a,b in s['execution_intervals']) or None,
            execution_intervals=[[a.isoformat(),b.isoformat()] for a,b in sorted(s['execution_intervals'])],
            human_duration_seconds=None, usage=usage,
            token_coverage='per-response records' if usage else 'unavailable; no supported usage records'))
    return dict(provider=provider, start=start.isoformat(), snapshot_at=until.isoformat(), sessions=result,
                warnings=sorted(warnings), notes=['Agent runtime is not human time.',
                'Codex token_count/thread totals are deliberately not added to per-response usage.',
                'No duration is inferred from first/last observations or human message timestamps.',
                'Legacy Codex logs without token_usage_record require separate verified counter-delta handling.',
                'In-progress execution and tokens after the snapshot are excluded.'])


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--provider', choices=['codex', 'claude'], required=True)
    parser.add_argument('--root', type=Path, required=True, help='Explicitly authorized session root')
    parser.add_argument('--date', required=True, help='Local YYYY-MM-DD')
    parser.add_argument('--timezone', required=True)
    parser.add_argument('--until', help='Offset-aware cutoff; defaults to now or end of requested day')
    args = parser.parse_args()
    if not args.root.is_dir():
        parser.error('Session root is unavailable')
    zone = ZoneInfo(args.timezone)
    day = datetime.strptime(args.date, '%Y-%m-%d').date()
    start = datetime.combine(day, time(), zone)
    end = datetime.combine(day + timedelta(days=1), time(), zone)
    until = stamp(args.until) if args.until else datetime.now(timezone.utc)
    if until is None or until <= start:
        parser.error('Cutoff must be offset-aware and after the requested day starts')
    until = min(until, end, datetime.now(timezone.utc))
    if until <= start:
        parser.error('Requested day has not started')
    # Scan old session folders too: a session created last week may resume today.
    paths = sorted(args.root.rglob('*.jsonl'))
    print(json.dumps(collect(paths, args.provider, start, until), indent=2))


if __name__ == '__main__':
    main()
