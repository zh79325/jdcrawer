package com.crawer.jd.controllers;

import com.crawer.jd.db.h2.ItemDao;
import com.crawer.jd.domain.JdGroup;
import com.crawer.jd.service.JdItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.*;

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
    ItemDao itemDao;

    @RequestMapping(value = "/items",method = RequestMethod.GET)
    List< JdGroup> items() throws IOException {
        List< JdGroup> groupItems=new ArrayList<>(JdItemService.getAllMiaoSha().values()) ;
        Collections.sort(groupItems, new Comparator<JdGroup>() {
            @Override
            public int compare(JdGroup o1, JdGroup o2) {
                return o1.getStartTime().compareTo(o2.getStartTime());
            }
        });
        return groupItems;
    }
}
