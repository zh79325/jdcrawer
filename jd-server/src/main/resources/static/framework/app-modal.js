'use strict';
define(['basic-theam'], function () {
   var app = angular.module('app.modal', []);
   app.directive("appModal", ['$timeout', '$compile', '$parse', '$uibModal', '$state', function ($timeout, $compile, $parse, $uibModal, $state) {
      return {
         scope: {
            onClick: '&?',
            onOk: '&?',
            onCancel: '&?',
            onClose: '&?',
            controllerUrl: '@',
            controller: '@',
            templateUrl: '@'
         },
         link: function (scope, element, attrs, ngModel) {

            var controllerName = scope.controller;
            if (!controllerName) {
               controllerName = scope.controllerUrl;
               var i = controllerName.lastIndexOf('/');

               if (i >= 0) {
                  controllerName = controllerName.substring(i + 1);
               }
            }





            var openning = false;

            var clickFunc = function (params) {

               /**
                * backdrop : true,static
                * keyboard : true
                */
               var modalInstance = $uibModal.open({
                  backdrop: attrs['backdrop'] ? attrs['backdrop'] : true,
                  keyboard: attrs['keyboard'] ? attrs['keyboard'] : true,
                  animation: true,
                  templateUrl: scope.templateUrl,
                  controller: controllerName,
                  size: attrs['size'],
                  resolve: {
                     params: function () {
                        return params;
                     }
                  }
               });
               modalInstance.opened.then(function () {
                  openning = false;
               });
               modalInstance.result.then(function (data) {
                  if (scope.onOk) {
                     scope.onOk(scope.$parent, {
                        $data: data
                     });
                  }
                  if (scope.onClose) {
                     scope.onClose(scope.$parent, {
                        $data: data
                     });
                  }
               }, function (data) {
                  if (scope.onCancel) {
                     scope.onCancel(scope.$parent, {
                        $data: data
                     });
                  }

                  if (scope.onClose) {
                     scope.onClose(scope.$parent, {
                        $data: data
                     });
                  }
               });
            };



            // console.log(initClass);
            element.bind('click', function (event) {
               if (openning) {
                  // return;
               }
               openning = true;
               /* invoke click before loading resource */
               var params = {};
               if (scope.onClick) {
                  params.clickResult = scope.onClick(scope, {
                     $event: event
                  });
               }
               $.each(attrs, function (k, v) {
                  if (k.indexOf('bindValue') == 0) {
                     params[k] = scope.$parent.$eval(v);
                  }
                  if (k.indexOf('rawValue') == 0) {
                     params[k] = v;
                  }
               })

               require([scope.controllerUrl], function () {
                  $timeout(function () {
                     clickFunc(params);
                  });
               });


            });
         }
      }

   }]);
});
