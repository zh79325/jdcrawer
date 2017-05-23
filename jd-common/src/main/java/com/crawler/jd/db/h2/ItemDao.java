package com.crawler.jd.db.h2;

import com.crawler.jd.domain.items.JdItem;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/5/19 18:03
 * Description:
 */
public interface ItemDao {
    int insert(JdItem item);
}
