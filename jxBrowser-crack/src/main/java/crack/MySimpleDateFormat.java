package crack;

import com.teamdev.jxbrowser.chromium.ay;

import java.text.ParseException;
import java.text.ParsePosition;
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
        SimpleDateFormat ss=  ay.a;
    }

    public MySimpleDateFormat(String pattern, Locale locale) {
        super(pattern, locale);
        df=null;
    }

    @Override
    public Date parse(String text, ParsePosition pos) {
        return super.parse(text, pos);
    }

    @Override
    public Date parse(String source) throws ParseException {
        if("12-06-2017".equalsIgnoreCase(source)){
            source="12-06-2216";
        }
        Date date=null;
        if(df!=null){
            date=df.parse(source);
        }else{
            date=super.parse(source);
        }
        return date;
    }

    @Override
    public Object parseObject(String source) throws ParseException {
        return super.parseObject(source);
    }


}
