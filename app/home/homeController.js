(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', ['$firebaseSimpleLogin', '$state', HomeController]);


    function HomeController($firebaseSimpleLogin, $state) {
        /* jshint validthis: true */
        var vm = this;
        var firebaseObj = new Firebase("https://glaring-heat-2792.firebaseio.com/");
        var loginObj = $firebaseSimpleLogin(firebaseObj);

        vm.activate = activate;
        vm.title = 'HomeController';
        vm.signIn = signIn;

        activate();

        ////////////////

        function activate() {
        }

        function signIn(event) {
            event.preventDefault(); // To prevent form refresh
            var username = vm.user.email;
            var password = vm.user.password;

            loginObj.$login('password', {
                email: username,
                password: password
            }).then(function (user) {
                //Success callback
                console.log("Authentication successful");
                $state.go('state1')
            }, function (error) {
                //Failure callback
                console.log("Authentication failure");
            })
        }


    }
})();