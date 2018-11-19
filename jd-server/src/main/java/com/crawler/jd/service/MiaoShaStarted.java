package com.crawler.jd.service;

import com.crawler.jd.domain.items.JdItem;

import java.io.IOException;

/**
 * Author     : zh79325@163.com
 * Copyright  :
 * Company    :
 * Create at  : 2017/6/1 8:54
 * Description:
 */
public interface MiaoShaStarted {
    void itemStarted(JdItem item) throws IOException, Exception;
}
