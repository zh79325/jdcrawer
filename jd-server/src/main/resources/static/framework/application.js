define(['angularAMD', 'default-routers',
      "basic-tool", "angular", 'ui-router',
      'angular-animate', 'angular-sanitize',
      'app-ui-view', 'basic-theam'
   ],
   function (angularAMD, routers, $tools) {
      var app = angular.module('application', ['ui.router', 'ngAnimate', 'ngSanitize', 'application.core','ui.bootstrap','toaster']);
      var loadFiles = function (folder, files, success) {
         var targets = [];
         for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (!file.endsWith('.json')) {
               file += '.json';
            }

            if (file.startsWith('/')) {
               file = file.substring(1);
            }
            file = "json!" + folder + "/" + file;
            targets.push(file);
         }
         require(targets, function () {
            success(arguments);
         });
      }

      // 这是Http拦截器，提供一些特殊的http拦截操作
      app.factory('AppHttpInterceptor', function ($q) {
         return {
            request: function (httpconfig) {
               return httpconfig;
            },
            requestError: function (rejection) {
               return rejection;
            },
            response: function (resp) {
               return resp;
            },
            responseError: function (response) {
               return $q.reject(response);
            }
         }
      });

      var setupCtrlPath = function (ctrlFolder, tplFolder, item) {
         var ctrl = item.controller;
         var tpl = item.template;
         var url = item.url;
         if (ctrl && ctrlFolder != "") {
            ctrl = ctrlFolder + "/" + ctrl;
         }
         if (tpl && tplFolder != "") {
            tpl = tplFolder + "/" + tpl;
         }
         if (ctrl) {
            var ctrlName = ctrl.substring(ctrl.lastIndexOf('/') + 1);
            item.controller = ctrlName;
            item.controllerPath = ctrl;
            // item.controllerProvider = ctrlName;
         }
         if (tpl) {
            item.templateUrl = tpl;
            item.template = undefined;
         }
         if (url) {
            item.resolve = {
               loadController: ['$q', '$state',
                  function ($q, $state) {
                     var deferred = $q.defer();
                     require([item.controllerPath], function () {
                        deferred.resolve();
                     });
                     return deferred.promise;
                  }
               ]
            };
         }
         if (item.views) {
            item.$views = item.views;
            delete item.views;
            for (var k in item.$views) {
               setupCtrlPath(ctrlFolder, tplFolder, item.$views[k]);
            }
         }
      }
      var regRouterItem = function ($stateProvider, ctrlFolder, tplFolder, item) {


         setupCtrlPath(ctrlFolder, tplFolder, item);

         item.$id = $tools.uuid();


         if (item.children) {
            for (var i = 0; i < item.children.length; i++) {
               regRouterItem($stateProvider, ctrlFolder, tplFolder, item.children[i]);
            }
         }

         if (item.resolve) {
            $stateProvider.state(item.$id, item);
         }
      }
      var regRouter = function (routers, $stateProvider) {
         for (var i = 0; i < routers.length; i++) {
            var router = routers[i];
            var ctrlFolder = router["ctrl-folder"];
            var tplFolder = router['tpl-folder'];
            for (var j = 0; j < router.routers.length; j++) {
               regRouterItem($stateProvider, ctrlFolder, tplFolder, router.routers[j]);
            }
         }
      }

      app.config(['$qProvider', '$provide', '$stateProvider', '$urlRouterProvider', '$httpProvider', '$controllerProvider',
         function ($qProvider, $provide, $stateProvider, $urlRouterProvider, $httpProvider, $controllerProvider) {
            $qProvider.errorOnUnhandledRejections(false);
            // 注册消息机制
            $provide.decorator('$rootScope', ['$delegate', function ($delegate) {

               Object.defineProperty($delegate.constructor.prototype, '$onMessage', {
                  value: function (name, listener) {
                     var unsubscribe = $delegate.$on(name, listener);
                     this.$on('$destroy', unsubscribe);

                     return unsubscribe;
                  },
                  enumerable: false
               });


               return $delegate;
            }]);

            //注册拦截器
            $httpProvider.interceptors.push('AppHttpInterceptor');


            regRouter(routers.routers, $stateProvider);


            // 注册默认路由

            $urlRouterProvider.when('', routers.default);
            $urlRouterProvider.otherwise(routers.default);
         }
      ]);


      app.controller('$ApplicationBaseCtrl',
         function ($scope, $rootScope, $http, $window, $state, $transitions) {
            $transitions.onSuccess({},
               function (trans) {
                  $scope.current = trans.targetState().state();
               });
            $transitions.onStart('TransitionService.onStart ',
               function (trans) {});
         });


      return angularAMD.bootstrap(app);
   });
