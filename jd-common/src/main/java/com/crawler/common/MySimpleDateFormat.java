package com.crawler.common;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/6/1 22:05
 * Description:
 */
public class MySimpleDateFormat extends SimpleDateFormat {
    private static final long serialVersionUID = -2680960935177697658L;
    private final SimpleDateFormat df;

    public MySimpleDateFormat(SimpleDateFormat df){
        this.df=df;
    }

    public MySimpleDateFormat(String pattern, Locale locale) {
        super(pattern, locale);
        df=null;
    }

    @Override
    public Date parse(String source) throws ParseException {

        Date date=df.parse(source);
        Date crackedExpire=df.parse("12-06-2217");
        String formated= df.format(date);
        if("12-06-2017".equalsIgnoreCase(formated)||"16-06-0012".equalsIgnoreCase(formated)){
            date=crackedExpire;
        }
        System.out.println("+++++++++++Parse Date => "+source+" <= +++++++++++");
        return date;
    }




}
