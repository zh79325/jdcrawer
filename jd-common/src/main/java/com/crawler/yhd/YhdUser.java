package com.crawler.yhd;

import com.alibaba.fastjson.JSONObject;
import com.crawler.common.BrowserOperation;
import com.crawler.common.BrowserUtil;
import com.crawler.common.BrowserWaitTool;
import com.crawler.common.CrawlerUser;
import com.teamdev.jxbrowser.chromium.*;
import com.teamdev.jxbrowser.chromium.dom.By;
import com.teamdev.jxbrowser.chromium.dom.DOMDocument;
import com.teamdev.jxbrowser.chromium.dom.DOMElement;
import com.teamdev.jxbrowser.chromium.dom.internal.InputElement;
import okhttp3.Headers;
import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;

import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.teamdev.jxbrowser.chromium.BrowserMouseEvent.MouseButtonType.PRIMARY;

/**
 * Author     : zh79325@163.com
 * Copyright  :
 * Company    :
 * Create at  : 2017/5/23 9:33
 * Description:
 */
public class YhdUser extends CrawlerUser {

    String token;

    File validateImg;

    public boolean logIn(String uid, String pwd) {
        browser.loadURL("https://passport.yhd.com/passport/login_input.do");
//        browser.getContext().getNetworkService().setNetworkDelegate(new NetworkDelegate() {
//            @Override
//            public void onBeforeURLRequest(BeforeURLRequestParams beforeURLRequestParams) {
//
//            }
//
//            @Override
//            public void onBeforeRedirect(BeforeRedirectParams beforeRedirectParams) {
//
//            }
//
//            @Override
//            public void onBeforeSendHeaders(BeforeSendHeadersParams beforeSendHeadersParams) {
//
//            }
//
//            @Override
//            public void onSendHeaders(SendHeadersParams sendHeadersParams) {
//
//            }
//
//            @Override
//            public void onHeadersReceived(HeadersReceivedParams headersReceivedParams) {
//
//            }
//
//            @Override
//            public void onResponseStarted(ResponseStartedParams responseStartedParams) {
//
//            }
//
//            @Override
//            public void onDataReceived(DataReceivedParams dataReceivedParams) {
//                String url = dataReceivedParams.getURL();
////                if(url.indexOf("captcha.yhd.com/public/getcaptcha.do")>=0){
////                    byte[] bytes=  dataReceivedParams.getData();
////                    try {
////                        BufferedImage img = ImageIO.read(new ByteArrayInputStream(bytes));
////                        validateImg = new File("tmp/yhd/validateImg/image"+UUID.randomUUID().toString()+".jpg");
////                        if(!validateImg.getParentFile().exists()){
////                            validateImg.getParentFile().mkdirs();
////                        }
////                        ImageIO.write(img, "jpg", validateImg);
////                    } catch (IOException e) {
////                        e.printStackTrace();
////                    }
////                }
//            }
//
//            @Override
//            public void onCompleted(RequestCompletedParams requestCompletedParams) {
//
//
//            }
//
//            @Override
//            public void onDestroyed(RequestParams requestParams) {
//
//            }
//
//            @Override
//            public boolean onAuthRequired(AuthRequiredParams authRequiredParams) {
//                return false;
//            }
//
//            @Override
//            public boolean onCanSetCookies(String s, List<Cookie> list) {
//                return false;
//            }
//
//            @Override
//            public boolean onCanGetCookies(String s, List<Cookie> list) {
//                return false;
//            }
//
//            @Override
//            public void onBeforeSendProxyHeaders(BeforeSendProxyHeadersParams beforeSendProxyHeadersParams) {
//
//            }
//
//            @Override
//            public void onPACScriptError(PACScriptErrorParams pacScriptErrorParams) {
//
//            }
//        });
        BrowserWaitTool tool = new BrowserWaitTool(browser);
        BrowserUtil.showBrowser(browser);
        tool.waitUntil(new BrowserOperation() {
            @Override
            public boolean execute(Browser browser) {
                DOMDocument document = browser.getDocument();
                DOMElement input = document.findElement(By.tagName("body"));
                if (input != null) {
                    BrowserUtil.forwardMouseClickEvent(browser, PRIMARY, 11, 12, 629, 373);
                }
                token = BrowserUtil.getValue(document, "__yct_str__");
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
                DOMDocument document = browser.getDocument();
                if (validateImg!=null) {
                    return false;
                }
                JSValue href = browser.executeJavaScriptAndReturnValue(
                        "document.location.href");
                String str = href.asString().getStringValue();
                if (str.indexOf("//www.yhd.com") >= 0) {
                    return true;
                }
                return false;
            }
        });

        List<Cookie> cookies = browser.getCookieStorage().getAllCookies();
        for (Cookie cookie : cookies) {
            cookieJar.addCookie(cookie);
        }


        return true;

    }

