package com.crawler.common;

import com.teamdev.jxbrowser.chromium.ay;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.text.SimpleDateFormat;

/**
 * Author     : zh79325@163.com
 * Copyright  :
 * Company    :
 * Create at  : 2017/6/1 23:12
 * Description:
 */
public class JxBrowserHackUtil {

    static boolean hacked=false;

    public static void hack() throws Exception {
        if(hacked){
            return;
        }
        hacked=true;
        SimpleDateFormat df = ay.a;
        MySimpleDateFormat mySimpleDateFormat = new MySimpleDateFormat(df);
        setFinalStatic(ay.class.getField("a"), mySimpleDateFormat);
        System.setProperty("teamdev.license.info", "true");
    }

    public static void setFinalStatic(Field field, Object newValue) throws Exception {
        field.setAccessible(true);

        Field modifiersField = Field.class.getDeclaredField("modifiers");
        modifiersField.setAccessible(true);
        modifiersField.setInt(field, field.getModifiers() & ~Modifier.FINAL);

        field.set(null, newValue);
    }

}

