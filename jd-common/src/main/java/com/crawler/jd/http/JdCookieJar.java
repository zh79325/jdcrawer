package com.crawler.jd.http;

import okhttp3.Cookie;
import okhttp3.CookieJar;
import okhttp3.HttpUrl;

import java.util.*;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/5/11 16:18
 * Description:
 */
public class JdCookieJar implements CookieJar {
    private final HashMap<String, List<Cookie>> cookieStore = new HashMap<String, List<Cookie>>();
    private final List<Cookie> _cookies = new ArrayList<Cookie>();

    public void saveFromResponse(HttpUrl url, List<Cookie> cookies) {
        cookieStore.put(url.host().toLowerCase(), cookies);
        this._cookies.addAll(cookies);
    }

    public List<Cookie> loadForRequest(HttpUrl url) {
        if (1 == 0) {
            List<Cookie> cookies = cookieStore.get(url.host().toLowerCase());
            return cookies != null ? cookies : new ArrayList<Cookie>();
        } else {
            return _cookies;
        }

    }

    public String getValue(String name) {
        for (Map.Entry<String, List<Cookie>> entry : cookieStore.entrySet()) {
            List<Cookie> cookieList = entry.getValue();
            for (Cookie cookie : cookieList) {
                if (cookie.name().equals(name)) {
                    return cookie.value();
                }
            }
        }
        return null;
    }

    public void addCookie(String domain, String key, String value, Date expire) {
        for (Cookie c : _cookies) {
            if (c.name().equals(key)) {
                _cookies.remove(c);
                break;
            }
        }
        Cookie.Builder cookieBuilder = new Cookie.Builder()
                .name(key)
                .value(value)
                .domain(domain);
        Cookie cookie = cookieBuilder.build();
        if (expire != null) {
            cookieBuilder.expiresAt(expire.getTime());
        }
        _cookies.add(cookie);
    }


}
