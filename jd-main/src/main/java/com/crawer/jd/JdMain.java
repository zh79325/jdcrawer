package com.crawer.jd;

import com.crawer.jd.domain.JdGroup;
import com.crawer.jd.domain.items.ItemNotStartFilter;
import com.crawer.jd.domain.items.JdItem;
import com.crawer.jd.service.JdItemService;

import java.io.IOException;
import java.util.Map;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/5/11 17:40
 * Description:
 */
public class JdMain {

    public static void main(String[] args) throws IOException {

        JdUser jdUser = new JdUser();
        jdUser.logIn("aaaa","bbbb");


        Map<Long, JdGroup> groups = JdItemService.getAllMiaoSha();

        groups = JdItemService.filterItems(groups, new ItemNotStartFilter());

//        groups = JdItemService.filterItems(groups, new ItemValueFilter());
        JdItem buyItem=null;
        for (Map.Entry<Long, JdGroup> entry : groups.entrySet()) {
            for (JdItem item : entry.getValue().getItemList()) {
                if(!"2978987".equals(item.getId())){
                    continue;
                }
                if(JdItemService.canBuy(item)&&"2978987".equals(item.getId())){
                    System.out.println(String.format("%s(%f/%f) %s => %s",
                            item.getName(),
                            item.getRealPrice(),
                            item.getOriginalPrice(),
                            item.getDiscount(),
                            item.getItemUrl()));
                    buyItem=item;
                    break;
                }
                if(buyItem!=null){
                    break;
                }

            }
        }

//        JdUser jdUser = new JdUser();
//        jdUser.logIn();
//        jdUser.miaoSha(buyItem);



    }
}
