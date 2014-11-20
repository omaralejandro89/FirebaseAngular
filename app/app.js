(function () {
    'use strict';

    angular
        .module('app', [
            //Everybody has access to this
            'app.core',
            //Feature areas
            'app.home'
        ])

        .config(function($stateProvider, $urlRouterProvider) {


        $urlRouterProvider.otherwise("/home");

        $stateProvider
            .state('state1', {
                url: "/state1",
                templateUrl: "app/templates/state1.html"
            })
            .state('state2', {
                url: "/state2",
                templateUrl: "app/templates/state2.html"
            })
            .state('home', {
                url: "/home",
                templateUrl: "app/home/home.html",
                controller: 'HomeController as vm'
            })
    });

})();