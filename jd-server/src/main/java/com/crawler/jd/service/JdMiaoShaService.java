package com.crawler.jd.service;

import com.crawler.jd.domain.items.JdItem;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/6/1 8:52
 * Description:
 */
@Service
public class JdMiaoShaService {
    Map<String, JdItem> itemMap = new HashMap<>();
    Map<String, MiaoShaStarted> startedMap = new HashMap<>();

    @PostConstruct
    void init() {
        new Thread(new Runnable() {
            @Override
            public void run() {
                while (true) {
                    if (itemMap.size() == 0) {
                        try {
                            Thread.sleep(100);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                    Iterator<Map.Entry<String, JdItem>> it = itemMap.entrySet().iterator();
                    while (it.hasNext()) {
                        try {
                            Map.Entry<String, JdItem> entry = it.next();
                            String id = entry.getKey();
                            JdItem item = entry.getValue();
                            if (JdItemService.canBuyWithMiaoShaPrice(item)) {
                                MiaoShaStarted started = startedMap.get(id);
                                if (started != null) {
                                    invokeStarted(started, item);
                                }
                                it.remove();
                                startedMap.remove(id);
                            }
                            Thread.sleep(100);
                        } catch (Exception ex) {
                            try {
                                Thread.sleep(100);
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                        }

                    }
                }
            }
        })
                .start();
    }

    private void invokeStarted(final MiaoShaStarted started, final JdItem item) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    started.itemStarted(item);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }

    public boolean addToMiaoShaList(JdItem jdItem, MiaoShaStarted started) {
        String id = jdItem.getId();
        if (itemMap.containsKey(id)) {
            return false;
        }
        itemMap.put(id, jdItem);
        startedMap.put(id, started);
        return true;
    }
}
