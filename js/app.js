var app = angular.module('Sunglasses', ['ngRoute']);

app

.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/user-details', {
			templateUrl: 'templates/user-details.html',
			controller: 'UserDetailsController'
		});
}])

.value('faceAPIURL', 'http://uifaces.com/api/v1/random')

.factory('faceFetcher', ['$http', 'faceAPIURL', '$q', function ($http, faceAPIURL, $q) {
	return function (size) {
		return $q(function (resolve, reject) {
			$http.get(faceAPIURL)
				.then(function (response) {
					resolve(response.data.image_urls[size]);
				}, function (error) {
					reject(error);
				});
		})
	}
}])

.factory('attachImageToUser', ['faceFetcher', function (faceFetcher) {
	return function (user) {
		faceFetcher('epic').then(function (imageURL) {
			user.image = imageURL;
			console.log(user);
		});
	};
}])

.controller('UserController', ['$scope', 'attachImageToUser', function ($scope, attachImageToUser) {
	$scope.userImage = '';
	$scope.shouldDisplayMenu = false;
	$scope.activeUser = {};
	
	$scope.toggleMenu = function (user) {
		$scope.shouldDisplayMenu = !$scope.shouldDisplayMenu;
	};

	$scope.users = [
		{firstName: 'Eli', lastName: 'Cohen', relationship: 'married', city:'Tel-Aviv'},
		{firstName: 'Nati', lastName: 'Pezam', relationship: 'single', city:'Jerusalem'},
		{firstName: 'Avi', lastName: 'Ben-ari', relationship: 'single', city:'Raanana'},
		{firstName: 'Ofir', lastName: 'Stern', relationship: 'married', city:'Kiryat-Yam'}
	];

	angular.forEach($scope.users, function (user) {
		attachImageToUser(user);
	});

}])

.controller('UserDetailsController', ['$scope', function($scope) {

}]);