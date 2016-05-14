rebateControllers.controller('CompanyDescriptionController', ['$scope', '$http','$window','$location','broadcastService','CONSTANTS','commonServices', function ($scope, $http,$window,$location, broadcastService,CONSTANTS,commonServices) {
    
    $scope.CONSTANTS = CONSTANTS;
    $scope.loggedIn = broadcastService.token;
    jQuery(document).ready(function($){
        $(".owl-carousel").owlCarousel();
    });
    
    $scope.$on('handleBroadcast', function() {
        $scope.loggedIn = broadcastService.token;
        console.log('Company desc Controoler : ' + $scope.loggedIn);
    }); 


    $scope.redirectToPageWithTrasnsactionID = function(url) {
        console.log('url : ' + url);
        var parameter = {
            "token" : broadcastService.token,
        };
        $scope.transactionGenerationURL = CONSTANTS.TRANSACTION_GENERATION_URL;
        console.log(parameter);
        $scope.transactionGenerationPromise = commonServices.sendHttpRequest($scope.transactionGenerationURL,CONSTANTS.POST_METHOD, parameter);

        $scope.transactionGenerationPromise.success(function (data, status, headers, config) {
            console.log(data);
            var transactionId = data.transactionId;
            location.href = url + transactionId;

        }).error(function (data, status, headers, config) {
            console.log('AWS DOWN');
        });
    }
}]);
