(function () {
    'use strict';

    angular
        .module('app', [
            //Everybody has access to this
            'app.core'
            //Feature areas
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
    });

})();