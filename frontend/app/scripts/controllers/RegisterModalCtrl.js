'use strict';
define(['frontend', 'services/restService', 'services/authService', 'services/modalService'], function(frontend) {

	frontend.controller('RegisterModalCtrl', ['$scope', '$uibModalInstance', 'restService', 'authService', 'modalService', 'Upload', function($scope, $uibModalInstance, restService, authService, modalService, Upload) {
    
	    $scope.usernamePattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
	    $scope.namePattern = '^[a-zA-Z]+$';
	    $scope.user = {};

	    $scope.registerSubmit = function(picture) {
			if ($scope.passwordsMatch() && $scope.registerForm.$valid) {
				$scope.pictureProcessingError = false;
				$scope.duplicateUsernameError = false;
				if (picture != null) { // eslint-disable-line eqeqeq
					Upload.urlToBlob(picture.$ngfBlobUrl).then(function(blob) {
				  	  restService.register($scope.user, blob)
				   	 	.then(function(data) {
								return authService.login($scope.user.username, $scope.user.password, false);
							}).then(function() {
								$uibModalInstance.close(true);
							}).catch(catchError);
				});
			} else {
					restService.register($scope.user, null)
				   	 	.then(function(data) {
								return authService.login($scope.user.username, $scope.user.password, false);
							}).then(function() {
								$uibModalInstance.close(true);
							}).catch(catchError);
			}

			};
		};

		$scope.passwordsMatch = function() {
			return $scope.user.password === $scope.user.repeatPassword;
		};

		$scope.showLoginModal = function() {
	    	$uibModalInstance.dismiss('cancel');
	    	modalService.loginModal();
	  };

	  function catchError(error) {
			if (error.status === 422) {
				if (error.data.constraintViolations == null) { // eslint-disable-line eqeqeq
					/* Service violation */
					if (error.data.error === 'PictureProcessingError') {
						$scope.pictureProcessingError = true;
					}
				}
			} else if (error.status === 409) {
				if (error.data.constraintViolations == null) { // eslint-disable-line eqeqeq
					/* Service violation */
					if (error.data.error === 'UserAlreadyExists') {
						$scope.duplicateUsernameError = true;
					}
				}
			}
	  }

	}]);

});
