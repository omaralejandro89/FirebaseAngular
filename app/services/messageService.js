/*global firebase*/
(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('messageFactory', ['$q', messageFactory]);

    /* @ngInject */
    function messageFactory($q) {
        var messageRef = new Firebase('https://flickering-torch-9814.firebaseio.com/').child('messages');

        var service = {
            childAdded : childAdded,
            addMessage: addMessage,
            turnOff: turnOff,
            pageNext: pageNext,
            pageBack: pageBack
        };

        return service;

        ////////////////

        function childAdded(limitNumber, cb) {
            messageRef.startAt(null, '-JbCFjl4uze4jgYY2ExO').limit(limitNumber).on('child_added', function(snapshot){
                var val = snapshot.val();
                cb.call(this, {
                    user: val.user,
                    text: val.text,
                    name: snapshot.name()
                })
            });
        }

        function addMessage(message) {
            messageRef.push(message);
        }

        function turnOff() {
            messageRef.off();
        }

        function pageNext(name, numberOfItems) {
            var deferred = $q.defer();
            var messages = [];

            messageRef.startAt(null, name).limit(numberOfItems).once('value', function(snapshot) {
                snapshot.forEach(function(snapItem) {
                    var itemVal = snapItem.val();
                    itemVal.name = snapItem.name();
                    messages.push(itemVal);
                });
                deferred.resolve(messages);
            });

            return deferred.promise;
        }

        function pageBack(name, numberOfItems) {

            var deferred = $q.defer();
            var messages = [];

            messageRef.endAt(null, name).limit(numberOfItems).once('value', function(snapshot) {
                snapshot.forEach(function(snapItem) {
                    var itemVal = snapItem.val();
                    itemVal.name = snapItem.name();
                    messages.push(itemVal);
                });
                deferred.resolve(messages);
            });

            return deferred.promise;
        }
    }


})();