'use strict';
exports.config = {
  baseUrl: 'http://localhost:4200/',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  useAllAngular2AppRoots: true,
  specs: [
    './e2e/**/*.feature',
  ],
  cucumberOpts: {
    require: [
      './e2e/**/**/*.steps.ts',
    ],
    format: 'json:e2e/protractor-cucumber-report.json',
    tags: '~@ignore',
  },
  allScriptsTimeout: 31 * 1000,
  getPageTimeout: 30 * 1000,
  directConnect: true,
  beforeLaunch: function() {
    require('ts-node').register({
      project: 'e2e',
    });
  },
  onPrepare: function() {
    browser.ignoreSynchronization = false;
  },
};
