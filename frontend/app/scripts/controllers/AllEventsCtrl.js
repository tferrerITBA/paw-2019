'use strict';
define(['frontend', 'services/restService'], function(frontend) {

	frontend.controller('AllEventsCtrl', ['$scope', '$filter', '$location', 'restService', 'events', function($scope, $filter, $location, restService, events) {
		var params = {pageNum: 1};
		
		$scope.events = events.events;
		$scope.eventCount = events.eventCount;
		$scope.lastPageNum = events.lastPageNum;
		$scope.initialPageIndex = events.initialPageIndex;
		$scope.pageNum = params.pageNum;

		$scope.filters = {};
		$scope.currentDate = new Date();
    	
		restService.getSports().then(function(data) {
			$scope.sports = data.sports;
		}).catch(function(error) {
			alert(error.data || 'Error');
		});

		$scope.$watch('filters.selectedDate', function (newValue) {
			$scope.filters.date = $filter('date')(newValue, 'yyyy-MM-dd');
		});

		$scope.getFirstPage = function() {
			params.pageNum = 1;
			updateEvents(params);
		};

		$scope.getPrevPage = function() {
			params.pageNum--;
			updateEvents(params);
		};

		$scope.getNextPage = function() {
			params.pageNum++;
			updateEvents(params);
		};

		$scope.getLastPage = function() {
			params.pageNum = $scope.lastPageNum;
			updateEvents(params);
		};

		$scope.filterEvents = function() {
			params = $scope.filters;
			params.pageNum = 1;
			updateEvents(params);
		};

		function updateEvents(params) {
			restService.getAllEvents(params).then(function(data) {
				$scope.events = data.events;
				$scope.eventCount = data.eventCount;
				$scope.lastPageNum = data.lastPageNum;
				$scope.initialPageIndex = data.initialPageIndex;
				$scope.pageNum = params.pageNum;
			}).catch(function(error) {
				alert(error.data || 'Error');
			});
		};

  	}]);

});
