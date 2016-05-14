rebateControllers.controller('HeaderController', ['$scope', '$http','commonServices','broadcastService','CONSTANTS','$timeout', function ($scope,$http,commonServices,broadcastService,CONSTANTS,$timeout) {
     
     //$scope.loggedIn = "NO";
     $scope.$on('handleBroadcast', function() {
        
        /*$scope.$apply(function () {
            $scope.loggedIn = broadcastService.token;
            console.log('HeaderControoler : ' + $scope.loggedIn);
        }); */
         
         $timeout(function() {
              // anything you want can go here and will safely be run on the next digest.
             $scope.loggedIn = broadcastService.token;
            console.log('HeaderControoler : ' + $scope.loggedIn);
         })
        
     });
     $scope.signOut = function() {
        console.log('sign out trigerred');
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            
            console.log('User signed out.' + broadcastService.token);
             var parameter = {
                "token" : broadcastService.token,
            };
            $scope.signoutUserURL = CONSTANTS.LOGOUT_URL;
            console.log(parameter);
            $scope.signoutUserPromise = commonServices.sendHttpRequest($scope.signoutUserURL,CONSTANTS.POST_METHOD, parameter);

             $scope.signoutUserPromise.success(function (data, status, headers, config) {
                 console.log(data);
                 broadcastService.prepForBroadcast("");
             }).error(function (data, status, headers, config) {
                    console.log('AWS DOWN');
             });
            
        }); 
     }
     
    
}]);