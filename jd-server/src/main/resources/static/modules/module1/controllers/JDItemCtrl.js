define(['app'], function (app) {
   app.controller('JDItemCtrl', function ($scope, $http) {
      $scope.itemFilter = {};
      $http.get("api/items")
         .then(function (response) {
            $scope.groups = response.data;
            $scope.groups[0].isCollapsed = true;
            console.log($scope.groups);
         });

      $scope.filterByPrice = function (item) {
         var itemFilter = $scope.itemFilter;
         var maxRate = itemFilter.maxRate;
         if (maxRate == undefined||maxRate.trim()=='') {
            maxRate = 1000;
         }
         var minRealPrice = itemFilter.minRealPrice;
         if (minRealPrice == undefined||minRealPrice.trim()=='') {
            minRealPrice = 0;
         }
         var maxRealPrice = itemFilter.maxRealPrice;
         if (maxRealPrice == undefined||maxRealPrice.trim()=='') {
            maxRealPrice = 99999999;
         }
         var minOriginalPrice = itemFilter.minOriginalPrice;
         if (minOriginalPrice == undefined||minOriginalPrice.trim()=='') {
            minOriginalPrice = 0;
         }
         var maxOriginalPrice = itemFilter.maxOriginalPrice;
         if (maxOriginalPrice == undefined||maxOriginalPrice.trim()=='') {
            maxOriginalPrice = 99999999;
         }
         if(item.rateNum>maxRate){
           return false;
         }
         if(item.realPrice<minRealPrice){
           return false;
         }
         if(item.realPrice>maxRealPrice){
           return false;
         }
         if(item.originalPrice<minOriginalPrice){
           return false;
         }
         if(item.originalPrice>maxOriginalPrice){
           return false;
         }
         return true;
      }
   });
});
