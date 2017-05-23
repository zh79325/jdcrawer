package com.crawler.jd;

import java.net.MalformedURLException;
import java.net.URL;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/5/11 15:58
 * Description:
 */
public enum JdConfig {
    LOGIN_INDEX("https://passport.jd.com/new/login.aspx"),
    QR_CODE_SHOW("https://qr.m.jd.com/show"),
    QR_CODE_CHECK("https://qr.m.jd.com/check"),
    QR_CODE_VALIDATION("https://passport.jd.com/uc/qrCodeTicketValidation"),
    MIAO_SHA_DATA_API("https://ai.jd.com/index_new?app=Seckill&action=pcMiaoShaAreaList&callback=pcMiaoShaAreaList"),
    MIAO_SHA_INDEX("https://miaosha.jd.com/");

    final String url;
    final String host;

    JdConfig(String url)   {

        this.url = url;
        String urlHost = null;
        try {
            urlHost = new URL(url).getHost();
        } catch (MalformedURLException e) {
        }
        host=urlHost;
    }

    public String getUrl() {
        return url;
    }

    public String getHost() {
        return host;
    }
}
