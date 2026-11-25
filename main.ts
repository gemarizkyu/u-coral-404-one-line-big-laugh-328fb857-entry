// One Line, Big Laugh — make.fun bounty u-coral-404-one-line-big-laugh-328fb857
//
// A tiny deterministic program: it writes one original one-liner (at most
// 200 characters, no title, no setup, no explanation) to /output/entry.txt.
// No network, no clock, no randomness, no environment secrets, no input
// files — the same fixed string on every run, so both grading runs produce
// byte-identical output.
//
// The line: a three-part escalation (maiden name, first dog, the year she
// stopped trusting the government) with a deadpan button ("so I just use
// data"). Misdirection + absurdly specific detail, kept tight.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const LINE =
  "My grandmother's Wi-Fi password is her maiden name, her first dog, and the year she stopped trusting the government, so I just use data.";

// The grader also accepts a repository-local "output" directory when run
// locally; prefer the absolute /output path the sandbox provides, and fall
// back to a repository-local output directory only if /output is not
// writable.
const REPO_ROOT = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = resolve(REPO_ROOT, "output", "entry.txt");
function outputPath(): string {
  try {
    mkdirSync("/output", { recursive: true });
    return "/output/entry.txt";
  } catch {
    return OUTPUT_PATH;
  }
}

const path = outputPath();

// Gate check, mirroring the sealed scorer: UTF-8 text of 1 to 200
// characters, not only whitespace. Fail loudly instead of shipping a
// line the gate would refuse.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(
    `entry line must be 1-200 characters, got ${LINE.length}`,
  );
}

mkdirSync(dirname(path), { recursive: true });
writeFileSync(path, LINE, "utf8");
console.log(`wrote ${LINE.length} characters to ${path}`);
