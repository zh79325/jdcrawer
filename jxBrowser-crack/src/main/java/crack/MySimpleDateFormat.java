package crack;

import com.teamdev.jxbrowser.chromium.ay;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

/**
 * Author     : zh79325@163.com
 * Copyright  :
 * Company    :
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
    public Date parse(String source) throws ParseException {

        Date date=null;
        if(df!=null){
            date=df.parse(source);
        }else{
            date=super.parse(source);
        }
        Date crackedExpire=super.parse("12-06-2217");
        String formated= this.format(date);
        if("12-06-2017".equalsIgnoreCase(formated)||"16-06-0012".equalsIgnoreCase(formated)){
            date=crackedExpire;
        }
        return date;
    }




}
