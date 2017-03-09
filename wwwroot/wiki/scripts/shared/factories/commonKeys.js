(function(angular) {
    'use strict';
    angular.module('auth.elateral').factory('commonKeys', ['$cookies', function($cookies) {
        var tokenKey = 'elateral-credentials';
        return {
            authheader: 'Elateral-MSC ',
            getTokenKey: function() {
                return tokenKey;
            },
            setEnvironmentVariable: function(value) {
                $cookies.put('environment', value);
            },
            getEnvironmentVariable: function() {
                return $cookies.get('environment');
            },
            getUrl: function(part) {
                var src = part;
                if (part && part[0] !== '/') src += '/';
                return $cookies.get('environment') + src;
            },
            skipauth: function() {
            	return 'elateral-credentials' in $cookies.getAll();
            },
            clearauth: function() {
                $cookies.remove(tokenKey);
            }
        };
    }]);
})(angular);