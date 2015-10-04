/* global module */

module.exports = function(config) {
   'use strict';

   config.set({
      frameworks: ['jasmine'],
      files: [
         'app/bower_components/angular/angular.min.js',
         'app/bower_components/angular-mocks/angular-mocks.min.js',
         'app/scripts/**/*.js',
         'test/unit/**/*.js'
      ],
      reporters: ['progress'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['Chrome'],
      singleRun: false,
      plugins: [
         'karma-chrome-launcher',
         'karma-jasmine'
      ],
   });
};
