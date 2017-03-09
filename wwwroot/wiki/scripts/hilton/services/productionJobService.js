(function(angular){
	'use strict';
	var module = angular.module('hilton');
	module.factory('ppJobFactory', ['$resource', 'commonKeys', function($rsc, commonKeys){
		var ppjobserviceurl = commonKeys.getUrl('/msc-commerce-services/productionjobs/:key');
		return $rsc(ppjobserviceurl, { key: '@key' }, {
			patch: { method: 'patch', url: ppjobserviceurl }
		});
	}]);
	module.service('ppJobService', ['ppJobFactory', 'commonKeys', function(ppJobFactory, commonKeys) {
		var that = this;
		this.patchJob = function(key, payload, onsuccess, onerror) {
			return ppJobFactory.patch({ key: key }, payload, onsuccess, onerror);
		};
		return this;
	}]);
})(angular);