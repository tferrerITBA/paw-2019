'use strict';
define(['frontend', 'services/restService', 'services/authService', 'services/titleService'], function(frontend) {

	frontend.controller('HistoryCtrl', ['$scope', '$location', '$q', '$filter', 'restService', 'authService', 'titleService', function($scope, $location, $q, $filter, restService, authService, titleService) {
	    var params = {pageNum: 1};

	    titleService.setTitle($filter('translate')('history'));

	    restService.getHistory($scope.loggedUser.userid, params).then(function(data) {
			$scope.events = data.events;
			$scope.eventCount = data.eventCount;
			$scope.lastPageNum = data.lastPageNum;
			$scope.initialPageIndex = data.initialPageIndex;
			$scope.pageNum = params.pageNum;
		});

		$scope.goToEvent = function(pitchid, eventid) {
			$location.url('pitches/' + pitchid + '/events/' + eventid);
		};

		$scope.goToEvents = function() {
			$location.url('events/');
		};

		$scope.getFirstPage = function() {
			params.pageNum = 1;
			restService.getHistory($scope.loggedUser.userid, params).then(function(data) {
				$scope.events = data.events;
				$scope.eventCount = data.eventCount;
				$scope.lastPageNum = data.lastPageNum;
				$scope.initialPageIndex = data.initialPageIndex;
				$scope.pageNum = params.pageNum;
			}).catch(function(error) {
alert(error.data || ' Error');
});
		};

		$scope.getPrevPage = function() {
			params.pageNum--;
			restService.getHistory($scope.loggedUser.userid, params).then(function(data) {
				$scope.events = data.events;
				$scope.eventCount = data.eventCount;
				$scope.lastPageNum = data.lastPageNum;
				$scope.initialPageIndex = data.initialPageIndex;
				$scope.pageNum = params.pageNum;
			}).catch(function(error) {
alert(error.data || ' Error');
});
		};

		$scope.getNextPage = function() {
			params.pageNum++;
			restService.getHistory($scope.loggedUser.userid, params).then(function(data) {
				$scope.events = data.events;
				$scope.eventCount = data.eventCount;
				$scope.lastPageNum = data.lastPageNum;
				$scope.initialPageIndex = data.initialPageIndex;
				$scope.pageNum = params.pageNum;
			}).catch(function(error) {
alert(error.data || ' Error');
});
		};

		$scope.getLastPage = function() {
			params.pageNum = $scope.lastPageNum;
			restService.getHistory($scope.loggedUser.userid, params).then(function(data) {
				$scope.events = data.events;
				$scope.eventCount = data.eventCount;
				$scope.lastPageNum = data.lastPageNum;
				$scope.initialPageIndex = data.initialPageIndex;
				$scope.pageNum = params.pageNum;
			}).catch(function(error) {
alert(error.data || ' Error');
});
		};
	}]);
});
