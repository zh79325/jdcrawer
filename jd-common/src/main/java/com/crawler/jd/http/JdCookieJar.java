package com.crawler.jd.http;

import okhttp3.Cookie;
import okhttp3.CookieJar;
import okhttp3.HttpUrl;

import java.util.*;

/**
 * Author     : zh79325@163.com
 * Copyright  :
 * Company    :
 * Create at  : 2017/5/11 16:18
 * Description:
 */
public class JdCookieJar implements CookieJar {
    private final List<Cookie> _cookies = new ArrayList<Cookie>();

    public void saveFromResponse(HttpUrl url, List<Cookie> cookies) {
        this._cookies.addAll(cookies);
    }

    public List<Cookie> loadForRequest(HttpUrl url) {
        return _cookies;

    }

    public String getValue(String name) {
        for (Cookie cookie : _cookies) {
            if (cookie.name().equals(name)) {
                return cookie.value();
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

    public void addCookie(com.teamdev.jxbrowser.chromium.Cookie cookie ) {

        Cookie.Builder cookieBuilder = new Cookie.Builder()
                .name(cookie.getName())
                .value(cookie.getValue())
                .domain(cookie.getDomain())
                .expiresAt(cookie.getExpirationTime())
                .path(cookie.getPath());
        if(cookie.isHTTPOnly()){
            cookieBuilder.httpOnly();
        }
        if(cookie.isSecure()){
            cookieBuilder.secure();
        }
        Cookie cookies = cookieBuilder.build();

        _cookies.add(cookies);
    }


}
