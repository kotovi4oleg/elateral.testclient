(function(angular){
	angular.module('shared.elateral').controller('configCtrl', ['$scope', '$state', 'commonKeys', '$timeout', function($scope, $state, commonKeys, $timeout) {
		$scope.model = { environment: commonKeys.getEnvironmentVariable(), 
			ddvalues: [
			    "",
				"https://azure-env015.elateral.com",
				"https://azure-env016.elateral.com",
				"https://azure-env017.elateral.com",
				"https://azure-env018.elateral.com",
				"https://azure-env019.elateral.com",
				"https://azure-env020.elateral.com",
				"https://azure-env021.elateral.com",
				"https://azure-env022.elateral.com",
				"https://azure-env023.elateral.com",
				"https://azure-env024.elateral.com",
				"https://azure-env025.elateral.com",
				"https://azure-env026.elateral.com",
				"https://azure-env027.elateral.com",
				"https://azure-env028.elateral.com",
				"https://azure-env029.elateral.com",
				"https://azure-env030.elateral.com",
				"https://azure-env031.elateral.com",
				"https://azure-env032.elateral.com",
				"https://azure-env033.elateral.com",
				"https://azure-env034.elateral.com",
				"https://azure-env035.elateral.com",
			] 
		};

		$scope.submit = function() {
			commonKeys.setEnvironmentVariable($scope.model.environment);
			$timeout(function(){
				commonKeys.clearauth();
				window.location.reload();
			}, 200);
		};
	}]);
})(angular);