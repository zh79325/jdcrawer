package com.crawer.jd.controllers;

import com.crawer.jd.domain.JdGroup;
import com.crawer.jd.domain.items.JdItem;
import com.crawer.jd.service.ItemCacheService;
import com.crawer.jd.service.JdUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/5/21 9:03
 * Description:
 */
@RestController
public class JdItemController {
    @Autowired
    ItemCacheService itemCacheService;

    @Autowired
    JdUserService userService;

    @RequestMapping(value = "/items", method = RequestMethod.GET)
    public List<JdGroup> items() throws IOException {

        return itemCacheService.items();
    }

    @RequestMapping(value = "/refresh", method = RequestMethod.POST)
    public List<JdGroup> refresh() throws IOException {
        return itemCacheService.refresh();
    }

    @RequestMapping(value = "/buy/{itemId}", method = RequestMethod.POST)
    public JdItem buy(@PathVariable("itemId") String itemId) throws IOException {
        JdItem item = itemCacheService.getById(itemId);
        userService.buy(item);
        return item;
    }
}
