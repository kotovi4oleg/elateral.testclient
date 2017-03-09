(function (angular) {
    'use strict';
    angular.module('auth.elateral').factory('authinterceptor', ['commonKeys', '$cookies', function (commonKeys, $cookies) {
        return {
            request: function(config) {
                config.headers['Authorization'] = commonKeys.authheader + $cookies.get(commonKeys.getTokenKey());
                return config;
            }
        };
    }]);

})(angular);