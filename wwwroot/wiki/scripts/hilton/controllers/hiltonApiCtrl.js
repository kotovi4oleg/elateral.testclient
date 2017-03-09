(function(angular){
	angular.module('hilton').controller('hiltonApiCtrl', 
		['$rootScope', '$scope', '$state', 'authService', '$q', '$timeout', 'ppJobService',
		function($root, $scope, $state, authService, $q, $timeout, ppJobService) {
		var defaultvalues = {
			status: null,
			jobnumber: null,
			price: null,
			couriername: null,
			courierurl: null,
			airwaybillnumber: null,
			comments: null,
		};

		var model = {
			errors: null,
			response: null,
			ddvalues: [
				'',
				'AcceptedForProduction', 
				'Completed', 
				'RejectedByProducer'],
			selected: function(status) {
				this.status = status;
			},
			filter: function(status) {
				var deferred = $q.defer();

				if (!status) {
					deferred.resolve(this.ddvalues);
					return deferred.promise;
				}

				var ninput = status.toLowerCase();
				deferred.resolve(this.ddvalues.filter(function(st){
					return st.toLowerCase().indexOf(status) === 0;
				}));

				return deferred.promise;
			}
		};

		$scope.privatemodel = { orderitemkey: null };

		$scope.model = angular.extend(model, defaultvalues);

		var reset = function() {
			for (var property in model) {
				if (!model.hasOwnProperty(property)) continue;
				$scope.model[property] = defaultvalues[property];
			}

			$timeout(function() {
				$root.$emit('hilton-status.reset', {})
			}, 100);

			prettyprint();
		};

		var getmodel = function() {
			var model = {
				"Status": $scope.model.status,
			    "JobNumber": $scope.model.jobnumber || null,
			    "CourierName": $scope.model.couriername || null,
			    "CourierUrl": $scope.model.courierurl || null,
			    "AirwayBillNumber": $scope.model.airwaybillnumber || null,
			    "Comments": $scope.model.comments || null
			};

			if ($scope.model.price) {
				model["Price"] = {
			        "Amount": $scope.model.price.amount || null,
			        "CurrencyCode": $scope.model.price.ccode || null
			    };
			}

			for(var property in model) {
				if (!model.hasOwnProperty(property)) continue;
				if (!model[property]) delete model[property];
			}

			return model;
		};

		var prettyprint = function() {
			$scope.model.gotresponse = false;
			var model = getmodel();
			$scope.json = Object.keys(model).length > 0 ? JSON.stringify(model, null, 2) : null;
		};

		$scope.prettyprint = prettyprint;
		$scope.reset = reset;

		$scope.submit = function() {
			$scope.model.loading = true;
			$scope.model.response = null;
			$scope.model.errors = null;
			ppJobService.patchJob($scope.privatemodel.orderitemkey, getmodel(), 
			function(data) {
				$scope.model.response = data ? JSON.stringify(data, null, 2) : '{}';
				$scope.model.loading = false;
			}, function(error) {
				$scope.model.response = (error.data) ? JSON.stringify(error.data, null, 2) : '{}';
				$scope.model.loading = false;
				$scope.model.errors = {
					status: error.status,
					statusText: error.statusText,
					uri: error.config.url,
					httpmethod: error.config.method
				};
			});
		};

		$root.$on('hilton-status.selected', function(vent, data) {
			if (!data || data.length === 0) return;
			$scope.model.status = data[0] || null;
			$scope.prettyprint();
			$scope.$apply();
		});

	}]);
})(angular);