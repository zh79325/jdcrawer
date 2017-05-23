package com.crawler.yhd.script;

import com.crawler.common.ScriptUtil;

import javax.script.*;
import java.io.IOException;
import java.util.Map;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/5/23 10:08
 * Description:
 */
public class YhdScript {

    public static void main(String[] args) throws NoSuchMethodException, ScriptException, IOException {
        encrypt("aa","11","22","44");
    }

    public static Map<String,Object> encrypt(String pubKey, String... keys) throws IOException, ScriptException, NoSuchMethodException {
        ScriptEngineManager manager = new ScriptEngineManager();
        ScriptEngine engine = manager.getEngineByName("javascript");
        String script = ScriptUtil.loadResource("yhdEncrypt.js",YhdScript.class);
        engine.put(ScriptEngine.FILENAME, "yhdEncrypt.js");
        engine.eval(script);
        script = ScriptUtil.loadResource("yhd.js",YhdScript.class);
        engine.put(ScriptEngine.FILENAME, "yhd.js");
        engine.eval(script);
        Invocable invoke = (Invocable) engine;
        Map<String,Object> map= (Map<String, Object>) invoke.invokeFunction("encrypt",pubKey,keys);
        return map;
    }
}
