package com.crawer.jd.controllers;

import com.crawer.jd.db.h2.ItemDao;
import com.crawer.jd.domain.items.JdItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
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
