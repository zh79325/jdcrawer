package com.crawer.jd.common;

import com.crawer.jd.domain.JdGroup;
import com.crawer.jd.domain.items.JdItem;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/5/12 14:42
 * Description:
 */
public interface JdItemFilter {

    boolean filter(JdGroup group, JdItem item);
}
