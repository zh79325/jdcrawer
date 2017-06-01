define(['app', 'app-modal'], function (app) {
   app.controller('JDItemCtrl', function ($scope, $http, toaster,$interval) {
      $scope.itemFilter = {};
      $http.get("api/items")
         .then(function (response) {
            $scope.groups = response.data;
            $scope.groups[0].isCollapsed = true;
         });
      $scope.buy = function (item) {
         item.buying = true;
         $http.post("api/buy/" + item.id)
            .then(function () {
               item.buying = false;
               toaster.pop('info', "下单成功", item.name + "下单成功,请前往京东付款页面付钱");
            });
      }

      $scope.watchItem= function (item) {
         item.buying = true;
         $http.post("api/watch/" + item.id)
            .then(function () {
               item.buying = false;
               toaster.pop('info', "添加监控成功", item.name + "添加监控成功");
            });
      }
      $scope.loadLoggedUser=function(){
         $http.get("api/loggedUsers" )
         .then(function(r){
           $scope.users=r.data;
         })
      }
      $scope.loadLoggedUser();
      $scope.filterByPrice = function (item) {
         var itemFilter = $scope.itemFilter;
         var maxRate = itemFilter.maxRate;
         if (maxRate == undefined || maxRate.trim() == '') {
            maxRate = 1000;
         }
         var minRealPrice = itemFilter.minRealPrice;
         if (minRealPrice == undefined || minRealPrice.trim() == '') {
            minRealPrice = 0;
         }
         var maxRealPrice = itemFilter.maxRealPrice;
         if (maxRealPrice == undefined || maxRealPrice.trim() == '') {
            maxRealPrice = 99999999;
         }
         var minOriginalPrice = itemFilter.minOriginalPrice;
         if (minOriginalPrice == undefined || minOriginalPrice.trim() == '') {
            minOriginalPrice = 0;
         }
         var maxOriginalPrice = itemFilter.maxOriginalPrice;
         if (maxOriginalPrice == undefined || maxOriginalPrice.trim() == '') {
            maxOriginalPrice = 99999999;
         }
         if (item.rateNum > maxRate) {
            return false;
         }
         if (item.realPrice < minRealPrice) {
            return false;
         }
         if (item.realPrice > maxRealPrice) {
            return false;
         }
         if (item.originalPrice < minOriginalPrice) {
            return false;
         }
         if (item.originalPrice > maxOriginalPrice) {
            return false;
         }
         return true;
      }
      var intervalPromise = $interval(function () {
               $scope.loadLoggedUser();
            }, 10000);
            $scope.$on('$destroy', function () {
                       $interval.cancel(intervalPromise);
                    });
   });
});
