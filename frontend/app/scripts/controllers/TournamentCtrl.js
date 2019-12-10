'use strict';
define(['frontend'], function(frontend) {

	frontend.controller('TournamentCtrl', ['$scope', '$location', 'restService', 'tournament', function ($scope, $location, restService, tournament) {
		
		$scope.tournament = tournament;
		if(tournament.inscriptionSuccess) {

		} else {
			$location.url('tournaments/' + tournament.tournamentid + '/inscription');
		}
		/*currentRound
		teamsScoresMap
		currRoundPage
		roundEvents
		maxRoundPage
		params: round
		var params = {pageNum: 1};

		$scope.now = new Date();

		updateTournaments(params);

		$scope.goToTournament = function (id) {
			$location.url('tournament/' + id);
		};

		$scope.getFirstPage = function () {
			params.pageNum = 1;
			updateTournaments(params);
		};

		$scope.getPrevPage = function () {
			params.pageNum--;
			updateTournaments(params);
		};

		$scope.getNextPage = function () {
			params.pageNum++;
			updateTournaments(params);
		};

		$scope.getLastPage = function () {
			params.pageNum = $scope.lastPageNum;
			updateTournaments(params);
		};

		function updateTournaments(params) {
			restService.getTournaments(params).then(function(data) {
				$scope.tournaments = data.tournaments;
				$scope.tournamentCount = data.tournamentCount;
				$scope.lastPageNum = data.lastPageNum;
				$scope.initialPageIndex = data.initialPageIndex;
				$scope.pageNum = params.pageNum;
			});
		}*/
	}]);
})