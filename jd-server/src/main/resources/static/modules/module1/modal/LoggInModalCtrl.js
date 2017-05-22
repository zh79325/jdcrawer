define(['app'], function (app) {
   app.controller('LoggInModalCtrl', function ($scope, $http, $state,
      $q, $uibModalInstance, params, $timeout, toaster) {
      var closed = false;
      $scope.cancel = function () {
         closed = true;
         $uibModalInstance.dismiss('cancel');
      };
      $http.get("api/newLogIn")
         .then(function (r) {
            $scope.data = r.data;
            waitUserLogin($scope.data.identity);
         })

      var waitUserLogin = function (identity) {
         $http.get("api/logInStatus/" + identity)
            .then(function (r) {
               var data = r.data;
               if (data.logInSuccess) {
                  toaster.pop('info', "登录成功", "登录成功");
                  $scope.cancel()
               }
               else {
                  if (!closed) {
                     $timeout(function () {
                        waitUserLogin(data.identity);
                     }, 1000);
                  }
               }

            })
      }
   });

});
