package com.crawler.common;

import com.teamdev.jxbrowser.chromium.Browser;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/6/1 23:25
 * Description:
 */
public class BrowserWaitTool {
    Browser browser;
    static final long DEFAULT_INTERVAL = 100L;

   public void waitUntil(BrowserOperation operation, long interval) {
        while (!operation.execute(browser)) {
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
