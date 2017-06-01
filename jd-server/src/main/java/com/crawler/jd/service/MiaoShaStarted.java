package com.crawler.jd.service;

import com.crawler.jd.domain.items.JdItem;

import java.io.IOException;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/6/1 8:54
 * Description:
 */
public interface MiaoShaStarted {
    void itemStarted(JdItem item) throws IOException, Exception;
}
