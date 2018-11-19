package com.crawler.jd.db.h2;

import com.crawler.jd.domain.items.JdItem;

/**
 * Author     : zh79325@163.com
 * Copyright  :
 * Company    :
 * Create at  : 2017/5/19 18:03
 * Description:
 */
public interface ItemDao {
    int insert(JdItem item);
}
