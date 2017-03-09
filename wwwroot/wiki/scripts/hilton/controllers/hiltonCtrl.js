(function(angular){
	angular.module('hilton').controller('hiltonLoginCtrl', ['$scope', '$state', 'authService', 'commonKeys', function($scope, $state, authService, commonKeys) {
		var env = commonKeys.getEnvironmentVariable();
		if (!env) {
			alert('Environment variable is not configured');
			$state.go('/configuration');
			return;
		}
		
		$scope.loading = false;
		$scope.erresponse = null;
		$scope.credentials = { userlogonuid: null, vendor: null, password: null, environment: commonKeys.getEnvironmentVariable()  };
		$scope.submit = function() {
			$scope.loading = true;
			authService.signIn($scope.credentials.userlogonuid,
				$scope.credentials.vendor,
				$scope.credentials.password, successLogin, errorLogin);
		};

		var successLogin = function() { $state.go('/hilton-api'); };

		var errorLogin = function(error) { 
			$scope.loading = false; 
			$scope.erresponse = {
				uri: error.config.url,
				status: error.status,
				text: error.statusText || 'N/A'
			};
		};
	}]);
})(angular);