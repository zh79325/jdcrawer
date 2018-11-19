package com.crawler.jd.domain.items;

import com.crawler.jd.common.JdItemFilter;
import com.crawler.jd.domain.JdGroup;

import java.util.Date;

/**
 * Author     : zh79325@163.com
 * Copyright  :
 * Company    :
 * Create at  : 2017/5/12 14:47
 * Description:
 */
public class ItemNotStartFilter implements JdItemFilter {
    @Override
    public boolean filter(JdGroup group, JdItem item) {
        return !item.getMiaoShaStartTime().after(new Date());
    }
}
