/*
    A Module is a small part of the project.  
    Each module combines together to form an entire application.
    A module has a module name and initialized by ng-app in the html document
    
    var myApp = angular.module('myApp', []);
    Here myApp is the name of the namespace and [] contains the dependecy services which need to be injected in the module.
*/
var rebateControllers = angular.module('rebateControllers', ['ngAnimate']).directive('myModal', function() {
                                                                       return {
                                                                         restrict: 'A',
                                                                         link: function(scope, element, attr) {
                                                                           scope.dismiss = function() {
                                                                               element.modal('hide');
                                                                           };
                                                                         }
                                                                       } 
                                                                    });

/*A Controller controlles a small unit of the modules.*/

rebateControllers.factory('broadcastService', function($rootScope) {
   
    var broadcastObject = {};
    broadcastObject.token = '';
    broadcastObject.loginAttributes = {};
    
    broadcastObject.init = function(thatBroadcastObject) {
        broadcastObject.token = thatBroadcastObject.token;
        broadcastObject.loginAttributes = thatBroadcastObject.loginAttributes;
    };

    broadcastObject.prepForBroadcast = function(token) {
        broadcastObject.token = token;
        localStorage.setItem("broadcastObject", JSON.stringify(broadcastObject));
        this.broadcastItem();
    };
    
    broadcastObject.prepForBroadcastOfLoginAttributes = function(loginAttributes) {
        broadcastObject.loginAttributes = loginAttributes;
        localStorage.setItem("broadcastObject", JSON.stringify(broadcastObject));
        this.broadcastLoginAttributes();
    };

    broadcastObject.clearCache = function() {
        broadcastObject.token = '';
        broadcastObject.loginAttributes = {};
        this.broadcastItem();
        this.broadcastLoginAttributes();
        localStorage.setItem("broadcastObject", JSON.stringify(broadcastObject));
    };

    broadcastObject.isEmpty = function() {
        if(broadcastObject.token.length == 0 && Object.keys(broadcastObject.loginAttributes).length == 0){
            return true;
        }
        return false;
    };
    
    broadcastObject.broadcastItem = function() {
        $rootScope.$broadcast('handleBroadcast');
    };
    
    broadcastObject.broadcastLoginAttributes = function() {
        $rootScope.$broadcast('handleBroadcastForLoginAttributes');
    };
    
    return broadcastObject;
});


rebateControllers.controller('HomeController', ['$scope', '$http','$window','$location', function ($scope, $http,$window,$location) {
    
    jQuery(document).ready(function($){
        $(".owl-carousel").owlCarousel();
    });
}]);



