import { PlaywrightTestConfig, devices   } from '@playwright/test';
import dotenv from 'dotenv';
import baseUrl from './utils/baseUrl';

dotenv.config({ path:  '.env' });

interface TestConfig extends PlaywrightTestConfig {
  authApiUrl: string;
  baseApiUrl: string;
  testDataDir: string;
};

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

const defaultConfig: PlaywrightTestConfig = {
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
    baseURL: process.env.ENV === 'qa'? baseUrl.qa.home
      : process.env.ENV === 'staging'? baseUrl.staging.home
      : process.env.ENV === 'production'? baseUrl.production.home
      : baseUrl.qa.home,
  
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

  // Report Portal
  // reporter: [['@reportportal/agent-js-playwright', RPConfig]],
  reporter: [['html', { outputFolder: 'reports'}]],
  
  testDir: './tests/ui/',
  outputDir: 'test-results',
    /* Configure projects for major browsers */
    projects: [
      {
        name: 'Google Chrome',
         use: { ...devices['Desktop Chrome'], channel: 'chrome' },
       },
    ],
};

export default defaultConfig;
  
