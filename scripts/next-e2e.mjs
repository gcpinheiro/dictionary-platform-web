import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const args = process.argv.slice(2);
const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");
const child = spawn(process.execPath, [nextBin, ...args], {
  env: {
    ...process.env,
    NEXT_DIST_DIR: ".next-e2e",
  },
  shell: false,
  stdio: "inherit",
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
