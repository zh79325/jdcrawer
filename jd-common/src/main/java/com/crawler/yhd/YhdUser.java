package com.crawler.yhd;

import com.alibaba.fastjson.JSONObject;
import com.crawler.common.CrawlerUser;
import com.crawler.yhd.script.YhdScript;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import javax.script.ScriptException;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/5/23 9:33
 * Description:
 */
public class YhdUser extends CrawlerUser {

    String guid;

    public void logIn(String uid, String pwd) throws IOException, ScriptException, NoSuchMethodException {
        String html = getResult("https://passport.yhd.com/passport/login_input.do", null, null);
        Document doc = Jsoup.parse(html);
        Elements captchaTokenElement = doc.select("#__yct_str__");
        Elements sigElement = doc.select("#validateSig");
        Elements loginSourceElement = doc.select("#login_source");
        Elements isAutoLoginElement = doc.select("#isAutoLogin");
        Elements validCodeElement = doc.select("#vcd");

        guid=generateMixed(36);
        Date expire=new Date(new Date().getTime()+365L*50*24*3600*1000);
        cookieJar.addCookie("yhd.com", "guid",guid,expire);
        cookieJar.addCookie("yhd.com","rURL","http%3A%2F%2Fwww.yhd.com",null);
        String pubKey = getPubKey(html);

//        var b = {
//                "credentials.username": i,
//                "credentials.password": c,
//                validCode: d,
//                sig: $("#validateSig").val(),
//                captchaToken: h,
//                loginSource: $("#login_source").val(),
//                returnUrl: returnUrl,
//                isAutoLogin: $("#isAutoLogin").val()
//    };
        Map<String, Object> encrypted = YhdScript.encrypt(pubKey, uid, pwd);
        Map<String, String> params = new HashMap<>();
        params.put("credentials.username", (String) encrypted.get(uid));
        params.put("credentials.password", (String) encrypted.get(pwd));
        String validCode = validCodeElement.val();
        params.put("validCode", validCode);
        String sig = sigElement.val();
        params.put("sig", sig);
        String captchaToken = captchaTokenElement.val();
        params.put("captchaToken", captchaToken);
        String loginSource = loginSourceElement.val();
        params.put("loginSource", loginSource);
        params.put("returnUrl", "http://www.yhd.com");
        String isAutoLogin = isAutoLoginElement.val();
        params.put("isAutoLogin", isAutoLogin);

        String json = postResult("https://passport.yhd.com/publicPassport/login.do", null, null, params);
        JSONObject jsonObject = JSONObject.parseObject(json);
        if (jsonObject.getInteger("errorCode") == 0) {
            loginSuccess = true;
        }

    }

    private String getPubKey(String html) {
        Pattern p2 = Pattern.compile("var.+?pubkey.+?=.+?\\\"(.+?)\\\"");
        Matcher m2 = p2.matcher(html);
        m2.find();
        String pubKey = m2.group(1);
        return pubKey;
    }


    public static void main(String[] args) throws NoSuchMethodException, ScriptException, IOException {
        YhdUser yhdUser = new YhdUser();
        yhdUser.logIn("15821179325", "a08122419");
    }
    String generateMixed(int d) {
        String[] f = new String[]{"1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "M", "N", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"};
        StringBuilder h = new StringBuilder();
        for (int g = 0; g < d; g++) {
            int e = (int) Math.floor(Math.random() * 32);
            h.append(f[e]);
        }
        return h.toString();
    }
}
