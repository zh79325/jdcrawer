define(['app', 'app-modal'], function (app) {
   app.controller('JDItemCtrl', function ($scope, $http) {
      $scope.itemFilter = {};
      $http.get("api/items")
         .then(function (response) {
            $scope.groups = response.data;
            $scope.groups[0].isCollapsed = true;
         });
      $scope.buy = function (item) {
         $http.post("api/buy/" + item.id);
      }
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
      var q = [],
         v = "",
         t = "Abadi MT Condensed Light;Adobe Fangsong Std;Adobe Hebrew;Adobe Ming Std;Agency FB;Arab;Arabic Typesetting;Arial Black;Batang;Bauhaus 93;Bell MT;Bitstream Vera Serif;Bodoni MT;Bookman Old Style;Braggadocio;Broadway;Calibri;Californian FB;Castellar;Casual;Centaur;Century Gothic;Chalkduster;Colonna MT;Copperplate Gothic Light;DejaVu LGC Sans Mono;Desdemona;DFKai-SB;Dotum;Engravers MT;Eras Bold ITC;Eurostile;FangSong;Forte;Franklin Gothic Heavy;French Script MT;Gabriola;Gigi;Gisha;Goudy Old Style;Gulim;GungSeo;Haettenschweiler;Harrington;Hiragino Sans GB;Impact;Informal Roman;KacstOne;Kino MT;Kozuka Gothic Pr6N;Lohit Gujarati;Loma;Lucida Bright;Lucida Fax;Magneto;Malgun Gothic;Matura MT Script Capitals;Menlo;MingLiU-ExtB;MoolBoran;MS PMincho;MS Reference Sans Serif;News Gothic MT;Niagara Solid;Nyala;Palace Script MT;Papyrus;Perpetua;Playbill;PMingLiU;Rachana;Rockwell;Sawasdee;Script MT Bold;Segoe Print;Showcard Gothic;SimHei;Snap ITC;TlwgMono;Tw Cen MT Condensed Extra Bold;Ubuntu;Umpush;Univers;Utopia;Vladimir Script;Wide Latin".split(";"),
         r = "4game;AdblockPlugin;AdobeExManCCDetect;AdobeExManDetect;Alawar NPAPI utils;Aliedit Plug-In;Alipay Security Control 3;AliSSOLogin plugin;AmazonMP3DownloaderPlugin;AOL Media Playback Plugin;AppUp;ArchiCAD;AVG SiteSafety plugin;Babylon ToolBar;Battlelog Game Launcher;BitCometAgent;Bitdefender QuickScan;BlueStacks Install Detector;CatalinaGroup Update;Citrix ICA Client;Citrix online plug-in;Citrix Receiver Plug-in;Coowon Update;DealPlyLive Update;Default Browser Helper;DivX Browser Plug-In;DivX Plus Web Player;DivX VOD Helper Plug-in;doubleTwist Web Plugin;Downloaders plugin;downloadUpdater;eMusicPlugin DLM6;ESN Launch Mozilla Plugin;ESN Sonar API;Exif Everywhere;Facebook Plugin;File Downloader Plug-in;FileLab plugin;FlyOrDie Games Plugin;Folx 3 Browser Plugin;FUZEShare;GDL Object Web Plug-in 16.00;GFACE Plugin;Ginger;Gnome Shell Integration;Google Earth Plugin;Google Earth Plug-in;Google Gears 0.5.33.0;Google Talk Effects Plugin;Google Update;Harmony Firefox Plugin;Harmony Plug-In;Heroes & Generals live;HPDetect;Html5 location provider;IE Tab plugin;iGetterScriptablePlugin;iMesh plugin;Kaspersky Password Manager;LastPass;LogMeIn Plugin 1.0.0.935;LogMeIn Plugin 1.0.0.961;Ma-Config.com plugin;Microsoft Office 2013;MinibarPlugin;Native Client;Nitro PDF Plug-In;Nokia Suite Enabler Plugin;Norton Identity Safe;npAPI Plugin;NPLastPass;NPPlayerShell;npTongbuAddin;NyxLauncher;Octoshape Streaming Services;Online Storage plug-in;Orbit Downloader;Pando Web Plugin;Parom.TV player plugin;PDF integrado do WebKit;PDF-XChange Viewer;PhotoCenterPlugin1.1.2.2;Picasa;PlayOn Plug-in;QQ2013 Firefox Plugin;QQDownload Plugin;QQMiniDL Plugin;QQMusic;RealDownloader Plugin;Roblox Launcher Plugin;RockMelt Update;Safer Update;SafeSearch;Scripting.Dictionary;SefClient Plugin;Shell.UIHelper;Silverlight Plug-In;Simple Pass;Skype Web Plugin;SumatraPDF Browser Plugin;Symantec PKI Client;Tencent FTN plug-in;Thunder DapCtrl NPAPI Plugin;TorchHelper;Unity Player;Uplay PC;VDownloader;Veetle TV Core;VLC Multimedia Plugin;Web Components;WebKit-integrierte PDF;WEBZEN Browser Extension;Wolfram Mathematica;WordCaptureX;WPI Detector 1.4;Yandex Media Plugin;Yandex PDF Viewer;YouTube Plug-in;zako".split(";");

      function p(d) {
         var f = {};
         f.name = d.name;
         f.filename = d.filename.toLowerCase();
         f.description = d.description;
         void 0 !== d.version && (f.version = d.version);
         f.mimeTypes = [];
         for (var h = 0; h < d.length; h++) {
            var m = d[h],
               e = {};
            e.description = m.description;
            e.suffixes = m.suffixes;
            e.type = m.type;
            f.mimeTypes.push(e)
         }
         return f
      }
      var toJson = "object" === typeof JSON && JSON.stringify;
      var minHash = function (d) {
         var f, h, m, e = d.length & 3,
            l = d.length - e;
         f = void 0;
         for (m = 0; m < l;)
            h = d.charCodeAt(m) & 255 | (d.charCodeAt(++m) & 255) << 8 | (d.charCodeAt(++m) & 255) << 16 | (d.charCodeAt(++m) & 255) << 24,
            ++m,
            h = 3432918353 * (h & 65535) + ((3432918353 * (h >>> 16) & 65535) << 16) & 4294967295,
            h = h << 15 | h >>> 17,
            h = 461845907 * (h & 65535) + ((461845907 * (h >>> 16) & 65535) << 16) & 4294967295,
            f ^= h,
            f = f << 13 | f >>> 19,
            f = 5 * (f & 65535) + ((5 * (f >>> 16) & 65535) << 16) & 4294967295,
            f = (f & 65535) + 27492 + (((f >>> 16) + 58964 & 65535) << 16);
         h = 0;
         switch (e) {
         case 3:
            h ^= (d.charCodeAt(m + 2) & 255) << 16;
         case 2:
            h ^= (d.charCodeAt(m + 1) & 255) << 8;
         case 1:
            h ^= d.charCodeAt(m) & 255,
               h = 3432918353 * (h & 65535) + ((3432918353 * (h >>> 16) & 65535) << 16) & 4294967295,
               h = h << 15 | h >>> 17,
               f ^= 461845907 * (h & 65535) + ((461845907 * (h >>> 16) & 65535) << 16) & 4294967295
         }
         f ^= d.length;
         f ^= f >>> 16;
         f = 2246822507 * (f & 65535) + ((2246822507 * (f >>> 16) & 65535) << 16) & 4294967295;
         f ^= f >>> 13;
         f = 3266489909 * (f & 65535) + ((3266489909 * (f >>> 16) & 65535) << 16) & 4294967295;
         return (f ^ f >>> 16) >>> 0
      }

      function l() {
         function d(d) {
            var e = {};
            m.style.fontFamily = d;
            document.body.appendChild(m);
            e.height = m.offsetHeight;
            e.width = m.offsetWidth;
            document.body.removeChild(m);
            return e
         }
         var f = ["monospace", "sans-serif", "serif"],
            h = [],
            m = document.createElement("span");
         m.style.fontSize = "72px";
         m.style.visibility = "hidden";
         m.innerHTML = "mmmmmmmmmmlli";
         for (var e = 0; e < f.length; e++)
            h[e] = d(f[e]);
         this.checkSupportFont = function (e) {
            for (var m = 0; m < h.length; m++) {
               var a = d(e + "," + f[m]),
                  c = h[m];
               if (a.height !== c.height || a.width !== c.width)
                  return !0
            }
            return !1
         }
      }

      function Jd_Jr_Td_Security_Model(f, l) {
         var p = !1;
         return {
            flashId: f,
            url: l,
            container: null,
            init_model: function () {
               if (this.flashCheck().f) {
                  window.jd_jr_td_fl_security_load_event = function (f) {
                     p = !0
                  };
                  var q = document.createElement("div");
                  q.setAttribute("style", "width:1px;height:1px;background:#FFF;display:inline-block;position:absolute;left:-2000px;top:-2000px;");
                  q.innerHTML = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="0" height="0" id="' + f + '" align="middle"><param name="movie" value="' + l + '" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" /><param name="play" value="true" /><param name="loop" value="true" /><param name="wmode" value="window" /><param name="scale" value="showall" /><param name="menu" value="true" /><param name="devicefont" value="false" /><param name="salign" value="" /><param name="allowScriptAccess" value="always" /><param name="swliveconnect" value="true"/><embed play="true" allowScriptAccess="always" swliveconnect="true" name="' + f + '" src="' + l + '" quality="high" bgcolor="#FFFFFF" width="0" height="0" type="application/x-shockwave-flash" swliveconnect="true" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash"/></object>';
                  document.body.appendChild(q);
                  this.container = q
               }
            },
            destroy: function () {
               try {
                  null != this.container && this.container.parentNode.removeChild(this.container),
                     window.jd_jr_td_fl_security_load_event && (window.jd_jr_td_fl_security_load_event = void 0)
               }
               catch (q) {}
            },
            securityDetail: function () {
               var l = null;
               if (p && f) {
                  var v = this.getContainer();
                  try {
                     l = v.jd_jr_td_security_fl_info()
                  }
                  catch (t) {}
               }
               return l
            },
            setSecurityVal: function (l) {
               var q = !1;
               if (p && f) {
                  var t = this.getContainer();
                  try {
                     q = t.jd_jr_td_security_s_fl_ser(l)
                  }
                  catch (r) {}
               }
               return q
            },
            getSecurityVal: function () {
               var l = null;
               if (p && f) {
                  var v = this.getContainer();
                  try {
                     l = v.jd_jr_td_security_g_fl_ser()
                  }
                  catch (t) {}
               }
               return l
            },
            getContainer: function () {
               var l = document[f]; -
               1 != navigator.appName.indexOf("Microsoft") && (l = window[f]);
               return l
            },
            flashCheck: function () {
               try {
                  var f = 0,
                     l = 0;
                  if (document.all)
                     var p = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),
                        f = 1,
                        r = p.GetVariable("$version"),
                        l = parseInt(r.split(" ")[1].split(",")[0]);
                  else if (navigator.plugins && 0 < navigator.plugins.length && (p = navigator.plugins["Shockwave Flash"]))
                     for (var f = 1, d = p.description.split(" "), p = 0; p < d.length; ++p)
                        isNaN(parseInt(d[p])) || (l = parseInt(d[p]));
                  return {
                     f: f,
                     v: l
                  }
               }
               catch (z) {}
               return {
                  f: !1
               }
            }
         }
      }
      var _jdJrTdSecurityModel = new Jd_Jr_Td_Security_Model("jd_jr_td_flash", "http://payrisk.jd.com/JdSecurity.swf");
      _jdJrTdSecurityModel.init_model();
      var collect = function () {
         var d = new Date;
         try {
            var f = document.createElement("div"),
               h = {},
               m = "ActiveBorder ActiveCaption AppWorkspace Background ButtonFace ButtonHighlight ButtonShadow ButtonText CaptionText GrayText Highlight HighlightText InactiveBorder InactiveCaption InactiveCaptionText InfoBackground InfoText Menu MenuText Scrollbar ThreeDDarkShadow ThreeDFace ThreeDHighlight ThreeDLightShadow ThreeDShadow Window WindowFrame WindowText".split(" ");
            if (window.getComputedStyle)
               for (var e = 0; e < m.length; e++)
                  document.body.appendChild(f),
                  f.style.color = m[e],
                  h[m[e]] = window.getComputedStyle(f).getPropertyValue("color"),
                  document.body.removeChild(f)
         }
         catch (x) {}
         var f = {
               ca: {},
               ts: {},
               m: {}
            },
            m = f.ca,
            u, w, e = 0;
         try {
            u = document.createElement("canvas"),
               w = u.getContext("2d")
         }
         catch (x) {}
         w && (w.fillStyle = "red",
            w.fillRect(30, 10, 200, 100),
            w.strokeStyle = "#1a3bc1",
            w.lineWidth = 6,
            w.lineCap = "round",
            w.arc(50, 50, 20, 0, Math.PI, !1),
            w.stroke(),
            w.fillStyle = "#42e1a2",
            w.font = "15.4px 'Arial'",
            w.textBaseline = "alphabetic",
            w.fillText("PR flacks quiz gym: TV DJ box when? \u2620", 15, 60),
            w.shadowOffsetX = 1,
            w.shadowOffsetY = 2,
            w.shadowColor = "white",
            w.fillStyle = "rgba(0, 0, 200, 0.5)",
            w.font = "60px 'Not a real font'",
            w.fillText("No\u9a97", 40, 80),
            e = minHash(u.toDataURL()));
         m.tdHash = e;
         u = !1;
         if (window.WebGLRenderingContext) {
            w = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"];
            for (var a = [], c, e = 0; e < w.length; e++)
               try {
                  var b = !1;
                  (b = document.createElement("canvas").getContext(w[e], {
                     stencil: !0
                  })) && b && (c = b,
                     a.push(w[e]))
               }
            catch (x) {}
            a.length && (u = {
               name: a,
               gl: c
            })
         }
         if (u) {
            e = u.gl;
            m.contextName = u.name.join();
            m.webglversion = e.getParameter(e.VERSION);
            m.shadingLV = e.getParameter(e.SHADING_LANGUAGE_VERSION);
            m.vendor = e.getParameter(e.VENDOR);
            m.renderer = e.getParameter(e.RENDERER);
            c = [];
            try {
               c = e.getSupportedExtensions(),
                  m.extensions = c
            }
            catch (x) {}
         }
         f.ts.deviceTime = d.getTime();
         f.m.documentMode = document.documentMode;
         f.m.compatMode = document.compatMode;
         m = [];
         c = new l;
         for (e = 0; e < t.length; e++)
            u = t[e],
            c.checkSupportFont(u) && m.push(u);
         f.fo = m;
         var e = {},
            m = [],
            k;
         for (k in navigator)
            "object" != typeof navigator[k] && (e[k] = navigator[k]),
            m.push(k);
         e.enumerationOrder = m;
         e.javaEnabled = navigator.javaEnabled();
         try {
            e.taintEnabled = navigator.taintEnabled()
         }
         catch (x) {}
         f.n = e;
         var e = navigator.userAgent.toLowerCase(),
            g;
         if (k = e.match(/rv:([\d.]+)\) like gecko/))
            g = k[1];
         if (k = e.match(/msie ([\d.]+)/))
            g = k[1];
         k = [];
         if (g)
            for (g = "AcroPDF.PDF;Adodb.Stream;AgControl.AgControl;DevalVRXCtrl.DevalVRXCtrl.1;MacromediaFlashPaper.MacromediaFlashPaper;Msxml2.DOMDocument;Msxml2.XMLHTTP;PDF.PdfCtrl;QuickTime.QuickTime;QuickTimeCheckObject.QuickTimeCheck.1;RealPlayer;RealPlayer.RealPlayer(tm) ActiveX Control (32-bit);RealVideo.RealVideo(tm) ActiveX Control (32-bit);rmocx.RealPlayer G2 Control;Scripting.Dictionary;Shell.UIHelper;ShockwaveFlash.ShockwaveFlash;SWCtl.SWCtl;TDCCtl.TDCCtl;WMPlayer.OCX".split(";"),
               e = 0; e < g.length; e++) {
               var y = g[e];
               try {
                  var n = new ActiveXObject(y),
                     m = {};
                  m.name = y;
                  try {
                     m.version = n.GetVariable("$version")
                  }
                  catch (x) {}
                  try {
                     m.version = n.GetVersions()
                  }
                  catch (x) {}
                  m.version && 0 < m.version.length || (m.version = "");
                  k.push(m)
               }
               catch (x) {}
            }
         else {
            g = navigator.plugins;
            m = {};
            for (e = 0; e < g.length; e++)
               y = g[e],
               m[y.name] = 1,
               k.push(p(y));
            for (e = 0; e < r.length; e++)
               n = r[e],
               m[n] || (y = g[n],
                  y && k.push(p(y)))
         }
         g = "availHeight availWidth colorDepth bufferDepth deviceXDPI deviceYDPI height width logicalXDPI logicalYDPI pixelDepth updateInterval".split(" ");
         y = {};
         for (e = 0; g.length > e; e++)
            n = g[e],
            void 0 !== screen[n] && (y[n] = screen[n]);
         g = ["devicePixelRatio", "screenTop", "screenLeft"];
         m = {};
         for (e = 0; g.length > e; e++)
            n = g[e],
            void 0 !== window[n] && (m[n] = window[n]);
         f.p = k;
         f.w = m;
         f.s = y;
         f.sc = h;
         f.tz = d.getTimezoneOffset();
         f.lil = q.sort().join("|");
         f.wil = v;
         d = {};
         try {
            d.cookie = navigator.cookieEnabled,
               d.localStorage = !!window.localStorage,
               d.sessionStorage = !!window.sessionStorage,
               d.globalStorage = !!window.globalStorage,
               d.indexedDB = !!window.indexedDB
         }
         catch (x) {}
         f.ss = d;
         f.fl = _jdJrTdSecurityModel.securityDetail();
         return tdencrypt(f)
      }
      var tdencrypt = function (d) {
         d = toJson(d);
         d = encodeURIComponent(d);
         var f = "",
            h, m, e, l, p, a, c = 0;
         do
            h = d.charCodeAt(c++),
            m = d.charCodeAt(c++),
            e = d.charCodeAt(c++),
            l = h >> 2,
            h = (h & 3) << 4 | m >> 4,
            p = (m & 15) << 2 | e >> 6,
            a = e & 63,
            isNaN(m) ? p = a = 64 : isNaN(e) && (a = 64),
            f = f + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(l) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(h) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(p) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(a);
         while (c < d.length);
         return f + "/"
      }

      var JdJrTdRiskFinger = function () {
         function f(a) {
            if (null == a || void 0 == a || "" == a)
               return "undefined";
            var c;
            if (null == a || void 0 == a || "" == a)
               c = "";
            else {
               c = [];
               for (var b = 0; b < 8 * a.length; b += 8)
                  c[b >> 5] |= (a.charCodeAt(b / 8) & 255) << b % 32
            }
            a = 8 * a.length;
            c[a >> 5] |= 128 << a % 32;
            c[(a + 64 >>> 9 << 4) + 14] = a;
            a = 1732584193;
            for (var b = -271733879, k = -1732584194, g = 271733878, d = 0; d < c.length; d += 16) {
               var n = a,
                  x = b,
                  e = k,
                  f = g;
               a = p(a, b, k, g, c[d + 0], 7, -680876936);
               g = p(g, a, b, k, c[d + 1], 12, -389564586);
               k = p(k, g, a, b, c[d + 2], 17, 606105819);
               b = p(b, k, g, a, c[d + 3], 22, -1044525330);
               a = p(a, b, k, g, c[d + 4], 7, -176418897);
               g = p(g, a, b, k, c[d + 5], 12, 1200080426);
               k = p(k, g, a, b, c[d + 6], 17, -1473231341);
               b = p(b, k, g, a, c[d + 7], 22, -45705983);
               a = p(a, b, k, g, c[d + 8], 7, 1770035416);
               g = p(g, a, b, k, c[d + 9], 12, -1958414417);
               k = p(k, g, a, b, c[d + 10], 17, -42063);
               b = p(b, k, g, a, c[d + 11], 22, -1990404162);
               a = p(a, b, k, g, c[d + 12], 7, 1804603682);
               g = p(g, a, b, k, c[d + 13], 12, -40341101);
               k = p(k, g, a, b, c[d + 14], 17, -1502002290);
               b = p(b, k, g, a, c[d + 15], 22, 1236535329);
               a = q(a, b, k, g, c[d + 1], 5, -165796510);
               g = q(g, a, b, k, c[d + 6], 9, -1069501632);
               k = q(k, g, a, b, c[d + 11], 14, 643717713);
               b = q(b, k, g, a, c[d + 0], 20, -373897302);
               a = q(a, b, k, g, c[d + 5], 5, -701558691);
               g = q(g, a, b, k, c[d + 10], 9, 38016083);
               k = q(k, g, a, b, c[d + 15], 14, -660478335);
               b = q(b, k, g, a, c[d + 4], 20, -405537848);
               a = q(a, b, k, g, c[d + 9], 5, 568446438);
               g = q(g, a, b, k, c[d + 14], 9, -1019803690);
               k = q(k, g, a, b, c[d + 3], 14, -187363961);
               b = q(b, k, g, a, c[d + 8], 20, 1163531501);
               a = q(a, b, k, g, c[d + 13], 5, -1444681467);
               g = q(g, a, b, k, c[d + 2], 9, -51403784);
               k = q(k, g, a, b, c[d + 7], 14, 1735328473);
               b = q(b, k, g, a, c[d + 12], 20, -1926607734);
               a = l(b ^ k ^ g, a, b, c[d + 5], 4, -378558);
               g = l(a ^ b ^ k, g, a, c[d + 8], 11, -2022574463);
               k = l(g ^ a ^ b, k, g, c[d + 11], 16, 1839030562);
               b = l(k ^ g ^ a, b, k, c[d + 14], 23, -35309556);
               a = l(b ^ k ^ g, a, b, c[d + 1], 4, -1530992060);
               g = l(a ^ b ^ k, g, a, c[d + 4], 11, 1272893353);
               k = l(g ^ a ^ b, k, g, c[d + 7], 16, -155497632);
               b = l(k ^ g ^ a, b, k, c[d + 10], 23, -1094730640);
               a = l(b ^ k ^ g, a, b, c[d + 13], 4, 681279174);
               g = l(a ^ b ^ k, g, a, c[d + 0], 11, -358537222);
               k = l(g ^ a ^ b, k, g, c[d + 3], 16, -722521979);
               b = l(k ^ g ^ a, b, k, c[d + 6], 23, 76029189);
               a = l(b ^ k ^ g, a, b, c[d + 9], 4, -640364487);
               g = l(a ^ b ^ k, g, a, c[d + 12], 11, -421815835);
               k = l(g ^ a ^ b, k, g, c[d + 15], 16, 530742520);
               b = l(k ^ g ^ a, b, k, c[d + 2], 23, -995338651);
               a = v(a, b, k, g, c[d + 0], 6, -198630844);
               g = v(g, a, b, k, c[d + 7], 10, 1126891415);
               k = v(k, g, a, b, c[d + 14], 15, -1416354905);
               b = v(b, k, g, a, c[d + 5], 21, -57434055);
               a = v(a, b, k, g, c[d + 12], 6, 1700485571);
               g = v(g, a, b, k, c[d + 3], 10, -1894986606);
               k = v(k, g, a, b, c[d + 10], 15, -1051523);
               b = v(b, k, g, a, c[d + 1], 21, -2054922799);
               a = v(a, b, k, g, c[d + 8], 6, 1873313359);
               g = v(g, a, b, k, c[d + 15], 10, -30611744);
               k = v(k, g, a, b, c[d + 6], 15, -1560198380);
               b = v(b, k, g, a, c[d + 13], 21, 1309151649);
               a = v(a, b, k, g, c[d + 4], 6, -145523070);
               g = v(g, a, b, k, c[d + 11], 10, -1120210379);
               k = v(k, g, a, b, c[d + 2], 15, 718787259);
               b = v(b, k, g, a, c[d + 9], 21, -343485551);
               a = t(a, n);
               b = t(b, x);
               k = t(k, e);
               g = t(g, f)
            }
            c = [a, b, k, g];
            a = "";
            for (b = 0; b < 4 * c.length; b++)
               a += "0123456789abcdef".charAt(c[b >> 2] >> b % 4 * 8 + 4 & 15) + "0123456789abcdef".charAt(c[b >> 2] >> b % 4 * 8 & 15);
            return a
         }

         function l(a, c, b, d, g, e) {
            a = t(t(c, a), t(d, e));
            return t(a << g | a >>> 32 - g, b)
         }

         function p(a, c, b, d, g, e, n) {
            return l(c & b | ~c & d, a, c, g, e, n)
         }

         function q(a, c, b, d, g, e, n) {
            return l(c & d | b & ~d, a, c, g, e, n)
         }

         function v(a, c, b, d, g, e, n) {
            return l(b ^ (c | ~d), a, c, g, e, n)
         }

         function t(a, c) {
            var b = (a & 65535) + (c & 65535);
            return (a >> 16) + (c >> 16) + (b >> 16) << 16 | b & 65535
         }
         var r = {},
            d = navigator.userAgent.toLowerCase(),
            z = navigator.language; -
         1 != d.indexOf("ipad") || -1 != d.indexOf("iphone os") || -1 != d.indexOf("midp") || -1 != d.indexOf("rv:1.2.3.4") || -1 != d.indexOf("ucweb") || -1 != d.indexOf("android") || -1 != d.indexOf("windows ce") || d.indexOf("windows mobile");
         var h = "unknown",
            m = "unknown";
         try {
            -1 != d.indexOf("win") && -1 != d.indexOf("95") && (h = "windows",
               m = "95"), -1 != d.indexOf("win") && -1 != d.indexOf("98") && (h = "windows",
               m = "98"), -1 != d.indexOf("win 9x") && -1 != d.indexOf("4.90") && (h = "windows",
               m = "me"), -1 != d.indexOf("win") && -1 != d.indexOf("nt 5.0") && (h = "windows",
               m = "2000"), -1 != d.indexOf("win") && -1 != d.indexOf("nt") && (h = "windows",
               m = "NT"), -1 != d.indexOf("win") && -1 != d.indexOf("nt 5.1") && (h = "windows",
               m = "xp"), -1 != d.indexOf("win") && -1 != d.indexOf("32") && (h = "windows",
               m = "32"), -1 != d.indexOf("win") && -1 != d.indexOf("nt 5.1") && (h = "windows",
               m = "7"), -1 != d.indexOf("win") && -1 != d.indexOf("6.0") && (h = "windows",
               m = "8"), -1 == d.indexOf("win") || -1 == d.indexOf("nt 6.0") && -1 == d.indexOf("nt 6.1") || (h = "windows",
               m = "9"), -1 != d.indexOf("win") && -1 != d.indexOf("nt 6.2") && (h = "windows",
               m = "10"), -1 != d.indexOf("linux") && (h = "linux"), -1 != d.indexOf("unix") && (h = "unix"), -1 != d.indexOf("sun") && -1 != d.indexOf("os") && (h = "sun os"), -1 != d.indexOf("ibm") && -1 != d.indexOf("os") && (h = "ibm os/2"), -1 != d.indexOf("mac") && -1 != d.indexOf("pc") && (h = "mac"), -1 != d.indexOf("aix") && (h = "aix"), -1 != d.indexOf("powerpc") && (h = "powerPC"), -1 != d.indexOf("hpux") && (h = "hpux"), -1 != d.indexOf("netbsd") && (h = "NetBSD"), -1 != d.indexOf("bsd") && (h = "BSD"), -1 != d.indexOf("osf1") && (h = "OSF1"), -1 != d.indexOf("irix") && (h = "IRIX",
               m = ""), -1 != d.indexOf("freebsd") && (h = "FreeBSD"), -1 != d.indexOf("symbianos") && (h = "SymbianOS",
               m = d.substring(d.indexOf("SymbianOS/") + 10, 3))
         }
         catch (a) {}
         var e = "unknown",
            u = "unknown";
         try {
            -1 != d.indexOf("msie") && (e = "ie",
               u = d.substring(d.indexOf("msie ") + 5),
               u.indexOf(";") && (u = u.substring(0, u.indexOf(";")))); -
            1 != d.indexOf("firefox") && (e = "Firefox",
               u = d.substring(d.indexOf("firefox/") + 8)); -
            1 != d.indexOf("opera") && (e = "Opera",
               u = d.substring(d.indexOf("opera/") + 6, 4)); -
            1 != d.indexOf("safari") && (e = "safari",
               u = d.substring(d.indexOf("safari/") + 7)); -
            1 != d.indexOf("chrome") && (e = "chrome",
               u = d.substring(d.indexOf("chrome/") + 7),
               u.indexOf(" ") && (u = u.substring(0, u.indexOf(" ")))); -
            1 != d.indexOf("navigator") && (e = "navigator",
               u = d.substring(d.indexOf("navigator/") + 10)); -
            1 != d.indexOf("applewebkit") && (e = "applewebkit_chrome",
               u = d.substring(d.indexOf("applewebkit/") + 12),
               u.indexOf(" ") && (u = u.substring(0, u.indexOf(" ")))); -
            1 != d.indexOf("sogoumobilebrowser") && (e = "\u641c\u72d7\u624b\u673a\u6d4f\u89c8\u5668");
            if (-1 != d.indexOf("ucbrowser") || -1 != d.indexOf("ucweb"))
               e = "UC\u6d4f\u89c8\u5668";
            if (-1 != d.indexOf("qqbrowser") || -1 != d.indexOf("tencenttraveler"))
               e = "QQ\u6d4f\u89c8\u5668"; -
            1 != d.indexOf("metasr") && (e = "\u641c\u72d7\u6d4f\u89c8\u5668"); -
            1 != d.indexOf("360se") && (e = "360\u6d4f\u89c8\u5668"); -
            1 != d.indexOf("the world") && (e = "\u4e16\u754c\u4e4b\u7a97\u6d4f\u89c8\u5668"); -
            1 != d.indexOf("maxthon") && (e = "\u9068\u6e38\u6d4f\u89c8\u5668")
         }
         catch (a) {}
         var w = function (a) {
            this.options = this.extend(a, {});
            this.nativeForEach = Array.prototype.forEach;
            this.nativeMap = Array.prototype.map
         };
         w.prototype = {
            extend: function (a, c) {
               if (null == a)
                  return c;
               for (var b in a)
                  null != a[b] && c[b] !== a[b] && (c[b] = a[b]);
               return c
            },
            getData: function () {
               return r
            },
            get: function (a) {
               var c = 1 * u,
                  b = [];
               "ie" == e && 7 <= c ? (b.push(d),
                  b.push(z),
                  r.userAgent = f(d),
                  r.language = z,
                  this.browserRedirect(d)) : (b = this.userAgentKey(b),
                  b = this.languageKey(b));
               b.push(e);
               b.push(u);
               b.push(h);
               b.push(m);
               r.os = h;
               r.osVersion = m;
               r.browser = e;
               r.browserVersion = u;
              //  b = this.colorDepthKey(b);
              //  b = this.screenResolutionKey(b);
              //  b = this.timezoneOffsetKey(b);
              //  b = this.sessionStorageKey(b);
              //  b = this.localStorageKey(b);
              //  b = this.indexedDbKey(b);
              //  b = this.addBehaviorKey(b);
              //  b = this.openDatabaseKey(b);
              //  b = this.cpuClassKey(b);
              //  b = this.platformKey(b);
              //  b = this.doNotTrackKey(b);
              //  b = this.pluginsKey(b);
              //  b = this.canvasKey(b);
              //  b = this.webglKey(b);
               c = this.x64hash128(b.join("~~~"), 31);
               return a(c)
            },
            userAgentKey: function (a) {
            true || (a.push(navigator.userAgent),
                  r.userAgent = f(navigator.userAgent),
                  this.browserRedirect(navigator.userAgent));
               return a
            },
            replaceAll: function (a, c, b) {
               for (; 0 <= a.indexOf(c);)
                  a = a.replace(c, b);
               return a
            },
            browserRedirect: function (a) {
               var c = a.toLowerCase();
               a = "ipad" == c.match(/ipad/i);
               var b = "iphone os" == c.match(/iphone os/i),
                  d = "midp" == c.match(/midp/i),
                  g = "rv:1.2.3.4" == c.match(/rv:1.2.3.4/i),
                  e = "ucweb" == c.match(/ucweb/i),
                  n = "android" == c.match(/android/i),
                  x = "windows ce" == c.match(/windows ce/i),
                  c = "windows mobile" == c.match(/windows mobile/i);
               r.origin = a || b || d || g || e || n || x || c ? "mobile" : "pc"
            },
            languageKey: function (a) {
               true || (a.push(navigator.language),
                  r.language = this.replaceAll(navigator.language, " ", "_"));
               return a
            },
            colorDepthKey: function (a) {
               true || (a.push(screen.colorDepth),
                  r.colorDepth = screen.colorDepth);
               return a
            },
            screenResolutionKey: function (a) {
               if (!true) {
                  var c = this.getScreenResolution();
                  "undefined" !== typeof c && (a.push(c.join("x")),
                     r.screenResolution = c.join("x"))
               }
               return a
            },
            getScreenResolution: function () {
               return true ? screen.height > screen.width ? [screen.height, screen.width] : [screen.width, screen.height] : [screen.height, screen.width]
            },
            timezoneOffsetKey: function (a) {
               true || (a.push((new Date).getTimezoneOffset()),
                  r.timezoneOffset = (new Date).getTimezoneOffset() / 60);
               return a
            },
            sessionStorageKey: function (a) {
               !true && this.hasSessionStorage() && (a.push("sessionStorageKey"),
                  r.sessionStorage = !0);
               return a
            },
            localStorageKey: function (a) {
               !this.options.excludeSessionStorage && this.hasLocalStorage() && (a.push("localStorageKey"),
                  r.localStorage = !0);
               return a
            },
            indexedDbKey: function (a) {
               !this.options.excludeIndexedDB && this.hasIndexedDB() && (a.push("indexedDbKey"),
                  r.indexedDb = !0);
               return a
            },
            addBehaviorKey: function (a) {
               document.body && !this.options.excludeAddBehavior && document.body.addBehavior ? (a.push("addBehaviorKey"),
                  r.addBehavior = !0) : r.addBehavior = !1;
               return a
            },
            openDatabaseKey: function (a) {
               !this.options.excludeOpenDatabase && window.openDatabase ? (a.push("openDatabase"),
                  r.openDatabase = !0) : r.openDatabase = !1;
               return a
            },
            cpuClassKey: function (a) {
               this.options.excludeCpuClass || (a.push(this.getNavigatorCpuClass()),
                  r.cpu = this.getNavigatorCpuClass());
               return a
            },
            platformKey: function (a) {
               this.options.excludePlatform || (a.push(this.getNavigatorPlatform()),
                  r.platform = this.getNavigatorPlatform());
               return a
            },
            doNotTrackKey: function (a) {
               this.options.excludeDoNotTrack || (a.push(this.getDoNotTrack()),
                  r.track = this.getDoNotTrack());
               return a
            },
            canvasKey: function (a) {
               !this.options.excludeCanvas && this.isCanvasSupported() && (a.push(this.getCanvasFp()),
                  r.canvas = f(this.getCanvasFp()));
               return a
            },
            webglKey: function (a) {
               !this.options.excludeWebGL && this.isCanvasSupported() && (a.push(this.getWebglFp()),
                  r.webglFp = f(this.getWebglFp()));
               return a
            },
            pluginsKey: function (a) {
               this.isIE() ? (a.push(this.getIEPluginsString()),
                  r.plugins = f(this.getIEPluginsString())) : (a.push(this.getRegularPluginsString()),
                  r.plugins = f(this.getRegularPluginsString()));
               return a
            },
            getRegularPluginsString: function () {
               return this.map(navigator.plugins, function (a) {
                  var c = this.map(a, function (a) {
                     return [a.type, a.suffixes].join("~")
                  }).join(",");
                  return [a.name, a.description, c].join("::")
               }, this).join(";")
            },
            getIEPluginsString: function () {
               return window.ActiveXObject ? this.map("AcroPDF.PDF;Adodb.Stream;AgControl.AgControl;DevalVRXCtrl.DevalVRXCtrl.1;MacromediaFlashPaper.MacromediaFlashPaper;Msxml2.DOMDocument;Msxml2.XMLHTTP;PDF.PdfCtrl;QuickTime.QuickTime;QuickTimeCheckObject.QuickTimeCheck.1;RealPlayer;RealPlayer.RealPlayer(tm) ActiveX Control (32-bit);RealVideo.RealVideo(tm) ActiveX Control (32-bit);Scripting.Dictionary;SWCtl.SWCtl;Shell.UIHelper;ShockwaveFlash.ShockwaveFlash;Skype.Detection;TDCCtl.TDCCtl;WMPlayer.OCX;rmocx.RealPlayer G2 Control;rmocx.RealPlayer G2 Control.1".split(";"), function (a) {
                  try {
                     return new ActiveXObject(a),
                        a
                  }
                  catch (c) {
                     return null
                  }
               }).join(";") : ""
            },
            hasSessionStorage: function () {
               try {
                  return !!window.sessionStorage
               }
               catch (a) {
                  return !0
               }
            },
            hasLocalStorage: function () {
               try {
                  return !!window.localStorage
               }
               catch (a) {
                  return !0
               }
            },
            hasIndexedDB: function () {
               return !!window.indexedDB
            },
            getNavigatorCpuClass: function () {
               return navigator.cpuClass ? navigator.cpuClass : "unknown"
            },
            getNavigatorPlatform: function () {
               return navigator.platform ? navigator.platform : "unknown"
            },
            getDoNotTrack: function () {
               return navigator.doNotTrack ? navigator.doNotTrack : "unknown"
            },
            getCanvasFp: function () {
               var a = document.createElement("canvas"),
                  c = a.getContext("2d");
               c.font = "70px 'Arial'";
               c.textBaseline = "alphabetic";
               c.fillStyle = "#f60";
               c.fillRect(125, 1, 62, 20);
               c.fillStyle = "#069";
               c.fillText("Cwm fjordbank glyphs vext quiz, https://github.com/valve ?", 2, 15);
               c.fillStyle = "rgba(102, 204, 0, 0.7)";
               c.fillText("Cwm fjordbank glyphs vext quiz, https://github.com/valve ?", 4, 17);
               return a.toDataURL()
            },
            getWebglFp: function () {
               var a, c = function (b) {
                  a.clearColor(0, 0, 0, 1);
                  a.enable(a.DEPTH_TEST);
                  a.depthFunc(a.LEQUAL);
                  a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
                  return "[" + b[0] + ", " + b[1] + "]"
               };
               a = this.getWebglCanvas();
               if (!a)
                  return null;
               var b = [],
                  d = a.createBuffer();
               a.bindBuffer(a.ARRAY_BUFFER, d);
               var g = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0]);
               a.bufferData(a.ARRAY_BUFFER, g, a.STATIC_DRAW);
               d.itemSize = 3;
               d.numItems = 3;
               var g = a.createProgram(),
                  e = a.createShader(a.VERTEX_SHADER);
               a.shaderSource(e, "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}");
               a.compileShader(e);
               var n = a.createShader(a.FRAGMENT_SHADER);
               a.shaderSource(n, "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}");
               a.compileShader(n);
               a.attachShader(g, e);
               a.attachShader(g, n);
               a.linkProgram(g);
               a.useProgram(g);
               g.vertexPosAttrib = a.getAttribLocation(g, "attrVertex");
               g.offsetUniform = a.getUniformLocation(g, "uniformOffset");
               a.enableVertexAttribArray(g.vertexPosArray);
               a.vertexAttribPointer(g.vertexPosAttrib, d.itemSize, a.FLOAT, !1, 0, 0);
               a.uniform2f(g.offsetUniform, 1, 1);
               a.drawArrays(a.TRIANGLE_STRIP, 0, d.numItems);
               null != a.canvas && b.push(a.canvas.toDataURL());
               b.push("extensions:" + a.getSupportedExtensions().join(";"));
               b.push("webgl aliased line width range:" + c(a.getParameter(a.ALIASED_LINE_WIDTH_RANGE)));
               b.push("webgl aliased point size range:" + c(a.getParameter(a.ALIASED_POINT_SIZE_RANGE)));
               b.push("webgl alpha bits:" + a.getParameter(a.ALPHA_BITS));
               b.push("webgl antialiasing:" + (a.getContextAttributes().antialias ? "yes" : "no"));
               b.push("webgl blue bits:" + a.getParameter(a.BLUE_BITS));
               b.push("webgl depth bits:" + a.getParameter(a.DEPTH_BITS));
               b.push("webgl green bits:" + a.getParameter(a.GREEN_BITS));
               b.push("webgl max anisotropy:" + function (a) {
                  var b, c = a.getExtension("EXT_texture_filter_anisotropic") || a.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || a.getExtension("MOZ_EXT_texture_filter_anisotropic");
                  return c ? (b = a.getParameter(c.MAX_TEXTURE_MAX_ANISOTROPY_EXT),
                     0 === b && (b = 2),
                     b) : null
               }(a));
               b.push("webgl max combined texture image units:" + a.getParameter(a.MAX_COMBINED_TEXTURE_IMAGE_UNITS));
               b.push("webgl max cube map texture size:" + a.getParameter(a.MAX_CUBE_MAP_TEXTURE_SIZE));
               b.push("webgl max fragment uniform vectors:" + a.getParameter(a.MAX_FRAGMENT_UNIFORM_VECTORS));
               b.push("webgl max render buffer size:" + a.getParameter(a.MAX_RENDERBUFFER_SIZE));
               b.push("webgl max texture image units:" + a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS));
               b.push("webgl max texture size:" + a.getParameter(a.MAX_TEXTURE_SIZE));
               b.push("webgl max varying vectors:" + a.getParameter(a.MAX_VARYING_VECTORS));
               b.push("webgl max vertex attribs:" + a.getParameter(a.MAX_VERTEX_ATTRIBS));
               b.push("webgl max vertex texture image units:" + a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
               b.push("webgl max vertex uniform vectors:" + a.getParameter(a.MAX_VERTEX_UNIFORM_VECTORS));
               b.push("webgl max viewport dims:" + c(a.getParameter(a.MAX_VIEWPORT_DIMS)));
               b.push("webgl red bits:" + a.getParameter(a.RED_BITS));
               b.push("webgl renderer:" + a.getParameter(a.RENDERER));
               b.push("webgl shading language version:" + a.getParameter(a.SHADING_LANGUAGE_VERSION));
               b.push("webgl stencil bits:" + a.getParameter(a.STENCIL_BITS));
               b.push("webgl vendor:" + a.getParameter(a.VENDOR));
               b.push("webgl version:" + a.getParameter(a.VERSION));
               return b.join("\u00a7")
            },
            isCanvasSupported: function () {
               var a = document.createElement("canvas");
               return !(!a.getContext || !a.getContext("2d"))
            },
            isIE: function () {
               return "Microsoft Internet Explorer" === navigator.appName || "Netscape" === navigator.appName && /Trident/.test(navigator.userAgent) ? !0 : !1
            },
            getWebglCanvas: function () {
               var a = document.createElement("canvas"),
                  c = null;
               try {
                  c = a.getContext("webgl") || a.getContext("experimental-webgl")
               }
               catch (b) {}
               c || (c = null);
               return c
            },
            each: function (a, c, b) {
               if (null !== a)
                  if (this.nativeForEach && a.forEach === this.nativeForEach)
                     a.forEach(c, b);
                  else if (a.length === +a.length)
                  for (var d = 0, g = a.length; d < g && c.call(b, a[d], d, a) !== {}; d++)
               ;
               else
                  for (d in a)
                     if (a.hasOwnProperty(d) && c.call(b, a[d], d, a) === {})
                        break
            },
            map: function (a, c, b) {
               var d = [];
               if (null == a)
                  return d;
               if (this.nativeMap && a.map === this.nativeMap)
                  return a.map(c, b);
               this.each(a, function (a, e, n) {
                  d[d.length] = c.call(b, a, e, n)
               });
               return d
            },
            x64Add: function (a, c) {
               a = [a[0] >>> 16, a[0] & 65535, a[1] >>> 16, a[1] & 65535];
               c = [c[0] >>> 16, c[0] & 65535, c[1] >>> 16, c[1] & 65535];
               var b = [0, 0, 0, 0];
               b[3] += a[3] + c[3];
               b[2] += b[3] >>> 16;
               b[3] &= 65535;
               b[2] += a[2] + c[2];
               b[1] += b[2] >>> 16;
               b[2] &= 65535;
               b[1] += a[1] + c[1];
               b[0] += b[1] >>> 16;
               b[1] &= 65535;
               b[0] += a[0] + c[0];
               b[0] &= 65535;
               return [b[0] << 16 | b[1], b[2] << 16 | b[3]]
            },
            x64Multiply: function (a, c) {
               a = [a[0] >>> 16, a[0] & 65535, a[1] >>> 16, a[1] & 65535];
               c = [c[0] >>> 16, c[0] & 65535, c[1] >>> 16, c[1] & 65535];
               var b = [0, 0, 0, 0];
               b[3] += a[3] * c[3];
               b[2] += b[3] >>> 16;
               b[3] &= 65535;
               b[2] += a[2] * c[3];
               b[1] += b[2] >>> 16;
               b[2] &= 65535;
               b[2] += a[3] * c[2];
               b[1] += b[2] >>> 16;
               b[2] &= 65535;
               b[1] += a[1] * c[3];
               b[0] += b[1] >>> 16;
               b[1] &= 65535;
               b[1] += a[2] * c[2];
               b[0] += b[1] >>> 16;
               b[1] &= 65535;
               b[1] += a[3] * c[1];
               b[0] += b[1] >>> 16;
               b[1] &= 65535;
               b[0] += a[0] * c[3] + a[1] * c[2] + a[2] * c[1] + a[3] * c[0];
               b[0] &= 65535;
               return [b[0] << 16 | b[1], b[2] << 16 | b[3]]
            },
            x64Rotl: function (a, c) {
               c %= 64;
               if (32 === c)
                  return [a[1], a[0]];
               if (32 > c)
                  return [a[0] << c | a[1] >>> 32 - c, a[1] << c | a[0] >>> 32 - c];
               c -= 32;
               return [a[1] << c | a[0] >>> 32 - c, a[0] << c | a[1] >>> 32 - c]
            },
            x64LeftShift: function (a, c) {
               c %= 64;
               return 0 === c ? a : 32 > c ? [a[0] << c | a[1] >>> 32 - c, a[1] << c] : [a[1] << c - 32, 0]
            },
            x64Xor: function (a, c) {
               return [a[0] ^ c[0], a[1] ^ c[1]]
            },
            x64Fmix: function (a) {
               a = this.x64Xor(a, [0, a[0] >>> 1]);
               a = this.x64Multiply(a, [4283543511, 3981806797]);
               a = this.x64Xor(a, [0, a[0] >>> 1]);
               a = this.x64Multiply(a, [3301882366, 444984403]);
               return a = this.x64Xor(a, [0, a[0] >>> 1])
            },
            x64hash128: function (a, c) {
               a = a || "";
               c = c || 0;
               var b = a.length % 16,
                  d = a.length - b,
                  g = [0, c];
               c = [0, c];
               for (var e, n, x = [2277735313, 289559509], f = [1291169091, 658871167], h = 0; h < d; h += 16)
                  e = [a.charCodeAt(h + 4) & 255 | (a.charCodeAt(h + 5) & 255) << 8 | (a.charCodeAt(h + 6) & 255) << 16 | (a.charCodeAt(h + 7) & 255) << 24, a.charCodeAt(h) & 255 | (a.charCodeAt(h + 1) & 255) << 8 | (a.charCodeAt(h + 2) & 255) << 16 | (a.charCodeAt(h + 3) & 255) << 24],
                  n = [a.charCodeAt(h + 12) & 255 | (a.charCodeAt(h + 13) & 255) << 8 | (a.charCodeAt(h + 14) & 255) << 16 | (a.charCodeAt(h + 15) & 255) << 24, a.charCodeAt(h + 8) & 255 | (a.charCodeAt(h + 9) & 255) << 8 | (a.charCodeAt(h + 10) & 255) << 16 | (a.charCodeAt(h + 11) & 255) << 24],
                  e = this.x64Multiply(e, x),
                  e = this.x64Rotl(e, 31),
                  e = this.x64Multiply(e, f),
                  g = this.x64Xor(g, e),
                  g = this.x64Rotl(g, 27),
                  g = this.x64Add(g, c),
                  g = this.x64Add(this.x64Multiply(g, [0, 5]), [0, 1390208809]),
                  n = this.x64Multiply(n, f),
                  n = this.x64Rotl(n, 33),
                  n = this.x64Multiply(n, x),
                  c = this.x64Xor(c, n),
                  c = this.x64Rotl(c, 31),
                  c = this.x64Add(c, g),
                  c = this.x64Add(this.x64Multiply(c, [0, 5]), [0, 944331445]);
               e = [0, 0];
               n = [0, 0];
               switch (b) {
               case 15:
                  n = this.x64Xor(n, this.x64LeftShift([0, a.charCodeAt(h + 14)], 48));
               case 14:
                  n = this.x64Xor(n, this.x64LeftShift([0, a.charCodeAt(h + 13)], 40));
               case 13:
                  n = this.x64Xor(n, this.x64LeftShift([0, a.charCodeAt(h + 12)], 32));
               case 12:
                  n = this.x64Xor(n, this.x64LeftShift([0, a.charCodeAt(h + 11)], 24));
               case 11:
                  n = this.x64Xor(n, this.x64LeftShift([0, a.charCodeAt(h + 10)], 16));
               case 10:
                  n = this.x64Xor(n, this.x64LeftShift([0, a.charCodeAt(h + 9)], 8));
               case 9:
                  n = this.x64Xor(n, [0, a.charCodeAt(h + 8)]),
                     n = this.x64Multiply(n, f),
                     n = this.x64Rotl(n, 33),
                     n = this.x64Multiply(n, x),
                     c = this.x64Xor(c, n);
               case 8:
                  e = this.x64Xor(e, this.x64LeftShift([0, a.charCodeAt(h + 7)], 56));
               case 7:
                  e = this.x64Xor(e, this.x64LeftShift([0, a.charCodeAt(h + 6)], 48));
               case 6:
                  e = this.x64Xor(e, this.x64LeftShift([0, a.charCodeAt(h + 5)], 40));
               case 5:
                  e = this.x64Xor(e, this.x64LeftShift([0, a.charCodeAt(h + 4)], 32));
               case 4:
                  e = this.x64Xor(e, this.x64LeftShift([0, a.charCodeAt(h + 3)], 24));
               case 3:
                  e = this.x64Xor(e, this.x64LeftShift([0, a.charCodeAt(h + 2)], 16));
               case 2:
                  e = this.x64Xor(e, this.x64LeftShift([0, a.charCodeAt(h + 1)], 8));
               case 1:
                  e = this.x64Xor(e, [0, a.charCodeAt(h)]),
                     e = this.x64Multiply(e, x),
                     e = this.x64Rotl(e, 31),
                     e = this.x64Multiply(e, f),
                     g = this.x64Xor(g, e)
               }
               g = this.x64Xor(g, [0, a.length]);
               c = this.x64Xor(c, [0, a.length]);
               g = this.x64Add(g, c);
               c = this.x64Add(c, g);
               g = this.x64Fmix(g);
               c = this.x64Fmix(c);
               g = this.x64Add(g, c);
               c = this.x64Add(c, g);
               return ("00000000" + (g[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (g[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (c[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (c[1] >>> 0).toString(16)).slice(-8)
            }
         };
         return w
      }
      $scope.reload = function () {

          var sss= JdJrTdRiskFinger();
          var fp=  null;
          sss.prototype.get(function(f){
            fp=f;
          });
          var t={
            fp: fp,
            o: "passport.jd.com/new/login.aspx",
            oid: "",
            p: "s",
            pin: "",
            t: "N3EBGE37FOBCNITMGQN22DQEED4NINAFD5TUUFA3Y36CYQCR7Z2WILLAQITL2PUXYH4J2EHTXPS7Y"
          }
          var p=sss.prototype.getData();
          var l = "?g=" + tdencrypt(p);
           l += "&a=" + tdencrypt(t);
          // console.log(t);
         console.log("http://payrisk.jd.com/fcf.html" + l);
      }

   });
});
