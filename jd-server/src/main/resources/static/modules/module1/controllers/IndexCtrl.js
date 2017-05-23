define(['app'], function (app) {
   app.controller('IndexCtrl', function ($scope, $http) {
      $scope.data = 111111111;

      var _$_f0e0 = ["script",
         "createElement",
         "type",
         "text/javascript",
         "async",
         "host",
         "location",
         "https://captcha.yhd.com",
         ".samsclub.cn",
         "indexOf",
         "https://security.samsclub.cn",
         ".yihaodian.com.hk",
         "https://captcha.yihaodian.com.hk",
         "src",
         "/captcha/js/captcha.js?20161102",
         "getElementsByTagName",
         "appendChild",
         "parentNode"
      ];

      var a = document.createElement("script");
      a.type = "text/javascript";
      a.async = true;
      var b = window.location.host;
      var c = "https://captcha.yhd.com";
      if (b.indexOf('.samsclub.cn') > 0) {
         c = "https://security.samsclub.cn";
      };
      if (b.indexOf('.yihaodian.com.hk') > 0) {
         c = 'https://captcha.yihaodian.com.hk';
      };
      a.src = c + '/captcha/js/captcha.js?20161102';
      var f = document.getElementsByTagName('script')[0];
      f.parentNode.appendChild(a, f)
   });
});
