###routers.js
/*路由入口文件，定义其他路由配置文件的路径*/
/*默认从routers路径下进行加载*/
/*每次添加新的路由配置文件都需要在此加入对应的文件路径*/
/*files:具体路由配置对应的文件信息,默认从routers目录下加载.json后缀可以不需要*/
/*default:默认路由指向*/
{
   "default": "index",
   "files": ["main-router"]
}

###module1-router.json
/*路由配置demo*/
/*ctrl-folder:默认控制器加载路径*/
/*tpl-folder：默认模板加载路径*/
/*一个路由信息包含名称、url、控制器、模板、子路由以及子页面*/
/*name: 定义路由对应的名称， 与对应的菜单相关联*/
/*url: 定义页地址*/
/*controller： 定义页面对应的控制器文件,从ctrl-folder指定的目录下加载 */
/*             若未定义ctrl-folder,默认从根目录加载*/

/*template：定义页面对应的视图文件,tpl-folder指定的目录下加载,tpl-folder,默认从根目录加载*/
/*children:子路由,包含其子状态的路由配置信息*/
/*views:子页面定义*/
{
   "ctrl-folder": "controllers",
   "tpl-folder": "views",
   "routers": [{
      "name": "首页",
      "url": "index",
      "controller": "IndexCtrl.js",
      "template": "index.html",
   }]
}
