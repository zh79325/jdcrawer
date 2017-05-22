package com.crawer.jd;

import com.alibaba.fastjson.JSONObject;
import com.crawer.jd.domain.items.JdItem;
import com.crawer.jd.http.JdCookieJar;
import com.crawer.jd.script.EncryptScript;
import okhttp3.*;
import org.apache.commons.io.IOUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import javax.script.ScriptException;
import java.io.*;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/5/11 15:57
 * Description:
 */
public class JdUser {
    String identity;
    File qrCode;
    String userName;
    OkHttpClient client;
    Headers _headers;
    JdCookieJar cookieJar;
    boolean loginSuccess;

    String eid;
    String uid;
    String riskId;
    String fp;

    public boolean isLoginSuccess() {
        return loginSuccess;
    }

    public void setLoginSuccess(boolean loginSuccess) {
        this.loginSuccess = loginSuccess;
    }

    public File getQrCode() {
        return qrCode;
    }

    /**
     * @param userName 'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
     *                 'ContentType': 'text/html; charset=utf-8',
     *                 'Accept-Encoding':'gzip, deflate, sdch',
     *                 'Accept-Language':'zh-CN,zh;q=0.8',
     *                 'Connection' : 'keep-alive',
     */
    public JdUser(String userName) {
        identity = UUID.randomUUID().toString();
        this.userName = userName;
        cookieJar = new JdCookieJar();
        client = new OkHttpClient.Builder()
                .cookieJar(cookieJar)
                .build();
        _headers = new Headers.Builder()
                .add("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36")
                .add("ContentType", "text/html; charset=utf-8")
//                .add("Accept-Encoding", "gzip, deflate, sdch")
                .add("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")
                .add("Accept-Language", "zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4")
                .add("Connection", "keep-alive")
                .build();
    }

    public JdUser() {
        this(null);
    }

    public String getIdentity() {
        return identity;
    }


    public void loadLogInQrCode() throws IOException, ScriptException, NoSuchMethodException {
        preLogIn();
        qrCode = loadQrCode();
    }

    int MAX_SLEEP = 1000 * 60;
    int sleepTime = 0;
    int sleepIntevarl = 1000;

