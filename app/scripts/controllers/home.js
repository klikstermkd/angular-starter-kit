(function() {

   'use strict';

   /* @ngInject */
   function HomeController() {
      var homeController = this;

      homeController.messages = {
         message: 'hello from home'
      };
   }

   angular
      .module('app.controllers')
      .controller('HomeController', HomeController);

})();
