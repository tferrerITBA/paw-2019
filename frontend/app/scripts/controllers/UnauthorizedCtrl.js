'use strict';
define(['frontend', 'services/errorService', 'services/titleService'], function(frontend) {

	frontend.controller('UnauthorizedCtrl', ['$scope', '$filter', 'errorService', 'titleService', function($scope, $filter, errorService, titleService) {
		titleService.setDefaultTitle();
	}]);

});