    public boolean waitToScanQrCode(UserLoginCallBack callBack) throws IOException {
        String ticket = null;
        while (true) {
            sleepTime += sleepIntevarl;
            if (sleepTime > MAX_SLEEP) {
                callBack.logInResult(false);
                return false;
            }
            try {
                Thread.sleep(sleepIntevarl);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            String token = cookieJar.getValue("wlfstk_smdl");
            ticket = checkScanResult(token);
            if (ticket != null) {
                break;
            }
        }
        validateToken(ticket);
        callBack.logInResult(true);
        loginSuccess = true;
        return true;
    }

    public boolean logIn(String userName, String password) throws IOException, ScriptException, NoSuchMethodException {
        Document doc = preLogIn();
        return true;
    }

    boolean validateToken(String token) throws IOException {
        Headers headers = _headers.newBuilder()
                .add("Host", JdConfig.LOGIN_INDEX.getHost())
                .add("Referer", JdConfig.LOGIN_INDEX.getUrl())
                .build();
        Map<String, String> params = new HashMap<String, String>();
        params.put("t", token);
        Response response = get(JdConfig.QR_CODE_VALIDATION.url, headers, params);
        String p3p = response.header("P3P");
        _headers = _headers.newBuilder()
                .add("P3P", p3p)
                .build();
        return true;
    }


    String checkScanResult(String token) throws IOException {
        Headers headers = _headers.newBuilder()
                .removeAll("Accept-Encoding")
                .add("accept", "*/*")
                .add("Host", JdConfig.QR_CODE_SHOW.getHost())
                .add("Referer", JdConfig.LOGIN_INDEX.getUrl())
                .build();
        Map<String, String> params = new HashMap<String, String>();

        long t = new Random().nextInt(899999) + 100000;
        params.put("callback", "jQuery" + t);
        params.put("appid", "133");
        params.put("token", token);
        params.put("_", new Date().getTime() + "");
        String result = getResult(JdConfig.QR_CODE_CHECK.url, headers, params);
        System.out.println(result);
        int n1 = result.indexOf("(");
        int n2 = result.indexOf(")");
        if (n1 < 0 || n2 < 0) {
            return null;
        }
        String json = result.substring(n1 + 1, n2);
        try {
            JSONObject r = JSONObject.parseObject(json);
            int code = r.getInteger("code");
            if (code != 200) {
                return null;
            }
            String ticket = r.getString("ticket");
            return ticket;
        } catch (Exception e) {
            return null;
        }
    }

    Response get(String url, Headers headers, Map<String, String> params) throws IOException {
        HttpUrl httpUrl = HttpUrl.parse(url);
        if (params != null) {
            HttpUrl.Builder urlBuilder = httpUrl.newBuilder();
            for (Map.Entry<String, String> entry : params.entrySet()) {
                urlBuilder.addQueryParameter(entry.getKey(), entry.getValue());
            }
            httpUrl = urlBuilder.build();
        }
        if (headers == null) {
            headers = this._headers;
        }
        Request request = new Request.Builder()
                .url(httpUrl)
                .headers(headers)
                .build();
        Response response = null;
        response = client.newCall(request).execute();
        return response;
    }

    String getResult(String url, Headers headers, Map<String, String> params) throws IOException {
        Response response = get(url, headers, params);
        return response.body().string();
    }

    File loadQrCode() throws IOException {
        Headers headers = _headers.newBuilder()
                .add("Referer", JdConfig.LOGIN_INDEX.getUrl())
                .build();
        Map<String, String> params = new HashMap<String, String>();
        params.put("appid", "133");
        params.put("size", "147");
        params.put("t", new Date().getTime() + "");
        Response qrCodeResponse = get(JdConfig.QR_CODE_SHOW.url, headers, params);
        File file = new File("tmp/qr/" + UUID.randomUUID().toString() + ".png");
        if (!file.getParentFile().exists()) {
            file.getParentFile().mkdirs();
        }

        OutputStream outputStream = new FileOutputStream(file);
        InputStream inputStream = qrCodeResponse.body().byteStream();
        IOUtils.copy(inputStream, outputStream);
        inputStream.close();
        outputStream.close();
        return file;
    }

    String getRiskId() throws IOException {
        String url = String.format("https://payrisk.jd.com/y.html?v=%f&o=passport.com.crawer.jd.com/new/login.aspx", new Random().nextDouble());
        String html = getResult(url, null, null);

        Pattern p = Pattern.compile("'(.+?)'");
        Matcher m = p.matcher(html);
        m.find();
        String jd_risk_token_id = m.group(1);
        return jd_risk_token_id;
    }

    Document preLogIn() throws IOException, ScriptException, NoSuchMethodException {
        String html = getResult(JdConfig.LOGIN_INDEX.url, null, null);
        Document doc = Jsoup.parse(html);
        this.riskId = getRiskId();
        Map<String, String> fpMap = getFingure();
        this.fp = fpMap.get("fp");
        this.eid = getEid(fpMap.get("g"), fpMap.get("a"));
        return doc;
    }

    private String getEid(String g, String a) throws IOException, ScriptException, NoSuchMethodException {
        String encryptKey = getEncryptKey();
        g = EncryptScript.encrypt(g, encryptKey);
        a = EncryptScript.encrypt(g, encryptKey);
        String url = String.format("http://payrisk.jd.com/fcf.html?g=%s&a=%s", g, a);
        String txt = getResult(url, null, null);
        return txt;
    }

    private String getEncryptKey() throws IOException, ScriptException {
        String url = "https://payrisk.jd.com/js/td.js";
        String js = getResult(url, null, null);
        String key = EncryptScript.parseEncryptKey(js);
        return key;
    }

    Map<String, String> getFingure() {
        Map<String, String> r = new HashMap<>();
        try {
            r =  EncryptScript.getFingure(riskId, _headers.get("User-Agent"));
        } catch (ScriptException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        }

        return r;
    }


    void addToCart(JdItem item) throws IOException {
        Headers headers = _headers.newBuilder()
                .removeAll("Accept-Encoding")
                .add("Referer", JdConfig.MIAO_SHA_INDEX.getUrl())
                .build();
        String url = String.format("http://item.jd.com/%s.html", item.getId());
        String html = getResult(url, headers, null);
        Document doc = Jsoup.parse(html);
        Elements tags = doc.select("a#InitCartUrl");
        String addToCart = "https:" + tags.attr("href");
        headers = _headers.newBuilder()
                .removeAll("Accept-Encoding")
                .add("Referer", url)
                .build();
        get(addToCart, headers, null);
        orderInfo(item);
    }

    void orderInfo(JdItem item) throws IOException {
        Map<String, String> params = new HashMap<>();
        params.put("rid", new Date().getTime() + "");
        String url = "http://trade.jd.com/shopping/order/getOrderInfo.action";
        String html = getResult(url, null, params);
        Document doc = Jsoup.parse(html);

        Elements trackid = doc.select("#TrackID");
        Elements fp = doc.select("#fp");
        String trackidStr = cookieJar.getValue("TrackID");
        System.out.println(trackidStr);
    }

    void subMitOrder(JdItem item) {

    }


    public void buy(JdItem item) throws IOException {
        addToCart(item);
    }
}
