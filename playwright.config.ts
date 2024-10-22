import { PlaywrightTestConfig, devices   } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path:  '.env' });

const RPConfig = {
  apiKey: process.env.REPORTPORTAL_API_KEY,
  endpoint: 'http://localhost:8080/api/v1',
  project: 'superadmin_personal',
  launch: 'Playwright with Typescript',
  attributes: [
    {
      key: 'agent',
      value: 'playwright',
    },
    {
      value: 'example',
    },
  ],

  mode: 'DEFAULT',
  description: 'Playwright with Typescript - End-to-End Test',
}; 

const config: PlaywrightTestConfig = {
  timeout: 2 * 60 * 1000,
      expect: {
        timeout: 20000,
    },
  fullyParallel: true,
  // Retry on CI only 
  retries: process.env.CI ? 2 : 0,

   // Opt out of parallel tests on CI. 
  workers: process.env.CI ? 1 : undefined,
  forbidOnly: true,
  //  workers: 5,

  use: {
    headless: false,
    screenshot: {
      mode: 'only-on-failure',
      fullPage: false,
    },
    video: 'retain-on-failure',
    actionTimeout: 8000,
    navigationTimeout: 40000,
    trace: 'retain-on-failure',
  },
  reporter: [['@reportportal/agent-js-playwright', RPConfig]],
  
  testDir: './tests/ui',

    /* Configure projects for major browsers */
    projects: [
      {
        name: 'Google Chrome',
         use: { ...devices['Desktop Chrome'], channel: 'chrome' },
       },
    ],
};

export default config;
  
