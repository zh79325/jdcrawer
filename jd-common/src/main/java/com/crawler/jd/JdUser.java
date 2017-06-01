package com.crawler.jd;

import com.alibaba.fastjson.JSONObject;
import com.crawler.common.CrawlerUser;
import com.crawler.jd.domain.items.JdItem;
import com.crawler.jd.script.EncryptScript;
import okhttp3.Headers;
import okhttp3.Response;
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
public class JdUser  extends CrawlerUser {

    File qrCode;

    String eid;
    String riskId;
    String fp;

    public String getNickName() {
        return nickName;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public String getUserId() {
        return userId;
    }

    private String nickName;
    private String imgUrl;
    private String userId;




    public File getQrCode() {
        return qrCode;
    }

    public JdUser(String userName) {
        super();
    }

    public void getUserInfo() throws IOException {
        String url=String.format("https://passport.jd.com/user/petName/getUserInfoForMiniJd.action?callback=&_=%d",new Date().getTime());
        Headers headers = _headers.newBuilder()
                .add("Host", JdConfig.LOGIN_INDEX.getHost())
                .add("Referer", "https://www.jd.com/")
                .build();
        String js=getResult(url,headers,null);
        String json=js.substring(js.indexOf("{"),js.lastIndexOf("}")+1);
        JSONObject jsonObject=JSONObject.parseObject(json);
        this.nickName=jsonObject.getString("nickName");
        this.imgUrl=jsonObject.getString("imgUrl");
        this.userId=jsonObject.getString("realName");
    }

    public JdUser() {
        this(null);
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
        getUserInfo();
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
        Map<String, String> map=getEncryptKey();
        String key=map.keySet().toArray(new String[]{})[0];
        String encryptKey = map.get(key);
        g = EncryptScript.encrypt(g, encryptKey);
        a = EncryptScript.encrypt(g, encryptKey);
        String url = String.format("http://payrisk.jd.com/fcf.html?g=%s&a=%s", g, a);
        String eidTxt = getResult(url, null, null);
        cookieJar.addCookie("payrisk.jd.com",key,eidTxt,null);
        return eidTxt;
    }

    private Map<String, String> getEncryptKey() throws IOException, ScriptException {
        String url = "https://payrisk.jd.com/js/td.js";
        String js = getResult(url, null, null);
        Map<String,String> keyMap = EncryptScript.parseEncryptKey(js);
        return keyMap;
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
        String trackidStr = cookieJar.getValue("TrackID");

        /**
         *      payload = {
         'overseaPurchaseCookies': '',
         'submitOrderParam.btSupport': '1',
         'submitOrderParam.ignorePriceChange': '0',
         'submitOrderParam.sopNotPutInvoice': 'false',
         'submitOrderParam.trackID': self.trackid,
         'submitOrderParam.eid': self.eid,
         'submitOrderParam.fp': self.fp,
         }
         */

        params=new HashMap<>();
        params.put("overseaPurchaseCookies","");
        params.put("submitOrderParam.btSupport","1");
        params.put("submitOrderParam.ignorePriceChange","0");
        params.put("submitOrderParam.sopNotPutInvoice","false");
        params.put("submitOrderParam.trackID",trackidStr);
        params.put("submitOrderParam.eid",eid);
        params.put("submitOrderParam.fp",fp);

        url="http://trade.jd.com/shopping/order/submitOrder.action";
        html=postResult(url,null,params,null);
        System.out.println(html);

    }





    public void buy(JdItem item) throws IOException {
        addToCart(item);
    }

    public void heartBeat() throws IOException {
        String url="https://miaosha.jd.com/";
        String html=getResult(url,null,null);
        Document doc = Jsoup.parse(html);
    }
}
