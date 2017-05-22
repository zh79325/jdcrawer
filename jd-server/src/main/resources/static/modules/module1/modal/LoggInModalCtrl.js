define(['app'], function (app) {
   app.controller('LoggInModalCtrl', function ($scope, $http, $state,
      $q, $uibModalInstance, params) {
      $scope.cancel = function () {
         $uibModalInstance.dismiss('cancel');
      };
      $http.get("api/newLogIn")
         .then(function(r) {
            $scope.data = r.data;
         })
   });

});
