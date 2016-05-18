rebateControllers.controller('loginController', ['$scope', '$rootScope', '$http','$window','$location','broadcastService', 'commonServices','CONSTANTS','$timeout', function($scope,$rootScope,$http,$window,$location,broadcastService,commonServices,CONSTANTS,$timeout) {

    //Handle condition when broadcast is empty
    /*if(broadcastService.isEmpty()) {
        broadcastService = JSON.parse(localStorage.getItem("broadcastObject"));
    }*/
    //END Condition for broadcast empty

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
        console.log('login controller : ' + $scope.loggedIn);
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
         $('#login_popover').popover('hide');
         console.log('calling register user');
         var parameter = {
                "userType" :"REBATE",
                "email" :  $scope.login.email,
                "password" :  $scope.login.password
            };
         
         $scope.loginUserURL = CONSTANTS.LOGIN_URL;
         console.log(parameter);
         $scope.loginUserPromise = commonServices.sendHttpRequest($scope.loginUserURL,CONSTANTS.POST_METHOD, parameter);
         $scope.loginUserPromise.success(function (data, status, headers, config) {
             console.log(data);
             broadcastService.prepForBroadcast(data.token);
             broadcastService.prepForBroadcastOfLoginAttributes(data.userDetails);
             $scope.login = {};     //clear values
             $scope.dismiss();       //dismiss modal
             $scope.login_form.$setPristine();
         }).error(function (data, status, headers, config) {
             console.log('AWS DOWN');
             $scope.loginError = true;
             $scope.loginErrorMessage = data.errorMessages[0];

             $timeout(function(){
                 $scope.loginError = false;
                 $scope.loginErrorMessage = "";
             }, 6000);
         });
         
    }
    
    //REBATE User Register
    $scope.registerUser = function() {
        $('#popover').popover('hide');
         console.log('calling register user');
         var parameter = {
                "userType" :"REBATE",
                "name" : $scope.register.name,
                "email" :  $scope.register.email,
                "password" :  $scope.register.password
            };
         
         $scope.registerUserURL = CONSTANTS.SIGNUP_URL;
         console.log(parameter);
         $scope.registerUserPromise = commonServices.sendHttpRequest($scope.registerUserURL,CONSTANTS.POST_METHOD, parameter);
         
         $scope.registerUserPromise.success(function (data, status, headers, config) {
             console.log(data);
             broadcastService.prepForBroadcast(data.token);
             broadcastService.prepForBroadcastOfLoginAttributes(data.userDetails);
             $scope.dismiss();       //dismiss modal
             //clear the values
             $scope.register = {};
             $scope.register_form.$setPristine();
         }).error(function (data, status, headers, config) {
             console.log(data);
             $scope.register.registerError = true;
             $scope.register.registerErrorMessage = data.errorMessages[0];
             $timeout(function(){
                 $scope.register.registerError = false;
                 $scope.register.registerErrorMessage = "";
             }, 6000);
         });

         
     }

    jQuery(document).ready(function($){
        $('#popover').popover({
            delay: 100
        });

        $('#login_popover').popover({
            delay: 100
        });
    });

}]);
