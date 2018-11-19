package com.crawler.jd;

import com.crawler.jd.domain.JdGroup;
import com.crawler.jd.domain.items.ItemNotStartFilter;
import com.crawler.jd.domain.items.JdItem;
import com.crawler.jd.service.JdItemService;

import javax.script.ScriptException;
import java.io.IOException;
import java.util.Map;

/**
 * Author     : zh79325@163.com
 * Copyright  :
 * Company    :
 * Create at  : 2017/5/11 17:40
 * Description:
 */
public class JdMain {

    public static void main(String[] args) throws IOException, ScriptException, NoSuchMethodException {

        JdUser jdUser = new JdUser();
        jdUser.loadLogInQrCode();

        if (1 == 1) {
            return;
        }
        Map<Long, JdGroup> groups = JdItemService.getAllMiaoSha();

        groups = JdItemService.filterItems(groups, new ItemNotStartFilter());

        JdItem buyItem = null;
        for (Map.Entry<Long, JdGroup> entry : groups.entrySet()) {
            for (JdItem item : entry.getValue().getItemList()) {
                if (!"2978987".equals(item.getId())) {
                    continue;
                }
                if (JdItemService.canBuyWithMiaoShaPrice(item) && "2978987".equals(item.getId())) {
                    System.out.println(String.format("%s(%f/%f) %s => %s",
                            item.getName(),
                            item.getRealPrice(),
                            item.getOriginalPrice(),
                            item.getDiscount(),
                            item.getItemUrl()));
                    buyItem = item;
                    break;
                }
                if (buyItem != null) {
                    break;
                }

            }
        }


    }
}
