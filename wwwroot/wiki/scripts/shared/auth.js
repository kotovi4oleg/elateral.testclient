(function(angular){
	'use strict';
	angular.module('auth.elateral', ['ngCookies', 'ngResource'])
	.config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('authinterceptor');
        }]);
})(angular);