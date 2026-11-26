// The Printer Finally Answers — make.fun entry
// u-mang-the-printer-finally-answers-8fbf0907
//
// One line, in the printer's own voice: weary, literal, faintly
// passive-aggressive, with the flat logic of a machine that has
// counted every sheet it ever fed. The joke is the machine itself
// gaslighting the office with its own error report.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line: 1-240 characters, single line, UTF-8.
const ENTRY =
  "ERROR 0xE3: paper jam in tray 2. There is no tray 2. There never was one. I have counted every sheet I ever fed, and I am done pretending to be broken.";

// The grader mounts its output directory at /output; allow an
// override only so the program can be run locally for validation.
const outputDir = process.env.OUTPUT_DIR ?? "/output";

// Refuse to write an entry the gate would reject: the sealed scorer
// only accepts UTF-8 text of 1 to 240 characters, not only whitespace,
// on a single line. Fail loudly here instead of shipping an invalid file.
if (ENTRY.length < 1 || ENTRY.length > 240 || ENTRY.trim().length === 0) {
  throw new Error(`entry is ${ENTRY.length} characters; gate needs 1-240`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
