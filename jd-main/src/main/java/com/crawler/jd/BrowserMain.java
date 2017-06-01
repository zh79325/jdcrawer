package com.crawler.jd;

import com.crawler.common.JxBrowserHackUtil;
import com.teamdev.jxbrowser.chromium.*;
import com.teamdev.jxbrowser.chromium.swing.BrowserView;

import javax.swing.*;
import java.awt.*;
import java.util.Map;
import java.util.UUID;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/6/1 18:58
 * Description:
 */
public class BrowserMain {
    public static void main(String[] args) throws Exception {
        JxBrowserHackUtil.hack();
        System.setProperty("teamdev.license.info", "true");
        BrowserContextParams params=new BrowserContextParams("tmp/browser/"+ UUID.randomUUID().toString());
        BrowserContext context1 = new BrowserContext(params);

        Browser browser = new Browser(context1);
        BrowserView view = new BrowserView(browser);

        JPanel panel = new JPanel(new BorderLayout());
        panel.add(view, BorderLayout.CENTER);

        JFrame frame = new JFrame();
        frame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        frame.add(panel, BorderLayout.CENTER);
        frame.setSize(700, 500);
        frame.setLocationRelativeTo(null);
        frame.setVisible(true);
        browser.loadURL("https://www.yhd.com/?cityId=1");

       java.util.List<Cookie> cookies= browser.getCookieStorage().getAllCookies();
//        HttpHeaders headers;

        browser.getContext().getNetworkService().setNetworkDelegate(new NetworkDelegate() {
            @Override
            public void onBeforeURLRequest(BeforeURLRequestParams beforeURLRequestParams) {

            }

            @Override
            public void onBeforeRedirect(BeforeRedirectParams beforeRedirectParams) {

            }

            @Override
            public void onBeforeSendHeaders(BeforeSendHeadersParams beforeSendHeadersParams) {

            }

            @Override
            public void onSendHeaders(SendHeadersParams sendHeadersParams) {
                String url=sendHeadersParams.getURL();
                Map<String, java.util.List<String>> headers= sendHeadersParams.getHeadersEx().getHeaders();
                System.out.println(url);
            }

            @Override
            public void onHeadersReceived(HeadersReceivedParams headersReceivedParams) {

            }

            @Override
            public void onResponseStarted(ResponseStartedParams responseStartedParams) {

            }

            @Override
            public void onDataReceived(DataReceivedParams dataReceivedParams) {

            }

            @Override
            public void onCompleted(RequestCompletedParams requestCompletedParams) {

            }

            @Override
            public void onDestroyed(RequestParams requestParams) {

            }

            @Override
            public boolean onAuthRequired(AuthRequiredParams authRequiredParams) {
                return true;
            }

            @Override
            public boolean onCanSetCookies(String s, java.util.List<Cookie> list) {
                return true;
            }

            @Override
            public boolean onCanGetCookies(String s, java.util.List<Cookie> list) {
                return true;
            }

            @Override
            public void onBeforeSendProxyHeaders(BeforeSendProxyHeadersParams beforeSendProxyHeadersParams) {

            }

            @Override
            public void onPACScriptError(PACScriptErrorParams pacScriptErrorParams) {

            }


        });

    }

}
