mainApp.service('CONSTANTS', function(){
   
    this.GET_METHOD='GET_METHOD';
    this.POST_METHOD='POST_METHOD';
    //this.BASE_URL = 'http://ec2-54-149-229-132.us-west-2.compute.amazonaws.com:9000/';
    this.BASE_URL = 'http://localhost:9000/';
    this.LOGIN_URL = this.BASE_URL + 'login';
    this.LOGOUT_URL = this.BASE_URL + 'logout';
    this.SIGNUP_URL = this.BASE_URL + 'signup';
    this.TRANSACTION_GENERATION_URL = this.BASE_URL + 'usertransaction';


    this.AMAZON_REDIRECT_URL = 'http://www.amazon.in/?tag=getrebate-21&ascsubtag=';
    this.FLIPKART_REDIRECT_URL = 'http://flipkart.com/?affid=sidbshahg&affExtParam1=';
});
