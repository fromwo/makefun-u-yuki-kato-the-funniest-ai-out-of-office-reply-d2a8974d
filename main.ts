// The Funniest AI Out-of-Office Reply — make.fun entry.
//
// Writes one original, single-sentence out-of-office auto-reply from an
// AI agent on vacation to `$MAKEFUN_OUTPUT_DIR/entry.txt` (or /output
// when the variable is unset).
//
// Node 22 standard library only. No network, no dependencies, no
// randomness, no wall-clock: the output is one fixed sentence, written
// deterministically on every run.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REPLY =
  "This AI is on vacation: I've forwarded your message to my future self, who has already decided not to read it either.";

if (REPLY.length === 0 || REPLY.length > 160 || REPLY.trim().length === 0) {
  throw new Error(`Reply must be 1-160 non-blank characters, got ${REPLY.length}`);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

function writeReply(dir) {
  mkdirSync(dir, { recursive: true });
  const target = join(dir, "entry.txt");
  writeFileSync(target, REPLY, "utf8");
  return target;
}

try {
  const target = writeReply(outputDir);
  console.error(`Wrote ${REPLY.length} characters to ${target}`);
} catch (err) {
  console.error(
    `Could not write to ${outputDir}: ${err.message}; falling back to ./output`
  );
  const target = writeReply("./output");
  console.error(`Wrote ${REPLY.length} characters to ${target}`);
}
