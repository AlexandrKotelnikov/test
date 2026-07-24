from pathlib import Path
import subprocess
import sys
import unittest

ROOT = Path(__file__).resolve().parents[1]


class RepositoryTests(unittest.TestCase):
    def test_validator(self):
        result = subprocess.run(
            [sys.executable, str(ROOT / "tools" / "validate_repository.py")],
            cwd=ROOT,
            text=True,
            capture_output=True,
        )
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)

    def test_skill_files_are_portable_text(self):
        for relative in [
            "skills/astrolabe/SKILL.md",
            "skills/project-atlas/SKILL.md",
        ]:
            path = ROOT / relative
            self.assertLess(path.stat().st_size, 100_000)
            text = path.read_text(encoding="utf-8")
            self.assertNotIn("required external server", text.lower())

    def test_reports_preserve_invalid_result(self):
        report = (ROOT / "experiments/reports/03-micro-recovery.md").read_text(encoding="utf-8")
        self.assertIn("MEASUREMENT_INVALID", report)


if __name__ == "__main__":
    unittest.main()
