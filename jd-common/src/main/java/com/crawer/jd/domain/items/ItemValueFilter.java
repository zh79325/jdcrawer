package com.crawer.jd.domain.items;

import com.crawer.jd.common.JdItemFilter;
import com.crawer.jd.domain.JdGroup;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/5/12 14:45
 * Description:
 */
public class ItemValueFilter implements JdItemFilter {
    static final double MIAO_SHA_MIN_PRICE = 1;
    static final double ORIGINAL_MIN_PRICE = 50;


    @Override
    public boolean filter(JdGroup group, JdItem item) {
        double o = item.getOriginalPrice();
        double p = item.getRealPrice();
        return o >= ORIGINAL_MIN_PRICE && p <= MIAO_SHA_MIN_PRICE;
    }
}
