(function (angular, $) {
    'use strict';

    angular.module('shared.elateral').directive('select2dd', ['$rootScope', function($rootScope) {
        return {
           restrict: 'E',
           replace: true, 
           template: '<select class="select2"></select>',
           scope: { list: '=', ddid: '=', placeholder: '=', selected: '=', onchnage: '=', multiple: '=' },
           controller: ['$rootScope', '$scope', function($root, $scope) {
                var $el = $('#' + $scope.ddid);
                $root.$on($scope.ddid + '.reset', function(){
                    $el.val('').trigger('change');
                });
           }],
           compile: function() {
                return { 
                    post: function(scope, element, attributes) {
                        var sc = scope;
                        var $el = $(element);
                        $el.select2({ 
                            width:null, 
                            placeholder: scope.placeholder,
                            theme:"classic",
                            data: scope.list,
                            tags: true
                        }).on('change', 
                        function(vent) { 
                            var $iel = $el;
                            var target = vent.currentTarget;
                            var options = $(target).find(":selected"), results = [];
                            for(var i = 0; i < options.length; i++) {
                              var current = options[i].value;
                              results.push(current); 
                            }
                            $rootScope.$emit(scope.ddid + '.selected', results);
                            if (!scope.multiple)
                              sc.selected = results[0];
                            else  sc.selected = results;
                        });
                    } 
                }
           }
        };
    }]);
})(angular, jQuery);
//ui bindings
    