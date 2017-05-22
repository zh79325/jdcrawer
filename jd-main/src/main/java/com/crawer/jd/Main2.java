package com.crawer.jd;

import com.crawer.jd.script.EncryptScript;

import javax.script.ScriptException;
import java.io.IOException;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/5/22 16:04
 * Description:
 */
public class Main2 {
    public static void main(String[] args) throws NoSuchMethodException, ScriptException, IOException {
        Object c = EncryptScript.getFingure("aaa","Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36");

    }
}
