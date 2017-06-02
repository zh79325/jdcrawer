package com.crawler.yhd;

import com.alibaba.fastjson.JSONObject;
import com.crawler.common.BrowserOperation;
import com.crawler.common.BrowserUtil;
import com.crawler.common.BrowserWaitTool;
import com.crawler.common.CrawlerUser;
import com.teamdev.jxbrowser.chromium.Browser;
import com.teamdev.jxbrowser.chromium.Cookie;
import com.teamdev.jxbrowser.chromium.JSValue;
import com.teamdev.jxbrowser.chromium.dom.By;
import com.teamdev.jxbrowser.chromium.dom.DOMDocument;
import com.teamdev.jxbrowser.chromium.dom.DOMElement;
import com.teamdev.jxbrowser.chromium.dom.internal.InputElement;
import org.apache.commons.lang3.StringUtils;

import java.io.IOException;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.teamdev.jxbrowser.chromium.BrowserMouseEvent.MouseButtonType.PRIMARY;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/5/23 9:33
 * Description:
 */
public class YhdUser extends CrawlerUser {

    String guid;

    public boolean logIn(String uid, String pwd) {
        browser.loadURL("https://passport.yhd.com/passport/login_input.do");
        BrowserWaitTool tool = new BrowserWaitTool(browser);
        tool.waitUntil(new BrowserOperation() {
            @Override
            public boolean execute(Browser browser) {
                DOMDocument document = browser.getDocument();
                DOMElement input=   document.findElement(By.tagName("body"));
                if(input!=null){
                    BrowserUtil.forwardMouseClickEvent(browser, PRIMARY, 11, 12, 629, 373);
                }
                String token = BrowserUtil.getValue(document, "__yct_str__");
                if (StringUtils.isEmpty(token)) {
                    return false;
                }

                return true;
            }
        });
        DOMDocument document = browser.getDocument();
        ((InputElement) document.findElement(By.id("un"))).setValue(uid);
        ((InputElement) document.findElement(By.id("pwd"))).setValue(pwd);
        document.findElement(By.id("login_button")).click();
        tool.waitUntil(new BrowserOperation() {
            @Override
            public boolean execute(Browser browser) {
                JSValue href = browser.executeJavaScriptAndReturnValue(
                        "document.location.href");
                String str = href.asString().getStringValue();
                if (str.indexOf("//www.yhd.com") >= 0) {
                    return true;
                }
                return false;
            }
        });

        List<Cookie> cookies= browser.getCookieStorage().getAllCookies();
        for (Cookie cookie : cookies) {
            cookieJar.addCookie(cookie);
        }


        return true;

    }

    public void addToCard(String itemId) throws IOException {

        String html=getResult("http://item.yhd.com/item/"+itemId,null,null);
        JSONObject detailparams=getDetailParam(html);

        if(detailparams.containsKey("productId")){
            itemId=detailparams.getLong("productId")+"";
        }
        Map<String, String> params = new HashMap<String, String>();

        long t = new Random().nextInt(899999) + 100000;
        params.put("callback", "jQuery" + t);
        params.put("productId", itemId);
        params.put("num", "1");
        params.put("_", new Date().getTime() + "");
        String result = getResult("https://cart.yhd.com/cart/opt/add.do", null, params);
        finishOrder();
    }

    private JSONObject getDetailParam(String html) {
        Pattern pattern=Pattern.compile("detailparams\\s*=\\s*(\\{.+?\\})",Pattern.DOTALL);
        Matcher matcher=pattern.matcher(html);
        if(!matcher.find()){
            return null;
        }
        String json= matcher.group(1);
        return JSONObject.parseObject(json);
    }

    private void finishOrder() throws IOException {
       String html= getResult("http://buy.yhd.com/checkoutV3/index.do",null,null);
    }


    public static void main(String[] args) throws Exception {
        YhdUser yhdUser = new YhdUser();
        yhdUser.logIn("xxx", "xxx");
        yhdUser.addToCard("61199936");
    }


}
