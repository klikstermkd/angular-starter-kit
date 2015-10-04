(function() {

   'use strict';

   /* @ngInject */
   function AppController() {
      var appController = this;

      appController.menuToggle = {
         isCollapsed: true
      };
   }

   angular
      .module('app.controllers', [])
      .controller('AppController', AppController);

})();
