var mainApp = angular.module("mainApp", [
    'ngRoute',
    'rebateControllers',
]);


mainApp.config(['$routeProvider','$httpProvider', function ($routeProvider, $httpProvider) {
    $routeProvider.when('/rebate/home', {
        templateUrl : 'partials/home-body-new.html',
        controller : 'HomeController'
    }).when('/rebate/userprofile/edit', {
        templateUrl : 'partials/user-profile.html',
        controller : 'EditProfileController'
    }).when('/rebate/companies/amazon', {
        templateUrl : 'partials/companies/amazon.html',
        controller : 'CompanyDescriptionController'
    }).when('/rebate/companies/flipkart', {
        templateUrl : 'partials/companies/flipkart.html',
        controller : 'CompanyDescriptionController'
    }).otherwise({
        redirectTo : '/rebate/home'
    });
    
}]);
