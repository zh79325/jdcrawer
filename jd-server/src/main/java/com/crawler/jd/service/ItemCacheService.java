package com.crawler.jd.service;

import com.crawler.jd.domain.JdGroup;
import com.crawler.jd.domain.items.JdItem;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/5/21 14:06
 * Description:
 */
@Service
public class ItemCacheService {
    List<JdGroup> groups = null;
    Map<String, JdItem> itemMap = new HashMap<>();

    public List<JdGroup> items() throws IOException {
        if (groups != null) {
            return groups;
        }
        return refresh();
    }

    public List<JdGroup> refresh() throws IOException {
        List<JdGroup> groupItems = new ArrayList<>(JdItemService.getAllMiaoSha().values());
        Collections.sort(groupItems, new Comparator<JdGroup>() {
            @Override
            public int compare(JdGroup o1, JdGroup o2) {
                return o1.getStartTime().compareTo(o2.getStartTime());
            }
        });
        groups = groupItems;
        for (JdGroup group : groups) {
            for (JdItem item : group.getItemList()) {
                itemMap.put(item.getId(), item);
            }
        }
        return groups;
    }

    public JdItem getById(String id) {
        return itemMap.get(id);
    }


}
