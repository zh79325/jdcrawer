package com.crawler.jd.controllers;

import com.crawler.jd.db.h2.ItemDao;
import com.crawler.jd.domain.items.JdItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Author     : zh79325@163.com
 * Copyright  :
 * Company    :
 * Create at  : 2017/5/14 14:28
 * Description:
 */
@RestController
public class DataApi {
    @Autowired
    ItemDao itemDao;
    @RequestMapping("/")
    String home() {
        itemDao.insert(new JdItem());
        return "index.html";
    }
}
