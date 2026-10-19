import json
import tempfile
import unittest
from pathlib import Path
from session_usage import buckets, collect, stamp


class UsageTests(unittest.TestCase):
    start = stamp('2026-10-18T23:00:00Z')
    end = stamp('2026-10-19T23:00:00Z')

    def run_records(self, records, provider='codex', copies=1):
        with tempfile.TemporaryDirectory() as tmp:
            paths = []
            for i in range(copies):
                p = Path(tmp) / f'{i}.jsonl'
                p.write_text(''.join(json.dumps(e) + '\n' for e in records))
                paths.append(p)
            return collect(paths, provider, self.start, self.end)

    def codex(self, when='2026-10-19T08:00:00Z', rid='response-one'):
        return [
            dict(type='session_meta', payload=dict(id='root', cwd='/example')),
            dict(type='turn_context', payload=dict(turn_id='turn', model='example-model')),
            dict(type='token_usage_record', timestamp=when, payload=dict(
                thread_id='root', turn_id='turn', response_id=rid,
                usage=dict(input_tokens=100, cached_input_tokens=60, output_tokens=20, reasoning_output_tokens=10))),
            dict(type='event_msg', timestamp=when, payload=dict(type='token_count',
                info=dict(total_token_usage=dict(input_tokens=999999)))),
        ]

    def test_duplicate_files_and_cumulative_counters_not_added(self):
        result = self.run_records(self.codex(), copies=2)
        row = result['sessions'][0]['usage'][0]
        self.assertEqual((row['total'], row['input'], row['cached_read'], row['requests']), (120, 40, 60, 1))
        self.assertIsNone(result['sessions'][0]['human_duration_seconds'])

    def test_local_day_filter_excludes_old_and_future_requests(self):
        data = self.codex('2026-10-18T22:59:59Z','old') + self.codex() + self.codex('2026-10-19T23:00:00Z','next')
        self.assertEqual(self.run_records(data)['sessions'][0]['usage'][0]['total'], 120)

    def test_runtime_is_clipped_at_day_boundary(self):
        data = self.codex() + [dict(type='event_msg', timestamp='2026-10-18T23:01:00Z',
            payload=dict(type='task_complete', turn_id='turn', duration_ms=120000))]
        self.assertEqual(self.run_records(data)['sessions'][0]['completed_agent_execution_seconds'], 60)

    def test_fork_first_identity_is_not_overwritten(self):
        data = [dict(type='session_meta', payload=dict(id='child', parent_thread_id='root'))] + self.codex()
        data[3]['payload']['thread_id'] = 'child'
        self.assertEqual(self.run_records(data)['sessions'][0]['parent_session_id'], 'root')

    def test_claude_streaming_snapshots_count_once(self):
        data = [dict(type='assistant', timestamp=f'2026-10-19T08:00:0{i}Z', sessionId='claude-one',
            message=dict(id='message-one', model='example-model', usage=dict(input_tokens=2,
                cache_read_input_tokens=40, cache_creation_input_tokens=10, output_tokens=output)))
                for i,output in [(1,5),(2,9)]]
        row = self.run_records(data,'claude')['sessions'][0]['usage'][0]
        self.assertEqual((row['total'],row['requests']), (61,1))

    def test_invalid_cached_tokens_rejected(self):
        with self.assertRaises(ValueError):
            buckets(dict(input_tokens=10,cached_input_tokens=11),'codex')

    def test_inherited_completion_owned_by_request_thread(self):
        data = [dict(type='session_meta', payload=dict(id='child', parent_thread_id='root'))] + self.codex()
        data.append(dict(type='event_msg', timestamp='2026-10-19T08:01:00Z',
            payload=dict(type='task_complete', turn_id='turn', duration_ms=60000)))
        result = self.run_records(data)
        self.assertEqual(result['sessions'][0]['session_id'], 'root')
        self.assertEqual(result['sessions'][0]['completed_agent_execution_seconds'], 60)

    def test_claude_cross_midnight_snapshots_excluded_in_either_order(self):
        data = [dict(type='assistant', timestamp=t, sessionId='claude-one',
            message=dict(id='message-one', usage=dict(input_tokens=10, output_tokens=20)))
            for t in ['2026-10-18T22:59:59Z','2026-10-18T23:00:01Z']]
        for records in [data, list(reversed(data))]:
            result = self.run_records(records, 'claude')
            self.assertEqual(result['sessions'], [])
            self.assertTrue(result['warnings'])

    def test_missing_counters_are_not_zero(self):
        with self.assertRaises(ValueError):
            buckets({}, 'codex')


if __name__ == '__main__':
    unittest.main()
