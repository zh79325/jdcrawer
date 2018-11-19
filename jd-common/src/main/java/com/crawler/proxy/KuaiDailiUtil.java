package com.crawler.proxy;

import com.crawler.common.CrawlerHttpUtil;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.net.Proxy;
import java.util.Map;

/**
 * Author     : zh79325@163.com
 * Copyright  :
 * Company    :
 * Create at  : 2017/6/4 16:44
 * Description:
 */
public class KuaiDailiUtil {
    static final String []PROXY_SERVERS =new String[]{
            "http://www.kuaidaili.com/free/inha/",
            "http://www.kuaidaili.com/free/intr/",
            "http://www.kuaidaili.com/free/outtr/",
    };
    public static void getProxyServer(Proxy proxy, String url, int page, Map<String, ProxyServer> serverMap) throws IOException {
        if (page > 0) {
            if (!url.endsWith("/")) {
                url += "/";
            }
            url = url + page;
        }
        String html = CrawlerHttpUtil.getResult(proxy,url, null, null);
        Document doc = Jsoup.parse(html);
        Element ip_div = doc.getElementById("list");
        Element ip_table=ip_div.getElementsByTag("table").first();
        Elements rows = ip_table.getElementsByTag("tr");
        for (int i = 0; i < rows.size(); i++) {
            if (i == 0) {
                continue;
            }

            Element row = rows.get(i);
            Elements tds = row.getElementsByTag("td");
            String ip = tds.get(0).html();
            String port = tds.get(1).html();
            String protocol = tds.get(3).html();
            ProxyServer server = new ProxyServer();
            server.setIp(ip);
            server.setPort(Integer.parseInt(port));
            server.setProtocol(protocol);
            String serverUrl = server.url();
            if(!serverMap.containsKey(serverUrl)){
                serverMap.put(serverUrl, server);
            }
        }
    }


    public static void startCrawler(boolean useProxy, Map<String, ProxyServer> serverMap) throws IOException {
        for (int i = 0; i < 10; i++) {
            for (String proxyServer : PROXY_SERVERS) {
                Proxy proxy=useProxy?ProxyTool.randomProxyServer():null;
                try{
                    getProxyServer(proxy,proxyServer,i,serverMap);
                }catch (Exception ex){

                }
                try {
                    Thread.sleep(2000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
