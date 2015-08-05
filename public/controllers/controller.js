var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
	console.log("Hello World from controller");

	var refresh = function()	{
		$http.get("/contactList").success(function(response)	{
			$scope.contactList = response;
			$scope.contact = "";
		});
	}

	refresh();

	$scope.addContact = function()	{
		$http.post("/contactList",$scope.contact).success(function(response)	{
			refresh();
		});
	};

	$scope.editContact = function(id)	{
		$http.get("/contactList/{id}".replace("{id}",id),$scope.contact).success(function(response)	{
			$scope.contact = response;
		});
	};

	$scope.updateContact = function()	{
		$http.put("/contactList/{id}".replace("{id}",$scope.contact._id),$scope.contact).success(function(response)	{
			 refresh();
		});
	};

	$scope.removeContact = function(id)	{
		$http.delete("/contactList/{id}".replace("{id}",id)).success(function(response)	{
			refresh();
		});
	};

}]);