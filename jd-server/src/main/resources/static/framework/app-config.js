requirejs.config({
   urlArgs: "bust=v1",
   //By default load any module IDs from js/lib
   baseUrl: './',
   // alias libraries paths
   paths: {
      //create alias to plugins (not needed if plugins are on the baseUrl)
      text: 'node_modules/text/text',
      css: 'framework/require-css/css',
      async: 'node_modules/requirejs-plugins/src/async',
      font: 'node_modules/requirejs-plugins/src/font',
      goog: 'node_modules/requirejs-plugins/src/goog',
      image: 'node_modules/requirejs-plugins/src/image',
      json: 'node_modules/requirejs-plugins/src/json',
      noext: 'node_modules/requirejs-plugins/src/noext',
      mdown: 'node_modules/requirejs-plugins/src/mdown',
      propertyParser: 'node_modules/requirejs-plugins/src/propertyParser',
      markdownConverter: 'node_modules/requirejs-plugins/src/Markdown.Converter',


      //App Config
      "angular": "node_modules/angular/angular",
      "ui-router": "node_modules/angular-ui-router/release/angular-ui-router",
      "angularAMD": "node_modules/angular-amd/angularAMD",
      "angular-animate": "node_modules/angular-animate/angular-animate",
      'angular-sanitize': "node_modules/angular-sanitize/angular-sanitize",
      'jquery': "node_modules/jquery/dist/jquery",

      'default-config':'configs/default-config',
      'modules-config':'configs/modules',
      "default-routers":'routers/routers',

      //Main App
      'app':'framework/application',


      //tools
      "basic-tool":'framework/tools',
      "md5":'node_modules/blueimp-md5/js/md5',
      'app-ui-view':'framework/app-ui-view'


   },
   shim: {
      "angularAMD": ["angular"],
      "ui-router": ["angular"],
      "ui-bootstrap": ["angular"],
      "angular-animate": ["angular"],
      "angular-sanitize": ["angular"],
      "default-config":['modules-config']
   },
   deps: ['app']
});
