var app = angular.module("app", []);
app.controller('MainController', function ($scope, $controller, $compile) {

   $scope.data = '33333333';

   var html = '<h2>parent:{{parentData}}</h2><div>Hello {{data}}! </div><input ng-model="data"/>';

   //获取scope对象
   var templateScope = $scope.$new();
   var locals = {
      $scope: templateScope
   };

   var element = document.getElementById("example2");
   element.innerHTML = html;


   var attrs = {};
   for (var i = 0, atts = element.attributes, n = atts.length; i < n; i++) {
      var att = atts[i];
      attrs[att.nodeName] = att.nodeValue;
   }

   //加载与element绑定的对象
   $.each(attrs, function (key, value) {
      if (key.indexOf("$") == 0) {
         return true;
      }
      var m = $scope.$eval(value)
      if (m) {
         locals[key] = m;
      }
   });

   //注册Controller
   var controllerName = "ChildController";
   var templateCtrl = $controller(controllerName, locals);
   $(element).data('$ngControllerController', templateCtrl);
   var children = $(element).children();
   children.data('$ngControllerController', templateCtrl);

   $compile($(element).contents())(templateScope);
});


app.controller('ChildController', function ($scope, data) {
   $scope.data = "11111";
   $scope.parentData = data;
});
