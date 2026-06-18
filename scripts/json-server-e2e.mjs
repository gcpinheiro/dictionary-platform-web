import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const jsonServerBin = require.resolve("json-server/lib/cli/bin.js");
const child = spawn(
  process.execPath,
  [
    jsonServerBin,
    "--watch",
    "mock/db.e2e.json",
    "--host",
    "127.0.0.1",
    "--port",
    "3101",
  ],
  {
    shell: false,
    stdio: "inherit",
  },
);

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
