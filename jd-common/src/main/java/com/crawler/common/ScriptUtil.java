package com.crawler.common;

import org.apache.commons.io.IOUtils;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/5/23 9:41
 * Description:
 */
public class ScriptUtil {

    public static String getResult(String script) throws ScriptException {
        ScriptEngineManager manager = new ScriptEngineManager();
        ScriptEngine engine = manager.getEngineByName("javascript");
        return (String) engine.eval(script);
    }

    public static String loadResource(String name,Class tClass) throws IOException {
        InputStream inputStream = tClass.getResourceAsStream(name);
        List<String> lines = IOUtils.readLines(inputStream);
        inputStream.close();
        StringBuilder sb = new StringBuilder();
        for (String line : lines) {
            sb.append(line);
            sb.append("\n");
        }
        String script = sb.toString();
        return script;
    }
    public static String loadResource(String file) throws IOException {
        InputStream inputStream =new FileInputStream(new File(file));
        List<String> lines = IOUtils.readLines(inputStream);
        inputStream.close();
        StringBuilder sb = new StringBuilder();
        for (String line : lines) {
            sb.append(line);
            sb.append("\n");
        }
        String script = sb.toString();
        return script;
    }
}
