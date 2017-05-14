define([], function () {
   return {
      "ctrl-folder": "controllers",
      "tpl-folder": "views",
      "routers": [{
         "name": "首页",
         "url": "/index",
         "controller": "IndexCtrl",
         "template": "index.html",
         "views": {
            "test": {
               "controller": "index/IndexTestCtrl",
               "template": "index/test.html"
            }
         }
      }]
   }
})
