myApp.controller('UserController', function($scope, $location, UserService){

	$scope.init = function(){
		getUsers();
	};

	function getUsers(){

		UserService.getUsers().success(function(data){

			$scope.users = data.userList;

		}).error(function(error){
			//handle error
		});
	}

	$scope.addUser = function(){

		var user = {
			mobileNo : $scope.mobileNo,
			dateOfBirth : $scope.dateOfBirth,
			gender : $scope.gender,
			createDate : $scope.createDate
		};

		UserService.addUser(user).success(function(){
			$location.path('/users');
		});
		
	};

	// COLLAPSE =====================
  	$scope.navbarCollapse = false;

});