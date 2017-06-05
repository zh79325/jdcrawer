package com.crawler.common;

import okhttp3.*;

import java.io.IOException;
import java.net.Proxy;
import java.util.Map;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/6/4 15:20
 * Description:
 */
public class CrawlerHttpUtil {
    static Headers _headers;
    static {
        _headers = new Headers.Builder()
                .add("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36")
                .add("ContentType", "text/html; charset=utf-8")
                .add("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")
                .add("Accept-Language", "zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4")
                .add("Connection", "keep-alive")
                .build();
    }
    public static Response get(Proxy proxy, String url, Headers headers, Map<String, String> params) throws IOException {
        OkHttpClient  client = new OkHttpClient.Builder()
                .proxy(proxy)
                .build();
        HttpUrl httpUrl = getHttpUrl(url, params);
        if (headers == null) {
            headers = _headers;
        }
        Request request = new Request.Builder()
                .url(httpUrl)
                .headers(headers)
                .build();
        Response response = null;
        response = client.newCall(request).execute();
        return response;
    }

    public static String getResult(Proxy proxy, String url, Headers headers, Map<String, String> params) throws IOException {
        Response response = get(proxy,url, headers, params);
        return response.body().string();
    }

    public static HttpUrl getHttpUrl(String url, Map<String, String> params) {
        HttpUrl httpUrl = HttpUrl.parse(url);
        if (params != null) {
            HttpUrl.Builder urlBuilder = httpUrl.newBuilder();
            for (Map.Entry<String, String> entry : params.entrySet()) {
                urlBuilder.addQueryParameter(entry.getKey(), entry.getValue());
            }
            httpUrl = urlBuilder.build();
        }
        return httpUrl;
    }
}
