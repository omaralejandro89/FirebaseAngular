(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);


    function HomeController() {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'HomeController';

        activate();

        ////////////////

        function activate() {
        }


    }
})();