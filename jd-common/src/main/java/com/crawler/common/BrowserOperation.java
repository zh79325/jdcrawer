package com.crawler.common;

import com.teamdev.jxbrowser.chromium.Browser;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/6/1 23:32
 * Description:
 */
public interface BrowserOperation {
    boolean execute(Browser browser);
}
