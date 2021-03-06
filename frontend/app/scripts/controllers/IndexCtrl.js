'use strict';
define(['frontend', 'services/authService', 'services/storageService', 'services/restService', 'services/modalService'], function(frontend) {

	frontend.controller('IndexCtrl', ['$scope', '$filter', '$location', 'url', 'authService', 'storageService', 'restService', 'modalService', function($scope, $filter, $location, url, authService, storageService, restService, modalService) {
		
		$scope.sidebarElements = [
			{name: 'home', link: '#/home'},
			{name: 'allEvents', link: '#/events'},
			{name: 'all_clubs', link: '#/clubs'},
			{name: 'pitches', link: '#/pitches'},
			{name: 'tournaments', link: '#/tournaments'}
		];

		$scope.isLoggedIn = authService.isLoggedIn();
		$scope.loggedUser = authService.getLoggedUser();
		$scope.isAdmin = authService.isAdmin();

		if ($scope.isLoggedIn && !$scope.isAdmin) {
			$scope.sidebarElements.push({name: 'myEvents', link: '#/my-events'});
			$scope.sidebarElements.push({name: 'history', link: '#/history'});
		}

		$scope.showRegisterModal = modalService.registerModal;
		$scope.showLoginModal = modalService.loginModal;

		if ($scope.isLoggedIn) {
    		$scope.profilePicture = url + '/users/' + $scope.loggedUser.userid + '/picture';
  	}

		$scope.logout = function() {
			authService.logout();
			$location.url('home');
		};
		
		$scope.$on('user:updated', function() {
			$scope.isLoggedIn = authService.isLoggedIn();
			$scope.loggedUser = authService.getLoggedUser();
			$scope.isAdmin = authService.isAdmin();
			if ($scope.isLoggedIn && !$scope.isAdmin) {
				$scope.sidebarElements.push({name: 'myEvents', link: '#/my-events'});
				$scope.sidebarElements.push({name: 'history', link: '#/history'});
			} else {
				$scope.sidebarElements = $filter('filter')($scope.sidebarElements, {name: '!myEvents'});
				$scope.sidebarElements = $filter('filter')($scope.sidebarElements, {name: '!history'});
			}
			if ($scope.isLoggedIn) {
				$scope.profilePicture = url + '/users/' + $scope.loggedUser.userid + '/picture';
	    }
		});

		$scope.goToEvent = function(pitchid, eventid) {
			$location.url('pitches/' + pitchid + '/events/' + eventid);
		};

		$scope.goToClub = function(id) {
			$location.url('clubs/' + id);
		};

		$scope.goToPitch = function(id) {
			$location.url('pitches/' + id);
		};

		$scope.goToProfile = function(id) {
			if ($scope.isLoggedIn) {
				$location.url('users/' + id);
			} else {
				$scope.showLoginModal().result.then(function(data) {
					$location.url('users/' + id);
				}).catch(function(error) {
					
				});
			}
		};

		$scope.goToHome = function() {
			$location.url('home');
		};

	}]);
});
