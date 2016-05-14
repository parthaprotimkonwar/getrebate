rebateControllers.controller('EditProfileController', ['$scope', '$http','$window','$location','broadcastService','CONSTANTS','commonServices','$timeout', function ($scope, $http,$window,$location, broadcastService,CONSTANTS,commonServices,$timeout) {

    //Handle condition when broadcast is empty
    if(broadcastService.isEmpty()) {
        broadcastService = JSON.parse(localStorage.getItem("broadcastObject"));
    }
    //END Condition for broadcast empty
    
    $scope.loginAttribute = broadcastService.loginAttributes;

    //get points for the user
    var parameter = {
            "token" : broadcastService.token,
        };
    $scope.userPointsURL = CONSTANTS.USER_POINTS_URL;
    console.log(parameter);
    $scope.userPointsPromise = commonServices.sendHttpRequest($scope.userPointsURL,CONSTANTS.POST_METHOD, parameter);

    $scope.points = {};
    $scope.userPointsPromise.success(function (data, status, headers, config) {
        console.log(data);
        $scope.points.value = data.points;

    }).error(function (data, status, headers, config) {
        console.log('AWS DOWN');
    });
    //end getting points

    //handle broadcast events
    $scope.$on('handleBroadcastForLoginAttributes', function() {
         $timeout(function() {
            $scope.loginAttribute = broadcastService.loginAttributes;
            console.log('Edit Profile for broadcast : ' + $scope.loginAttribute);
         })
     });
    //end broadcast events

    //START function for redeem of points.
    $scope.redeemPoints = function() {

        if(parseInt($scope.points.value) < 150) {
            $scope.points.message = "You can only redeem after accumulation of 150 points.";
        } else {
            $scope.points.message = "This facility will be available soon";
        }

        //$timeout(function () { $scope.points.message = ""; }, 3000);
    };

}]);
