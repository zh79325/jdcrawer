define(['modules/module1/require-config'], function (config) {
   return {
      "require-config":config,
      "ctrl-folder": "modules/module1/controllers",
      "tpl-folder": "modules/module1/views",
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
