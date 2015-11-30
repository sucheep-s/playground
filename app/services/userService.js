myApp.factory('UserService', function($http){

	var factory = {};
	var urlBase = 'http://192.168.1.38/buswifi/rest/userapi';

	factory.getUsers = function(){
		return $http.get(urlBase+'/getusers?sort=createDate&order=desc&max=10&page=1');
	};

	factory.getUser = function(id){
		return $http.get(urlBase);
	};

	factory.addUser = function(user){
		return $http.post(urlBase, user);
	};

	return factory;

});