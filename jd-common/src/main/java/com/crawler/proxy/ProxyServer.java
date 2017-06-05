package com.crawler.proxy;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Proxy;
import java.net.SocketAddress;
import java.util.concurrent.TimeUnit;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/6/4 15:35
 * Description:
 */
public class ProxyServer {
    String ip;
    Integer port;
    String protocol;

    boolean dead=false;
    boolean checked=false;


    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    public boolean isDead() {
        return dead;
    }

    public void setDead(boolean dead) {
        this.dead = dead;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public Integer getPort() {
        return port;
    }

    public void setPort(Integer port) {
        this.port = port;
    }

    public String getProtocol() {
        return protocol;
    }

    public void setProtocol(String protocol) {
        this.protocol = protocol;
    }

    public String url() {
        return String.format("%s://%s:%d",protocol,ip,port);
    }

    public Proxy proxy(){
        SocketAddress sa=new InetSocketAddress(ip,port);
        Proxy proxy=new Proxy(Proxy.Type.HTTP,sa);
        return proxy;
    }


    public boolean alive(){

        OkHttpClient client=new OkHttpClient.Builder().proxy(
                proxy()
        ).connectTimeout(1, TimeUnit.SECONDS)
                .readTimeout(1,TimeUnit.SECONDS)
                .writeTimeout(1,TimeUnit.SECONDS)
                .build();

        Request request=new Request.Builder().url("https://www.baidu.com/")
                .build();
        try {
            Response response=client.newCall(request).execute();
            if(response.code()!=200){
                return false;
            }
        } catch (IOException e) {
            return false;
        }
        return true;
    }
}
