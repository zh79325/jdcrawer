'use strict';
define(["basic-tool",'jquery','angular'], function ($tool,$) {
   var app = angular.module('application.core', []);
   app.directive('appUiView', function ($compile, $http, $parse, $state, $controller, $templateCache, $timeout, $interval) {
      return {
         restrict: 'AE',
         //  template: '<div></div>',
         //  replace: false,
         // transclude: true,
         link: function (scope, element, attrs, ngModel) {
            // var html ='<div ></div>';
            // var e =$compile(html)(scope);
            // element.replaceWith(e);

            var controllerName = null;
            var controller = attrs.controller;
            var template = attrs.template;
            var target = attrs.target;

            var current = $state.current;


            function getViews(state) {
               if (!state.$allViews) {
                  state.$allViews = {};
                  for (var k in state.$views) {
                    push(state.$allViews, k, state.$views[k]);
                  }
               }
               return state.$allViews;
            }

            function push(item, k, v) {
               item[k] = v;
               if (v.$views) {
                  for (var k2 in v.$views) {
                    push(item, k2, v.$views[k2]);
                  }
               }
            }

            if (target && current.$views) {
               var views = getViews(current);
               var item = views[target];
               if (item) {
                  controller = item.controllerPath;
                  template = item.templateUrl;
                  controllerName = item.controller;
               }
            }

            if (template.indexOf('/') == 0) {
               template = template.substring(1);
            }




            if (controller && controller.indexOf('/') == 0) {
               controller = controller.substring(1);
            }

            if (controller && controller != '') {
               controllerName = controller.substring(controller.lastIndexOf('/') + 1);
            }


            // var controllerName = controller.substring(i + 1);
            var templateCtrl, templateScope;



            var regAndInvoke = function (text) {
               var doReg = function () {
                  if (controllerName) {
                     templateScope = scope.$new();
                     templateScope.$$$elementId = $tool.uuid();
                  }
                  else {
                     templateScope = scope;
                  }

                  var locals = {
                     $scope: templateScope
                  };

                  $.each(attrs, function (key, value) {
                     if (key.indexOf("$") == 0) {
                        return true;
                     }
                     var m = scope.$eval(value)
                     if (m) {
                        locals[key] = m;
                     }
                  });
                  var html = text;
                  element.html(html);
                  if (controllerName) {
                     templateCtrl = $controller(controllerName, locals);

                     element.data('$ngControllerController', templateCtrl);
                     var children = element.children();
                     children.data('$ngControllerController', templateCtrl);
                  }
                  $compile(element.contents())(templateScope);

                  if (templateScope.$$$elementId) {
                     // console.log("create "+templateScope.$$$elementId);
                     $(element).attr('id', templateScope.$$$elementId);

                     templateScope.$$$checkIfDeleted = function () {
                        var deleted = true;
                        var item = document.getElementById(templateScope.$$$elementId);
                        if (item) {
                           deleted = false;
                        }
                        if (deleted) {
                           if (templateScope) {
                              templateScope.$destroy();
                              // console.log('del '+elementId);
                           }
                           $interval.cancel(intervalPromise);
                        }
                     }

                     var intervalPromise = $interval(function () {
                        templateScope.$$$checkIfDeleted();
                     }, 1000);

                  }




                  $timeout(function () {
                     templateScope.$apply();
                  });
               };
               if (controllerName) {
                  require([controller], doReg);
               }
               else {
                  doReg();
               }

            };
            var cacheKey = "APPUIVIEW_" + $tool.md5(template) + ".html";
            var templateCache = $templateCache.get(cacheKey);
            if (templateCache) {
               regAndInvoke(templateCache);
            }
            else {
               require(['text!' + template], function (text) {
                  $templateCache.put(cacheKey, text);
                  regAndInvoke(text);
               });
            }
         }
      }
   });
});
