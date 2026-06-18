import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "on-first-retry",
  },
  webServer: [
    {
      command: "npm run mock:e2e",
      port: 3101,
      reuseExistingServer: false,
      timeout: 60_000,
    },
    {
      command: "npm run dev:e2e",
      env: {
        NEXT_PUBLIC_API_URL: "http://127.0.0.1:3101",
      },
      port: 3100,
      reuseExistingServer: false,
      timeout: 60_000,
    },
  ],
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
