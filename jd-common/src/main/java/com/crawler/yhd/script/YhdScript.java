package com.crawler.yhd.script;

import com.crawler.common.JsCallback;
import com.crawler.common.ScriptUtil;
import org.mozilla.javascript.Context;
import org.mozilla.javascript.ContextFactory;
import org.mozilla.javascript.Function;
import org.mozilla.javascript.Scriptable;
import org.mozilla.javascript.tools.shell.Global;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import java.io.IOException;
import java.util.Map;

/**
 * Author     : zh79325@163.com
 * Copyright  :
 * Company    :
 * Create at  : 2017/5/23 10:08
 * Description:
 */
public class YhdScript {

    public static void encrypt(Context cx ,Global global,String callBackJson,JsCallback callBack) throws NoSuchMethodException, ScriptException, IOException {
        Object object = global.get("makeEncrypt", global);
        Object[] params = new Object[]{callBackJson, callBack};
        Function function = (Function) object;
        function.call(cx, global, global, params);
    }

    public static void getFp(Context cx, Global global, JsCallback callBack) {
        Object object = global.get("getFp", global);
        Object[] params = new Object[]{ callBack};
        Function function = (Function) object;
        function.call(cx, global, global, params);
    }


    public static Global loadYhdScriptEnv(Context cx) throws IOException {
        String script = ScriptUtil.loadResource("/com/crawler/envirenment/envjs/rhino.js",ScriptUtil.class);
        Global global = new Global(cx);
        cx.evaluateString(global, script, "rhino.js", 0, null);
        script = ScriptUtil.loadResource("yhdEncrypt.js", YhdScript.class);
        cx.evaluateString(global, script, "yhdEncrypt.js", 0, null);
        return global;
    }

    public static Map<String, Object> encrypt(String pubKey, String... keys) throws IOException, ScriptException, NoSuchMethodException {
        ScriptEngineManager manager = new ScriptEngineManager();
        ScriptEngine engine = manager.getEngineByName("javascript");
        String script = ScriptUtil.loadResource("yhdLoginEncrypt.js", YhdScript.class);
        engine.put(ScriptEngine.FILENAME, "yhdLoginEncrypt.js");
        engine.eval(script);
        script = ScriptUtil.loadResource("yhd.js", YhdScript.class);
        engine.put(ScriptEngine.FILENAME, "yhd.js");
        engine.eval(script);
        Invocable invoke = (Invocable) engine;
        Map<String, Object> map = (Map<String, Object>) invoke.invokeFunction("encrypt", pubKey, keys);
        return map;
    }


    public static void main(String[] args) throws NoSuchMethodException, ScriptException, IOException {
        Context cx = ContextFactory.getGlobal().enterContext();
        Global global=loadYhdScriptEnv(cx);
        getFp(cx,global,new JsCallback(){

            @Override
            public Object call(Context cx, Scriptable scope, Scriptable thisObj, Object[] args) {
                System.out.println(args);
                return null;
            }
        });
        encrypt(cx,global,"{}", new JsCallback() {
            @Override
            public Object call(Context cx, Scriptable scope, Scriptable thisObj, Object[] args) {
                return null;
            }
        });
    }



}
