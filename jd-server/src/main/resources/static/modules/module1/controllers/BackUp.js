var toJson = "object" === typeof JSON && JSON.stringify;


var tdencrypt = function (d) {
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
      options:{},
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
        /* b = this.colorDepthKey(b);
         b = this.screenResolutionKey(b);
         b = this.timezoneOffsetKey(b);
         b = this.sessionStorageKey(b);
         b = this.localStorageKey(b);
         b = this.indexedDbKey(b);
         b = this.addBehaviorKey(b);
         b = this.openDatabaseKey(b);
         b = this.cpuClassKey(b);
         b = this.platformKey(b);
         b = this.doNotTrackKey(b);
         b = this.pluginsKey(b);
         b = this.canvasKey(b);
         b = this.webglKey(b);*/
         c = this.x64hash128(b.join("~~~"), 31);
         return (c)
      },
      userAgentKey: function (a) {
         this.options.excludeUserAgent || (a.push(navigator.userAgent),
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
         this.options.excludeLanguage || (a.push(navigator.language),
            r.language = this.replaceAll(navigator.language, " ", "_"));
         return a
      },
      colorDepthKey: function (a) {
         this.options.excludeColorDepth || (a.push(screen.colorDepth),
            r.colorDepth = screen.colorDepth);
         return a
      },
      screenResolutionKey: function (a) {
         if (!this.options.excludeScreenResolution) {
            var c = this.getScreenResolution();
            "undefined" !== typeof c && (a.push(c.join("x")),
               r.screenResolution = c.join("x"))
         }
         return a
      },
      getScreenResolution: function () {
         return this.options.detectScreenOrientation ? screen.height > screen.width ? [screen.height, screen.width] : [screen.width, screen.height] : [screen.height, screen.width]
      },
      timezoneOffsetKey: function (a) {
         this.options.excludeTimezoneOffset || (a.push((new Date).getTimezoneOffset()),
            r.timezoneOffset = (new Date).getTimezoneOffset() / 60);
         return a
      },
      sessionStorageKey: function (a) {
         !this.options.excludeSessionStorage && this.hasSessionStorage() && (a.push("sessionStorageKey"),
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
};
var sss = JdJrTdRiskFinger();
var getFingureEncrypted = function () {
   return sss.prototype.get();
}
var getFingure = function () {
   return sss.prototype.getData();;
}
$scope.reload = function () {
   var fp = getFingureEncrypted();
   var t = {
      fp: fp,
      o: "passport.com.crawer.jd.com/new/login.aspx",
      oid: "",
      p: "s",
      pin: "",
      t: "N3EBGE37FOBCNITMGQN22DQEED4NINAFD5TUUFA3Y36CYQCR7Z2WILLAQITL2PUXYH4J2EHTXPS7Y"
   }
   var p = getFingure();
   p = JSON.stringify(p);
   t = JSON.stringify(t);
   var l = "?g=" + tdencrypt(p);
   l += "&a=" + tdencrypt(t);
   console.log((p));
   console.log((t));
   console.log("http://payrisk.jd.com/fcf.html" + l);
}
