package com.crawler.jd.http;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

import java.io.IOException;

/**
 * Author     : zh79325@163.com
 * Copyright  :
 * Company    :
 * Create at  : 2017/5/12 13:13
 * Description:
 */
public class JdHttpUtil {

    public static String get(String url) throws IOException {
        OkHttpClient client = new OkHttpClient().newBuilder().build();
        Response response = client.newCall(new Request.Builder()
                .url(url).build())
                .execute();
        String content = response.body().string();
        return content;
    }

    public static String parseJqueryJson(String jqueryResp) {
        int n1 = jqueryResp.indexOf("(");
        int n2 = jqueryResp.lastIndexOf(")");
        if (n1 < 0 || n2 < 0) {
            return null;
        }
        String json = jqueryResp.substring(n1 + 1, n2);
        return json;
    }
}
