(function () {
    'use strict';

    angular
        .module('app', [
            //Everybody has access to this
            'app.core',
            'app.services',
            //Feature areas
            'app.test'
        ])

        .constant('FBURL', 'https://flickering-torch-9814.firebaseio.com/')
        .config(function($stateProvider, $urlRouterProvider) {


        $urlRouterProvider.otherwise("/home");

        $stateProvider
            .state('state1', {
                url: "/state1",
                templateUrl: "app/templates/state1.html",
                controller: 'TestController as vm'
            })
            .state('state2', {
                url: "/state2",
                templateUrl: "app/templates/state2.html"
            })
    });

})();