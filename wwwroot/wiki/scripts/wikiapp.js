(function(angular){
	'use strict';
	var _tmpPrefix =  '/wiki'
	var wikiapp = function($stprovider, $urlrouter) {

		$urlrouter.otherwise('/');
		$stprovider.state('/', {
			url: '/',
			views: {
				'main': {
					templateUrl: _tmpPrefix + '/views/index.html'
				}
			}
		});
		
		configurationRouter($stprovider);

		hiltonRouter($stprovider);
	};

	var configurationRouter = function($stprovider) {
		$stprovider.state('/configuration', {
			url: '/configuration',
			controller: function(){},
			views: {
				'main' : {
					controller: 'configCtrl',
					templateUrl: _tmpPrefix + '/views/configuration/index.html'
				}
			}
		});
	};

	var hiltonRouter = function($stprovider) {
		//begin hilton vendor
		$stprovider.state('/hilton', {
			url: '/hilton',
			controller: function(){},
			views: {
				'main' : {
					templateUrl: _tmpPrefix + '/views/hilton/hilton.html'
				}
			}
		});
		$stprovider.state('/hilton-login', {
			url: '/hilton-login',
			controller: function(){},
			views: {
				'main' : {
					controller: 'hiltonLoginCtrl',
					templateUrl: _tmpPrefix + '/views/hilton/hilton-login.html',
					resolve: {
						authenticate: ['$q', 'authService', '$state', '$timeout', function($q, authService, $state, $timeout) {
							if (authService.alreadySignIn()) {
								$timeout(function(){
									$state.go('/hilton-api');							
								});
							}

							return $q.when();
						}]
					}
				}
			}
		});
		$stprovider.state('/hilton-api', {
			url: '/hilton-api',
			controller: function(){},
			views: {
				'main' : {
					controller: 'hiltonApiCtrl',
					templateUrl: _tmpPrefix + '/views/hilton/hilton-api.html',
					resolve: {
						authenticate: ['$q', 'authService', '$state', '$timeout', function($q, authService, $state, $timeout) {
							if (authService.alreadySignIn())
								return $q.when();
							$timeout(function(){
								$state.go('/hilton-login');							
							});
							return $q.reject();
						}]
					}
				}
			}
		});
		//end hilton vendor
	};

	angular.module('wiki', [
		'ui.router', 
		'ngCookies', 
		'hilton',
		'ngResource',
		'ngAnimate',
		'auth.elateral',
		'shared.elateral']).config(['$stateProvider', '$urlRouterProvider', wikiapp]);
})(angular);