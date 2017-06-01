package com.crawler.jd;

import com.alibaba.fastjson.JSONObject;
import okhttp3.*;

import java.io.IOException;
import java.util.Map;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/6/1 17:50
 * Description:
 */
public class LogIntest {

    public static void main(String[] args) throws IOException {
        Headers headers = new Headers.Builder()
                .add("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36")
                .add("ContentType", "text/html; charset=utf-8")
                .add("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")
                .add("Accept-Language", "zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4")
                .add("Connection", "keep-alive")
                .build();
        String json =
                "{\"credentials.username\":\"IXTqnnBVszYdVnKiknTaJF+NgPkR++Ju2Ccbdghj2VJ6xJH52SOQIlAKCB09Jc7N56Yy0+WX5OY+IN5AilYMzLQmay7pvQQgay6haANXSWB3NxMVOKgu8HJben6zyPx2O5GwsaAmhqcPjNW/gxj093oxpiVQFlHSC1s1YNnHZE4=\",\"credentials.password\":\"e0lZZR4n4i6FfQo+8++RMLLP+/Z1tmrso7Vfk9EyXz2SARNaCExxgqlXcsCmT4f8PelcW+TihjOhUxz4yg3dRC7xotQZaaq7Np2vSM6Q2E0V4J9NiNPks7rSB6VDAXnbrdbpcmGgA+IrNPbh6GOobwzJkMGQpusOSNzxOfjt67M=\",\"validCode\":\"验证码\",\"sig\":\"\",\"captchaToken\":\"Qo9fj4IseQjWWWj8z0GSGoy7KceSwIFCbQBT9j4SBRkXv5hitllbIZCNbqJsRrDc5S%2BK5qEablvakYvCgbZEhAKWhOZTEDogSgqM7O93e2vUupHWwCPHDfetLyaV3a5WY0FhhnIUCYrO5WkcgDDidP3aECWRNv%2BOjCeHCn4tSf9ivTNC5ysqNaVw0PzGOBSAuXi75yxE%2Bbj9KwaIebDs0VT51v1JLW%2FnuHtDH3BTOorkH%2F0CuVimadQ47DgYIiQ5sWmTK4dt20dWtbAtiEhQi6EgY9ZjEqEadH1cyNu5ASuwjVMTCRO%2Fz4Y%2Fyw1zN48R\",\"loginSource\":\"1\",\"returnUrl\":\"https://www.yhd.com/?cityId=1\",\"isAutoLogin\":\"0\"}";
        final String cookie =
                "cid=NWpROTU4NmxNOTE0N2hUOTUwOHZOMjkyMXpBMzcyMndKNDEwM2tGNjE4NG9RMTc0";
        RequestBody body = null;
        JSONObject postBody = JSONObject.parseObject(json);
        FormBody.Builder builder = new FormBody.Builder();
        for (Map.Entry<String, Object> entry : postBody.entrySet()) {
            builder.add(entry.getKey(), (String) entry.getValue());
        }
        body = builder.build();
        HttpUrl httpUrl = HttpUrl.parse("https://passport.yhd.com/publicPassport/login.do");
        Request request = new Request.Builder()
                .url(httpUrl)
                .headers(headers)
                .post(body)
                .build();
        OkHttpClient client = new OkHttpClient().newBuilder()
                .addInterceptor(new Interceptor() {
                    @Override
                    public Response intercept(Chain chain) throws IOException {
                        final Request original = chain.request();

                        final Request authorized = original.newBuilder()
                                .addHeader("Cookie", cookie)
                                .build();

                        return chain.proceed(authorized);
                    }
                })
                .build();
        Response  response = client.newCall(request).execute();
        String str=response.body().string();
        System.out.println(str);
    }
}
