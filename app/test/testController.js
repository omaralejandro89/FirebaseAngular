(function () {

    'use strict';

    angular
        .module('app.test')
        .controller('TestController', ['$scope', '$timeout', 'messageFactory', TestController]);

    /* @ngInject */
    function TestController($scope, $timeout, messageFactory) {
        /* jshint validthis: true */
        var vm = this;

        vm.currentUser = null;
        vm.currentText = null;
        vm.messages = [];

        messageFactory.childAdded(5, function(addedChild) {
           $timeout(function() {
               vm.messages.push(addedChild);
           })
        });

        ////////////////

        vm.sendMessage = function() {
          var newMessage = {
              user: vm.currentUser,
              text: vm.currentText
          };

          messageFactory.addMessage(newMessage);
        };

        vm.turnFeedOff = function() {
            messageFactory.turnOff();
        };

        vm.pageNext = function() {
            var lastItem = vm.messages[vm.messages.length - 1];
            messageFactory.pageNext(lastItem.name, 5).then(function(messages) {
                vm.messages = messages;
            })
        };

        vm.pageBack = function() {
            var firstItem= vm.messages[0];
            messageFactory.pageBack(firstItem.name, 5).then(function(messages) {
                vm.messages = messages;
            })
        }


    }
})();