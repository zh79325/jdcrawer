define(['modules/module2/require-config'], function (config) {
   return {
       "require-config":config,
      "ctrl-folder": "modules/module2/controllers",
      "tpl-folder": "modules/module2/views",
      "routers": [{
         "name": "首页",
         "url": "/index2",
         "controller": "Module2IndexCtrl",
         "template": "index.html",
         "views": {
            "test": {
               "controller": "index/Module2IndexTestCtrl",
               "template": "index/test.html"
            }
         }
      }]
   }
})
