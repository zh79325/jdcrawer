package com.crawler.common;

import com.teamdev.jxbrowser.chromium.Browser;

/**
 * Author     : zh79325@163.com
 * Copyright  :
 * Company    :
 * Create at  : 2017/6/1 23:25
 * Description:
 */
public class BrowserWaitTool {
    Browser browser;
    static final long DEFAULT_INTERVAL = 100L;

   public void waitUntil(BrowserOperation operation, long interval) {
        while (!BrowserUtil.hasDocument(browser)||!operation.execute(browser)) {
            try {
                Thread.sleep(interval);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public void waitUntil(BrowserOperation operation) {
        waitUntil(operation, DEFAULT_INTERVAL);
    }

    public BrowserWaitTool(Browser browser) {
        this.browser = browser;
    }
}
