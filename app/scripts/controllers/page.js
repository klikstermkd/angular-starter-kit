(function() {

   'use strict';

   /* @ngInject */
   function PageController() {
      var pageController = this;

      pageController.messages = {
         message: 'hello from page'
      };
   }

   angular
      .module('app.controllers')
      .controller('PageController', PageController);

})();
