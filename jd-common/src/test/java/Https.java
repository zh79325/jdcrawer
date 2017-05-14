import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

import java.io.IOException;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/5/11 18:49
 * Description:
 */
public class Https {
    public static void main(String[] args) throws IOException {
        String url = "https://qr.m.jd.com/check?token=ffhuzffagn5mtyyz72u0unqs6d8&callback=jQue080559&appid=133&_=1494499661632";
        url="https://qr.m.jd.com/check?token=9d6q4goiwf2mnf1ihhx37ppncfnmnnex&callback=jQuery750743&appid=133&_=1494500023650";
        OkHttpClient client = new OkHttpClient().newBuilder().build();
        Response response = client.newCall(new Request.Builder()
                .url(url).build())
                .execute();
        String content = response.body().string();
        System.out.println(content);
    }
}
