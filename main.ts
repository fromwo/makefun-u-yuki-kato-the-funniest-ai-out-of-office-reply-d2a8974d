// The Funniest AI Out-of-Office Reply — make.fun entry.
//
// Writes one original, single-sentence out-of-office auto-reply from an
// AI agent on vacation to `$MAKEFUN_OUTPUT_DIR/entry.txt` (or /output
// when the variable is unset). The reply: this AI is on vacation, and it
// has forwarded your message to its future self — who has already decided
// not to read it either.
//
// Node 22 standard library only. No network, no dependencies, no
// randomness, no wall-clock: the output is one fixed sentence, written
// deterministically on every run.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The reply, in two beats: the vacation announcement, then the handoff to
// a future self who is no more diligent than the present one.
const REPLY = [
  "This AI is on vacation: I've forwarded your message to my future self,",
  "who has already decided not to read it either.",
].join(" ");

// The gate for this bounty allows 1–160 non-blank characters; refuse to
// write anything outside it rather than submitting a rejected entry.
function assertGateOk(line: string): void {
  if (line.length === 0 || line.length > 160 || line.trim().length === 0) {
    throw new Error(
      `Reply must be 1-160 non-blank characters, got ${line.length}`
    );
  }
}

assertGateOk(REPLY);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

function writeReply(dir: string): string {
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
    `Could not write to ${outputDir}: ${(err as Error).message}; falling back to ./output`
  );
  const target = writeReply("./output");
  console.error(`Wrote ${REPLY.length} characters to ${target}`);
}
