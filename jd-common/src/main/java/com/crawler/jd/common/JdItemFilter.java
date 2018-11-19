package com.crawler.jd.common;

import com.crawler.jd.domain.JdGroup;
import com.crawler.jd.domain.items.JdItem;

/**
 * Author     : zh79325@163.com
 * Copyright  :
 * Company    :
 * Create at  : 2017/5/12 14:42
 * Description:
 */
public interface JdItemFilter {

    boolean filter(JdGroup group, JdItem item);
}
