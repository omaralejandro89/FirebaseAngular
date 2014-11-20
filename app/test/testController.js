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
        var messagesRef = rootRef.child('messages');
        var titleRef = rootRef.child('title');

        vm.title = null;
        vm.currentUser = null;
        vm.currentText = null;
        vm.messages = [];

        titleRef.once('value', function(snapshot) {
            vm.title = snapshot.val();
        });

        messagesRef.on('child_added', function(snapshot) {
            $timeout(function() {
                var snapshotVal = snapshot.val();
                console.log(snapshotVal);
                vm.messages.push({
                    text: snapshotVal.text,
                    user: snapshotVal.user,
                    name: snapshot.name()
                });
            });
        });

        messagesRef.on('child_changed', function(snapshot) {
            $timeout(function() {
                var snapshotVal = snapshot.val();
                var message = findMessageByName(snapshot.name());
                message.text = snapshotVal.text;
            });
        });

        messagesRef.on('child_removed', function(snapshot) {
            $timeout(function() {
                deleteMessageByName(snapshot.name());
            });
        });


        ////////////////

        function findMessageByName (name) {
            var messageFound = null;
            for(var i =0; i < vm.messages.length; i++ ) {
                var currentMessage = vm.messages[i];
                if (currentMessage.name == name) {
                    messageFound = currentMessage;
                    break;
                }
            }

            return messageFound;
        }

        function deleteMessageByName (name) {
            for(var i =0; i < vm.messages.length; i++ ) {
                var currentMessage = vm.messages[i];
                if (currentMessage.name == name) {
                    vm.messages.splice(i, 1);
                    break;
                }
            }
        }

        vm.sendMessage = function() {
          var newMessage = {
              user: vm.currentUser,
              text: vm.currentText
          };

          messagesRef.push(newMessage);
        };

        vm.turnFeedOff = function() {
            messagesRef.off();
        };


        /*
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
        */


    }
})();