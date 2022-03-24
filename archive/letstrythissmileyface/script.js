function start () {
	var app = angular.module('myApp', ['ngMaterial'])
  .config(function($mdThemingProvider){

    $mdThemingProvider.theme('default')
      .primaryPalette('deep-purple', {
        'default': '600'
      })
      .accentPalette('purple');

		$mdThemingProvider.theme('teal')
			.primaryPalette('teal', {
				'default': 'A400'
			})
			.accentPalette('teal');

		$mdThemingProvider.theme('red')
			.primaryPalette('red', {
				'default': '200'
			})
			.accentPalette('red');
  });
	

	app.controller('MyController', function($scope, $mdSidenav) {
		$scope.openCardOne = function() {
			$mdSidenav('cardOne').toggle();
		};
	});

}

$(document).ready(start);