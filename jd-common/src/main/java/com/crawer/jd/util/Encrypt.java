package com.crawer.jd.util;

import org.apache.commons.io.IOUtils;
import org.apache.commons.io.input.CharSequenceReader;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import java.io.IOException;
import java.io.InputStream;
import java.io.Reader;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/5/12 17:16
 * Description:
 */
public class Encrypt {
    static String key = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDC7kw8r6tq43pwApYvkJ5laljaN9BZb21TAIfT/vexbobzH7Q8SUdP5uDPXEBKzOjx2L28y7Xs1d9v3tdPfKI2LR7PAzWBmDMn8riHrDDNpUpJnlAGUqJG9ooPn8j7YNpcxCa1iybOlc2kEhmJn5uwoanQq+CA6agNkqly2H4j6wIDAQAB";

    static final String JS_FILE = "jsencrypt.js";
    static Invocable invocableEngine = null;

    static synchronized void getEngin(String word, String pub) throws IOException, ScriptException, NoSuchMethodException {
        if (invocableEngine == null) {
            ScriptEngineManager manager = new ScriptEngineManager();
            ScriptEngine engine = manager.getEngineByName("JavaScript");


            engine.eval("var navigator = {};" +
                    "var window = {};\n" +
                    "var document = {};");
            InputStream functionscript = Encrypt.class.getResourceAsStream(JS_FILE);
            byte[] buffer = IOUtils.toByteArray(functionscript);
            Reader targetReader = new CharSequenceReader(new String(buffer));

            engine.eval(targetReader);
            targetReader.close();
            engine.eval("function encrypt(content,pubkey) {\n" +
                    "    var encrypt = new JSEncrypt();\n" +
                    "    return encrypt.setPublicKey(pubkey);\n" +
                    "    var encrypted = encrypt.encrypt(content);\n" +
                    "    return encrypted;\n" +
                    "}");
            Invocable inv = (Invocable) engine;
            Object r= inv.invokeFunction("encrypt", word,pub);
            System.out.println(r);
        }

    }

    public static void main(String[] args) throws IOException, ScriptException, NoSuchMethodException {
        String pwd = "ghjghj";
        getEngin(pwd,key);
        String result = "wfHraHmJloedK1jJu50O2Wkn8755gwwAy0POos6DniGDzyamGN8FZhfxEbm7iSzXeJNrFjQv87xOmjDWqoe3TODhKjnLRQE19qrjldv81hj0EfQScJVLI9ZTC6DnVUO9vQaz5zMjXL8N0JqIc9PCiaSg63nMyo+UlA8G4XaYeVI=";
    }
}
