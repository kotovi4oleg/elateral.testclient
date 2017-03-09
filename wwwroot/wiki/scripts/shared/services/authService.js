(function(angular){
	'use strict';
	var module = angular.module('auth.elateral');
	module.factory('authFactory', ['$resource', 'commonKeys', function($rsc, commonKeys){
		var signin = commonKeys.getUrl('/msc-user-services/account/sessiontoken');
		return $rsc(signin, null, {
			signIn: { method: 'post', url: signin }
		});
	}]);
	module.service('authService', ['authFactory', '$cookies', 'commonKeys', function(authfactory, $cookies, commonKeys) {
		var that = this;
		this.signIn = function(userlogonuid, vendor, password, success, errorс) {
			return authfactory.signIn({
				"userLogin": userlogonuid,
				"userPassword": password,
				"vendor": vendor
			}, function(tokenData) {
				$cookies.put(commonKeys.getTokenKey(), tokenData.token);
				success.apply(that, [tokenData]);
			}, function(error) {
				errorс.apply(that, [error]);
			});
		};

		this.alreadySignIn = function() {
			return commonKeys.skipauth();
		};

		return this;
	}]);
})(angular);