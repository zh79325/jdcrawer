package com.crawler.jd.script;

import com.crawler.common.ScriptUtil;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Author     : zh79325@163.com
 * Copyright  :
 * Company    :
 * Create at  : 2017/5/22 10:49
 * Description:
 */
public class EncryptScript {
    static Map<String, Invocable> engineMap = new ConcurrentHashMap<>();
    static final String defaultencryptKey = "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-";


    public static void main(String[] args) throws ScriptException, NoSuchMethodException, IOException {
        Object c = getFingure("aaa","Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36");


    }

    public static String encrypt(String json, String encryptKey) throws ScriptException, NoSuchMethodException, IOException {
        if (!engineMap.containsKey(encryptKey)) {
            engineMap.put(encryptKey, createEncryptFunc(encryptKey));
        }
        return (String) engineMap.get(encryptKey).invokeFunction("tdencrypt", json);
    }

    public static String encrypt(String json) throws ScriptException, NoSuchMethodException, IOException {
        return encrypt(json, defaultencryptKey);
    }

    private static Invocable createEncryptFunc(String key) throws ScriptException, IOException {
        ScriptEngineManager manager = new ScriptEngineManager();
        ScriptEngine engine = manager.getEngineByName("javascript");
        String script = ScriptUtil.loadResource("jdEncrypt.js",EncryptScript.class);
        script = script.replaceAll(Pattern.quote(defaultencryptKey), key);
        engine.eval(script);
        Invocable invoke = (Invocable) engine;
        return invoke;

    }




    public static Map<String,String> parseEncryptKey(String script) throws ScriptException {
        if (script.startsWith("eval")) {
            script = script.substring(4);
        }
        String runningScript = (ScriptUtil.getResult(script));
        Pattern p = Pattern.compile("tdencrypt=function\\(.+?\\)\\{.+?\\\"(.+?)\\\"\\.charAt.+?\\\"(.+?)\\\"\\.charAt.+?\\\"(.+?)\\\"\\.charAt.+?\\\"(.+?)\\\"\\.charAt.+?return.+?\\}");
        Matcher m = p.matcher(runningScript);
        String key = null;
        while (m.find()) {
            key = m.group(2);
            break;
        }
        Pattern p2 = Pattern.compile("set\\(\\\"(.+?)\\\".+?\\)");
        Matcher m2 = p2.matcher(runningScript);
        m2.find();
        String keyName=m2.group(1);
        Map<String,String> map=new HashMap<>();
        map.put(keyName,key);
        return map;
    }

    static Invocable FingerInvoke = null;


    public static Map<String,String> getFingure(String riskId,String userAgent) throws ScriptException, IOException, NoSuchMethodException {
        Invocable invoke = loadFingureEngin();
        return (Map<String, String>) invoke.invokeFunction("invokeItem", riskId,userAgent, "zh-CN");
    }

    private static Invocable loadFingureEngin() throws IOException, ScriptException {
        if (FingerInvoke == null) {
            String fingerScript = ScriptUtil.loadResource("JdJrTdRiskFinger.js",EncryptScript.class);
            String invokeScript = ScriptUtil.loadResource("invokeRiskFingerScript.js",EncryptScript.class);
            ScriptEngineManager manager = new ScriptEngineManager();
            ScriptEngine engine = manager.getEngineByName("javascript");
            engine.eval(fingerScript);
            engine.eval(invokeScript);
            FingerInvoke = (Invocable) engine;
        }
        return FingerInvoke;
    }


}
