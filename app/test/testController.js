(function () {
    /*global firebase*/
    'use strict';

    angular
        .module('app.test')
        .controller('TestController', ['$scope', '$timeout', TestController]);

    /* @ngInject */
    function TestController($scope, $timeout) {
        /* jshint validthis: true */
        var vm = this;
        var rootRef = new Firebase('https://flickering-torch-9814.firebaseio.com/');
        var childRef = rootRef.child('message');

        vm.activate = activate;
        vm.title = 'MainController';

        childRef.on('value', function(snapshot) {
            $timeout(function() {
                var snapshotVal = snapshot.val();
                console.log(snapshotVal);
                vm.message = snapshot.val();
            });
        });


        $scope.$watch('vm.message.text', function(newVal) {
            if (!newVal) {
                return;
            }
            childRef.update({
                text: newVal
            })
        });

        // https://flickering-torch-9814.firebaseio.com/message
        vm.setMessage = function() {
            childRef.set({
                user: 'Bob',
                text: 'Hi'
            })
        };

        vm.updateMessage = function() {
            childRef.update({
                lastname: 'Smith'
            })
        };

        vm.deleteMessage = function() {
            childRef.remove();
        };

        activate();

        ////////////////

        function activate() {
        }


    }
})();