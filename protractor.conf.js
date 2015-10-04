/* global exports */

exports.config = {
   seleniumAddress: 'http://localhost:4444/wd/hub',
   capabilities: { 'browserName': 'chrome' },
   specs: ['test/e2e/**/*.js'],
   jasmineNodeOpts: {
      showColors: true,
      defaultTimeoutInterval: 30000
   },
   baseUrl: 'http://192.168.0.102:3000',
};
