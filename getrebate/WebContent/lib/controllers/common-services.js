mainApp.service('commonServices', function($http, CONSTANTS){
	
	
   this.sendHttpRequest = function(url,getOrPost,postData) {
      if(getOrPost === CONSTANTS.GET_METHOD)
	  {
		  return $http.get(url);
	  }
	  else
	  {
		  return $http({
            url: url,
            method: "POST",
            data: postData,
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        });
	  }
   }
   
   this.getSelectedFlight = function() {
       return this.selectedFlight;
   }
   
   this.setSelectedFlight = function(selectedFlight) {
       this.selectedFlight = selectedFlight;
   }
    
});