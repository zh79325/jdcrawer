package com.crawler.jd.domain.items;

import com.crawler.jd.common.JdItemFilter;
import com.crawler.jd.domain.JdGroup;

import java.util.Date;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/5/12 14:47
 * Description:
 */
public class ItemNotStartFilter implements JdItemFilter {
    @Override
    public boolean filter(JdGroup group, JdItem item) {
        return !item.getMiaoShaStartTime().after(new Date());
    }
}