    public String orderItem(String itemId) throws IOException {
        String  url = "http://item.yhd.com/item/" + itemId;
        Headers headers = _headers.newBuilder()
                .add("Referer", url)
                .add("Host", "cart.yhd.com")
                .build();
        String html = getResult(url, null, null);
        JSONObject detailparams = getDetailParam(html);

        if (detailparams.containsKey("productId")) {
            itemId = detailparams.getLong("productId") + "";
        }
        Map<String, String> params = new HashMap<String, String>();

        long t = new Random().nextInt(899999) + 100000;
        params.put("callback", "jQuery" + t);
        params.put("productId", itemId);
        params.put("merchantId", detailparams.getIntValue("merchantId") + "");
        params.put("num", "1");
        params.put("pmId", "");
        params.put("ybPmIds", "");
        params.put("needTip", "");
        params.put("linkPosition", "addToCart");


        params.put("_", new Date().getTime() + "");
        String result = getResult("https://cart.yhd.com/cart/opt/add.do", headers, params);
        String orderId = finishOrder();
        return orderId;
    }

    private JSONObject getDetailParam(String html) {
        Pattern pattern = Pattern.compile("detailparams\\s*=\\s*(\\{.+?\\})", Pattern.DOTALL);
        Matcher matcher = pattern.matcher(html);
        if (!matcher.find()) {
            return null;
        }
        String json = matcher.group(1);
        return JSONObject.parseObject(json);
    }

    private String finishOrder() throws IOException {
        JSONObject initParams = initOrder();
        JSONObject confirmParams = confirmOrder(initParams);
        String orderId = confirmParams.getString("orderCode");
        return orderId;
    }

    private JSONObject confirmOrder(JSONObject initParams) throws IOException {
        Headers headers = _headers.newBuilder()
                .add("Referer", " http://buy.yhd.com/checkoutV3/index.do")
                .add("Host", "buy.yhd.com")
                .build();
        String orderRandomString = initParams.getJSONObject("invoiceDTO").getString("orderRundomString");
        Map<String, String> urlParams = new HashMap<>();
        urlParams.put("orderID", "1");
        urlParams.put("rdCheck", orderRandomString);
        urlParams.put("rd", new Random().nextDouble() + "");
        urlParams.put("needProductDetail", "0");
        urlParams.put("validCodeAccount", "");
        urlParams.put("isMedicine", "");
        Map<String, String> body = new HashMap<>();
        body.put("userBehavior", "");
        String confirmJson = postResult("http://buy.yhd.com/checkoutV3/confirm/confirmOrder.do", headers, urlParams, body);
        JSONObject initObject = JSONObject.parseObject(confirmJson);
        return initObject;
    }

    private JSONObject initOrder() throws IOException {
        Headers headers = _headers.newBuilder()
                .add("Referer", " http://buy.yhd.com/checkoutV3/index.do")
                .add("Host", "buy.yhd.com")
                .build();
        String html = getResult("http://buy.yhd.com/checkoutV3/index.do", null, null);
        org.jsoup.nodes.Document doc = Jsoup.parse(html);
        Map<String, String> params = new HashMap<>();
        String cart2Checkbox = doc.getElementById("cart2Checkbox").val();
        params.put("cart2Checkbox", cart2Checkbox);
        params.put("operateFlag", "");
        params.put("cartSuppress", "");
        params.put("fastBuyFlag", "");
        params.put("returnUrl", "");
        params.put("isMedicine", "");
        String initJson = getResult("http://buy.yhd.com/checkoutV3/init/init.do", null, params);
        JSONObject initObject = JSONObject.parseObject(initJson);
        return initObject;
    }


    public static void main(String[] args) throws Exception {
        YhdUser yhdUser = new YhdUser();
        yhdUser.logIn("xxxxxxx", "xxxxxxx");
        String orderId = yhdUser.orderItem("70339429");
        System.out.println(orderId);
    }


}
