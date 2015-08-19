var app = angular.module('VoxpopuliAppleSimulator', ['ngRoute']);

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

.controller('VoxAppSimController', ['$scope', 'attachImageToUser', function ($scope, attachImageToUser) {
	$scope.userImage = '';
	$scope.shouldDisplayMenu = false;
	$scope.activeUser = {};
	$scope.code = 'A2zALf3TpqU';
	
	$scope.toggleMenu = function (user) {
		$scope.shouldDisplayMenu = !$scope.shouldDisplayMenu;
	};

	$scope.users = [
		{CandidateNum:1, code: 'A2zALf3TpqU', firstName: 'Arthur', lastName: 'Sabag'},
		{CandidateNum:2, firstName: 'Alex', lastName: 'Pezam'},
		{CandidateNum:3, firstName: 'Astrit', lastName: 'Gere'},
		{CandidateNum:4, firstName: 'Serj', lastName: 'Widman'},
		{CandidateNum:5, firstName: 'Lion', lastName: 'Stern'}

	];

}])

.directive('myYoutube', function($sce) {
  return {
    restrict: 'EA',
    scope: { code:'=' },
    replace: true,
    template: '<div style="height:200px;width:300px"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
    link: function (scope) {
        console.log('here');
        scope.$watch('code', function (newVal) {
           if (newVal) {
               scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
           }
        });
    }
  };
})

.controller('UserDetailsController', ['$scope', function($scope) {

}]);