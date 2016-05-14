rebateControllers.controller('loginController', ['$scope', '$rootScope', '$http','$window','$location','broadcastService', 'commonServices','CONSTANTS', function($scope,$rootScope,$http,$window,$location,broadcastService,commonServices,CONSTANTS) {

    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        /*console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());*/
        //broadcastService.prepForBroadcast("YES");
        $scope.loginGooglePlusUser(googleUser);
        console.log('After update' + broadcastService.token);
    }
    
    window.onSignIn = onSignIn;
    
    $scope.$on('handleBroadcast', function() {
        $scope.loggedIn = broadcastService.token;
        console.log('G+Controoler : ' + $scope.loggedIn);
    }); 

    
    
    $scope.loginGooglePlusUser = function(userAttributes) {
        console.log('inside gplus');
        var profile = userAttributes.getBasicProfile();
        var parameter = {
                "userType" :"GOOGLE_PLUS",
                "email" :  profile.getEmail(),
                "imageUrl" :  profile.getImageUrl(),
                "name" : profile.getName()
            };
        $scope.loginUserURL = CONSTANTS.LOGIN_URL;
        console.log(parameter);
        $scope.loginUserPromise = commonServices.sendHttpRequest($scope.loginUserURL,CONSTANTS.POST_METHOD, parameter);
         
         $scope.loginUserPromise.success(function (data, status, headers, config) {
             broadcastService.prepForBroadcast(data.token);
             console.log('User Details : ' + data.userDetails);
             broadcastService.prepForBroadcastOfLoginAttributes(data.userDetails);
             console.log(data);
             $scope.dismiss();       //dismiss modal
             
         }).error(function (data, status, headers, config) {
                console.log('AWS DOWN');
         });
    }
    
    //REBATE User Login
    $scope.loginUser = function() {
         
         console.log('calling register user');
         var parameter = {
                "userType" :"REBATE",
                "email" :  $scope.login.email,
                "password" :  $scope.login.password
            };
         //$scope.registerUser.add
         
         $scope.loginUserURL = CONSTANTS.LOGIN_URL;
         console.log(parameter);
         $scope.loginUserPromise = commonServices.sendHttpRequest($scope.loginUserURL,CONSTANTS.POST_METHOD, parameter);
         $scope.loginUserPromise.success(function (data, status, headers, config) {
             console.log(data);
             broadcastService.prepForBroadcast(data.token);
             broadcastService.prepForBroadcastOfLoginAttributes(data.userDetails);
             $scope.dismiss();       //dismiss modal
         }).error(function (data, status, headers, config) {
                console.log('AWS DOWN');
         });
         
    }
    
    //REBATE User Register
    $scope.registerUser = function() {
         
         console.log('calling register user');
         var parameter = {
                "userType" :"REBATE",
                "name" : $scope.register.name,
                "email" :  $scope.register.email,
                "password" :  $scope.register.password
            };
         //$scope.registerUser.add
         
         $scope.registerUserURL = CONSTANTS.SIGNUP_URL;
         console.log(parameter);
         $scope.registerUserPromise = commonServices.sendHttpRequest($scope.registerUserURL,CONSTANTS.POST_METHOD, parameter);
         
         $scope.registerUserPromise.success(function (data, status, headers, config) {
             console.log(data);
             broadcastService.prepForBroadcast(data.token);
             broadcastService.prepForBroadcastOfLoginAttributes(data.userDetails);
             $scope.dismiss();       //dismiss modal
         }).error(function (data, status, headers, config) {
                console.log('AWS DOWN');
             
         });
         
     }
}]);
