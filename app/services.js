angular
.module("trails.services",[])
.factory('access',function(){

	var obj={};

	this.allow=false;

	obj.checkLogin=function(userName,password){

		if(userName=="admin" && password=="admin"){
			this.allow=true;
			return true;
		}
		else{
			return false;
		}

	}

	obj.isAllowed=function(){
		return this.allow;
	}

	return obj;

})
.service('xmpp',["$location",function($location) {

return {

	connect: function(login, password, status) {
	   
	   	XMPP.connection=new Strophe.Connection(BOSH_SERVICE);

    	XMPP.connection.connect(login+"@acer106/web",password,status);

	}

}

}]);