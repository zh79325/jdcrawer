package com.crawler.jd.controllers;

import com.crawler.jd.domain.JdGroup;
import com.crawler.jd.domain.items.JdItem;
import com.crawler.jd.service.ItemCacheService;
import com.crawler.jd.service.JdMiaoShaService;
import com.crawler.jd.service.JdUserService;
import com.crawler.jd.service.MiaoShaStarted;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

/**
 * Author     : zh79325@163.com
 * Copyright  :
 * Company    :
 * Create at  : 2017/5/21 9:03
 * Description:
 */
@RestController
public class JdItemController {
    @Autowired
    ItemCacheService itemCacheService;

    @Autowired
    JdUserService userService;


    @Autowired
    JdMiaoShaService miaoShaService;

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
    @RequestMapping(value = "/watch/{itemId}", method = RequestMethod.POST)
    public JdItem watch(@PathVariable("itemId") String itemId) throws IOException {
        JdItem item = itemCacheService.getById(itemId);
        miaoShaService.addToMiaoShaList(item, new MiaoShaStarted() {
            @Override
            public void itemStarted(JdItem item) throws Exception {
                userService.buy(item);
            }
        });
        return item;
    }

}
