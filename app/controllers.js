angular
.module("trails.controllers",[])
.controller("main-controller",["$scope","$location","xmpp",function($scope,$location,xmpp){


	
	
	

}])

.controller("login-controller",["$scope","$location","$http","xmpp",function($scope,$location,$http,xmpp){

	

	vfxAnimInitial();

	$scope.showAbout=function(){

		vfxAnimShowAboutBox();

  		setTimeout(vfxAnimHideAboutBox, 8000);

	};

	funLoc=function(status){

  
    		if (status == Strophe.Status.CONNECTING)
    		{
      			console.log('Strophe is connecting.');
    		} else if (status == Strophe.Status.CONNFAIL) {
      			console.log('Strophe failed to connect.');
    		} else if (status == Strophe.Status.DISCONNECTING) {
      			console.log('Strophe is disconnecting.');
    		} else if (status == Strophe.Status.DISCONNECTED) {
      			console.log('Strophe is disconnected.');
    		} else if (status == Strophe.Status.CONNECTED) {    			

    			console.log('Strophe is connected.');

    			XMPP.isConnected=true;     			

      			console.log(XMPP.connection.jid);

      			var iq = $iq({type: 'get'}).c('query', {xmlns: 'jabber:iq:roster'});
      			XMPP.connection.sendIQ(iq, XMPP.on_roster);

      			$scope.$apply(function(){
          $location.path("/view-main");
        });

      			
      			

    		}

  		};

	$scope.login=function(){

		xmpp.connect($scope.user.userName,$scope.user.password,funLoc);
	};




}])

.controller("simple-controller",["$scope","$location","access",function($scope,$location,access){

	


	

}]);