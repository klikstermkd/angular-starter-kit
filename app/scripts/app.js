(function() {

   'use strict';

   /* @ngInject */
   function config($urlRouterProvider, $stateProvider, $locationProvider) {

      // $locationProvider.html5Mode(true);

      $urlRouterProvider.otherwise('/');

      $stateProvider
         .state('home', {
            url: '/',
            templateUrl: 'views/home.html',
            controller: 'HomeController',
            controllerAs: 'home'
         })
         .state('page', {
            url: '/page',
            templateUrl: 'views/page.html',
            controller: 'PageController',
            controllerAs: 'page'
         });

   }

   angular
      .module('app', ['ui.router',
                      'ui.bootstrap.collapse',
                      'app.controllers'])
      .config(config);

})();
