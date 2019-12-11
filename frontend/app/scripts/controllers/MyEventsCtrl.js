'use strict';
define(['frontend', 'services/restService', 'services/authService'], function(frontend) {

	frontend.controller('MyEventsCtrl', ['$scope', '$location', 'restService', 'authService', 'pastEvents', 'futureEvents', function($scope, $location, restService, authService, pastEvents, futureEvents) {
	    var pastEventParams = {pageNum: 1};
	    var futureEventParams = {pageNum: 1};

	    if($scope.isLoggedIn) {
	    	$scope.pastEvents = pastEvents.events;
			$scope.pastEventCount = pastEvents.eventCount;
			$scope.pastEventsLastPageNum = pastEvents.lastPageNum;
			$scope.pastEventsInitialPageIndex = pastEvents.initialPageIndex;
			$scope.pastEventsPageNum = pastEventParams.pageNum;

			$scope.futureEvents = futureEvents.events;
			$scope.futureEventCount = futureEvents.eventCount;
			$scope.futureEventsLastPageNum = futureEvents.lastPageNum;
			$scope.futureEventsInitialPageIndex = futureEvents.initialPageIndex;
			$scope.futureEventsPageNum = futureEventParams.pageNum;
	    } else {
	    	// REDIRECCIONAR
	    	alert('LOGIN');
	    }

		$scope.$on('user:updated', function() {
		    if($scope.isLoggedIn) {
		    	updatePastEvents(pastEventParams);
		    	updateFutureEvents(futureEventParams);
		    } else {
	    		// REDIRECCIONAR
	    		alert('LOGIN');
	    	}
		});

		$scope.goToEvent = function(pitchid, eventid) {
			$location.url('pitches/' + pitchid + '/events/' + eventid);
		};

		$scope.getPastEventsFirstPage = function() {
			pastEventParams.pageNum = 1;
			updatePastEvents(pastEventParams);
		};

		$scope.getPastEventsPrevPage = function() {
			pastEventParams.pageNum--;
			updatePastEvents(pastEventParams);
		};

		$scope.getPastEventsNextPage = function() {
			pastEventParams.pageNum++;
			updatePastEvents(pastEventParams);
		};

		$scope.getPastEventsLastPage = function() {
			pastEventParams.pageNum = $scope.lastPageNum;
			updatePastEvents(pastEventParams);
		};

		function updatePastEvents(params) {
			restService.getMyPastEvents($scope.loggedUser.userid, params).then(function(data) {
				$scope.pastEvents = data.events;
				$scope.pastEventCount = data.eventCount;
				$scope.pastEventsLastPageNum = data.lastPageNum;
				$scope.pastEventsInitialPageIndex = data.initialPageIndex;
				$scope.pastEventsPageNum = params.pageNum;
			}).catch(function(error) {alert(error.data || " Error")});
		}

		$scope.getFutureEventsFirstPage = function() {
			futureEventParams.pageNum = 1;
			updateFutureEvents(futureEventParams);
		};

		$scope.getFutureEventsPrevPage = function() {
			futureEventParams.pageNum--;
			updateFutureEvents(futureEventParams);
		};

		$scope.getFutureEventsNextPage = function() {
			futureEventParams.pageNum++;
			updateFutureEvents(futureEventParams);
		};

		$scope.getFutureEventsLastPage = function() {
			futureEventParams.pageNum = $scope.lastPageNum;
			updateFutureEvents(futureEventParams);
		};

		function updateFutureEvents(params) {
			restService.getMyFutureEvents($scope.loggedUser.userid, params).then(function(data) {
				$scope.futureEvents = data.events;
				$scope.futureEventCount = data.eventCount;
				$scope.futureEventsLastPageNum = data.lastPageNum;
				$scope.futureEventsInitialPageIndex = data.initialPageIndex;
				$scope.futureEventsPageNum = params.pageNum;
			});
		}

	}]);
});
