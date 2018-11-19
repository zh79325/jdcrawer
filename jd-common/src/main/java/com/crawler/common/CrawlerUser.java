package com.crawler.common;

import com.crawler.jd.http.JdCookieJar;
import com.teamdev.jxbrowser.chromium.Browser;
import com.teamdev.jxbrowser.chromium.BrowserContext;
import com.teamdev.jxbrowser.chromium.BrowserContextParams;
import okhttp3.*;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

/**
 * Author     : zh79325@163.com
 * Copyright  :
 * Company    :
 * Create at  : 2017/5/23 9:33
 * Description:
 */
public abstract class CrawlerUser {

    String identity;
    OkHttpClient client;
    protected Headers _headers;
    protected JdCookieJar cookieJar;

    protected boolean loginSuccess;

    protected String nickName;
    protected String imgUrl;
    protected String userId;


    public boolean isLoginSuccess() {
        return loginSuccess;
    }

    protected Browser browser;

    public CrawlerUser() {
        try {
            JxBrowserHackUtil.hack();
        } catch (Exception e) {
            e.printStackTrace();
        }
        identity = UUID.randomUUID().toString();

        BrowserContextParams params=new BrowserContextParams("tmp/browser/"+identity);
        BrowserContext context1 = new BrowserContext(params);

        browser = new Browser(context1);


        cookieJar = new JdCookieJar();
        client = new OkHttpClient.Builder()
                .cookieJar(cookieJar)
                .build();
        _headers = new Headers.Builder()
                .add("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36")
                .add("ContentType", "text/html; charset=utf-8")
                .add("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")
                .add("Accept-Language", "zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4")
                .add("Connection", "keep-alive")
                .build();
    }

    public Response get(String url, Headers headers, Map<String, String> params) throws IOException {
        HttpUrl httpUrl = CrawlerHttpUtil.getHttpUrl(url, params);
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


    public String getResult(String url, Headers headers, Map<String, String> params) throws IOException {
        Response response = get(url, headers, params);
        return response.body().string();
    }

    public String postResult(String url, Headers headers, Map<String, String> urlParams, Map<String, String> bodyParams) throws IOException {
        Response response = post(url, headers, urlParams, bodyParams);
        return response.body().string();
    }

    public Response post(String url, Headers headers, Map<String, String> params, Map<String, String> postBody) throws IOException {
        HttpUrl httpUrl = CrawlerHttpUtil.getHttpUrl(url, params);
        if (headers == null) {
            headers = this._headers;
        }
        RequestBody body = null;
        if (postBody != null) {
            FormBody.Builder builder = new FormBody.Builder();
            for (Map.Entry<String, String> entry : postBody.entrySet()) {
                builder.add(entry.getKey(),entry.getValue());
            }
            body=builder.build();
        } else {
            body = RequestBody.create(null, new byte[0]);
        }
        Request request = new Request.Builder()
                .url(httpUrl)
                .headers(headers)
                .post(body)
                .build();
        Response response = null;
        response = client.newCall(request).execute();
        return response;
    }

    public String getIdentity() {
        return identity;
    }
}
