package com.crawler.yhd;

import com.alibaba.fastjson.JSONObject;
import com.crawler.common.*;
import com.teamdev.jxbrowser.chromium.Browser;
import com.teamdev.jxbrowser.chromium.JSValue;
import com.teamdev.jxbrowser.chromium.dom.By;
import com.teamdev.jxbrowser.chromium.dom.DOMDocument;
import com.teamdev.jxbrowser.chromium.dom.DOMElement;
import com.teamdev.jxbrowser.chromium.dom.internal.InputElement;
import com.teamdev.jxbrowser.chromium.swing.BrowserView;
import okhttp3.Headers;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.mozilla.javascript.Context;
import org.mozilla.javascript.ContextFactory;
import org.mozilla.javascript.Scriptable;
import org.mozilla.javascript.tools.shell.Global;

import javax.script.ScriptException;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CountDownLatch;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.crawler.yhd.script.YhdScript.*;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/5/23 9:33
 * Description:
 */
public class YhdUser extends CrawlerUser {

    String guid;

    public void logIn(String uid,String pwd){
        browser.loadURL("https://passport.yhd.com/passport/login_input.do");
        BrowserWaitTool tool=new BrowserWaitTool(browser);
        BrowserView browserView=  BrowserUtil.showBrowser(browser);

        tool.waitUntil(new BrowserOperation() {
            @Override
            public boolean execute(Browser browser) {

                DOMDocument document=  browser.getDocument();
                DOMElement element= document.findElement(By.id("__yct_str__"));
                if(element==null){
                    return false;
                }
                String value=((InputElement) element).getValue();
                if(null==value||"".equalsIgnoreCase(value.trim())){
                    return false;
                }

                return true;
            }
        });
        DOMDocument document=  browser.getDocument();
        ((InputElement) document.findElement(By.id("un"))).setValue(uid);
        ((InputElement) document.findElement(By.id("pwd"))).setValue(pwd);
        document.findElement(By.id("login_button")).click();
        tool.waitUntil(new BrowserOperation() {
            @Override
            public boolean execute(Browser browser) {
                JSValue href = browser.executeJavaScriptAndReturnValue(
                        "document.location.href");
               String str= href.asString().getStringValue();
               if(str.indexOf("//www.yhd.com")>=0){
                   return true;
               }
                return false;
            }
        });

    }
    public void logIn2(String uid, String pwd) throws Exception{
        String html = getResult("https://passport.yhd.com/passport/login_input.do", null, null);
        Document doc = Jsoup.parse(html);
        Elements captchaTokenElement = doc.select("#__yct_str__");
        Elements sigElement = doc.select("#validateSig");
        Elements loginSourceElement = doc.select("#login_source");
        Elements isAutoLoginElement = doc.select("#isAutoLogin");
        Elements validCodeElement = doc.select("#vcd");

        guid = generateMixed(36);
        Date expire = new Date(new Date().getTime() + 365L * 50 * 24 * 3600 * 1000);
        cookieJar.addCookie("yhd.com", "guid", guid, expire);
        cookieJar.addCookie("yhd.com", "newUserFlag", "1", expire);
        cookieJar.addCookie("yhd.com", "rURL", "http%3A%2F%2Fwww.yhd.com%2F%3FcityId%3D1", null);


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
        Map<String, Object> encrypted = encrypt(pubKey, uid, pwd);
        Map<String, String> params = new HashMap<>();
        params.put("credentials.username", (String) encrypted.get(uid));
        params.put("credentials.password", (String) encrypted.get(pwd));
        String validCode = validCodeElement.val();
        params.put("validCode", validCode);
        String sig = sigElement.val();
        params.put("sig", sig);
        String captchaToken = getCaptchaToken();
        params.put("captchaToken", captchaToken);
        String loginSource = loginSourceElement.val();
        params.put("loginSource", loginSource);
        params.put("returnUrl", "http://www.yhd.com/?cityId=1");
        String isAutoLogin = isAutoLoginElement.val();
        params.put("isAutoLogin", isAutoLogin);


        Headers headers = _headers.newBuilder()
                .add("Host", "passport.yhd.com")
                .add("Referer", "https://passport.yhd.com/passport/login_input.do")
                .build();
        String json = postResult("https://passport.yhd.com/publicPassport/login.do", headers, null, params);
        JSONObject jsonObject = JSONObject.parseObject(json);
        if (jsonObject.getInteger("errorCode") == 0) {
            loginSuccess = true;
        }

    }
    private final CountDownLatch loginLatch = new CountDownLatch (1);

    String CaptchaToken=null;
    private String getCaptchaToken() throws Exception {
        Context cx = ContextFactory.getGlobal().enterContext();
        final Global global = loadYhdScriptEnv(cx);

        getFp(cx, global, new JsCallback() {

            @Override
            public Object call(Context cx, Scriptable scope, Scriptable thisObj, Object[] args) {
                String fp = (String) args[0];
                try {
                    String json1 = getResult("https://captcha.yhd.com/public/getenv.do?f=" + fp + "&callback=&t=", null, null);
                    try {
                        json1= json1.substring(1,json1.length()-2);
                        encrypt(cx, global, json1, new JsCallback() {
                            @Override
                            public Object call(Context cx, Scriptable scope, Scriptable thisObj, Object[] args) {
                                CaptchaToken= (String) args[1];
                                loginLatch.countDown();
                                return null;
                            }
                        });
                    } catch (NoSuchMethodException e) {
                        e.printStackTrace();
                    } catch (ScriptException e) {
                        e.printStackTrace();
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }

                return null;
            }
        });
        loginLatch.await();
        return CaptchaToken;
    }

    private String getPubKey(String html) {
        Pattern p2 = Pattern.compile("var.+?pubkey.+?=.+?\\\"(.+?)\\\"");
        Matcher m2 = p2.matcher(html);
        m2.find();
        String pubKey = m2.group(1);
        return pubKey;
    }


    public static void main(String[] args) throws Exception {
        YhdUser yhdUser = new YhdUser();
        yhdUser.logIn("****", "****");
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
