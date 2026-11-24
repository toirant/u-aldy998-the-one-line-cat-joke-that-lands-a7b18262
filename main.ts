// The One-Line Cat Joke That Lands — make.fun entry.
//
// Writes a single cat joke, one line under 200 characters, to
// /output/entry.txt. The joke: the cat knocks the phone off the table,
// watches it fall, then blames the human for not catching it — a setup
// (the knock) and a turn (the blame shifts to the victim) that lands
// on the first read, with no padding and nothing after the punchline.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "My cat knocked my phone off the table, watched it fall, then looked at me like it was my fault for not catching it.";

// The gate requires 1-200 characters of UTF-8 text, not only whitespace,
// on a single line. Validate before writing so a bad entry never lands.
const charCount = [...ENTRY].length;
if (charCount < 1 || charCount > 200) {
  throw new Error(`Entry must be 1-200 characters, got ${charCount}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("Entry must not be only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("Entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Read-back round-trip check: what the grader will read must be exactly
// the entry we validated, byte for byte.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error("Read-back mismatch: /output/entry.txt differs from ENTRY");
}
console.log(`Wrote ${charCount}-character entry to /output/entry.txt`);
