'use strict';
define(['frontend', 'services/authService', 'services/storageService', 'services/restService', 'services/modalService'], function(frontend) {

	frontend.controller('IndexCtrl', ['$scope', '$filter', '$location', 'authService', 'storageService', 'restService', 'modalService', function($scope, $filter, $location, authService, storageService, restService, modalService) {
		$scope.welcomeText = 'Welcome to your frontend page'; // ELIMINAR
		$scope.sidebarElements = [
			{name: 'Home', link: '#/home'},
			{name: 'All events', link: '#/events'},
			{name: 'Clubs', link: '#/clubs'},
			{name: 'Pitches', link: '#/pitches'},
			{name: 'Tournaments', link: '#/tournaments'}
		];

		$scope.isLoggedIn = false;
		$scope.isLoggedIn = authService.isLoggedIn();
		$scope.loggedUser = authService.getLoggedUser();
		$scope.isAdmin = authService.isAdmin();

		if ($scope.isLoggedIn && !$scope.isAdmin) {
			$scope.sidebarElements.push({name: 'My events', link: '#/my-events'});
			$scope.sidebarElements.push({name: 'History', link: '#/history'});
		}

		$scope.showRegisterModal = modalService.registerModal;
		$scope.showLoginModal = modalService.loginModal;

		$scope.logout = function() {
			authService.logout();
		};
		
		$scope.$on('user:updated', function() {
			$scope.isLoggedIn = authService.isLoggedIn();
			$scope.loggedUser = authService.getLoggedUser();
			$scope.isAdmin = authService.isAdmin();
			if ($scope.isLoggedIn && !$scope.isAdmin) {
				$scope.sidebarElements.push({name: 'My events', link: '#/my-events'});
				$scope.sidebarElements.push({name: 'History', link: '#/history'});
			} else {
				$scope.sidebarElements = $filter('filter')($scope.sidebarElements, {name: '!My events'});
				$scope.sidebarElements = $filter('filter')($scope.sidebarElements, {name: '!History'});
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
			$location.url('users/' + id);
		};

		$scope.goToHome = function() {
			$location.url('home');
		};

	}]);
});
