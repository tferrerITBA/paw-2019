'use strict';
define(['frontend'], function(frontend) {

	frontend.controller('ClubsCtrl', function($scope) {
    $scope.tournaments = [];
    $scope.tournamentQty = 1;
    $scope.pageInitialIndex = 1;
    $scope.pageNum = 2;
    $scope.totalTournamentQty = 12;

	});
});
