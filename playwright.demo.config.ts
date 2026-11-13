import { defineConfig, devices } from '@playwright/test';
import base from './playwright.config';

// Config khusus untuk merekam video demo (dipakai di README).
// Jalankan: npm run demo:record
export default defineConfig({
  ...base,
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 90_000,
  reporter: 'list',
  outputDir: 'demo-results',
  use: {
    ...base.use,
    viewport: { width: 1280, height: 720 },
    video: { mode: 'on', size: { width: 1280, height: 720 } },
    launchOptions: { slowMo: 700 },
  },
  projects: [{ name: 'demo', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 720 } } }],
});
