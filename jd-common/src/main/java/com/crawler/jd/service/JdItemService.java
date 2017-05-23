package com.crawler.jd.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.crawler.jd.JdConfig;
import com.crawler.jd.common.JdItemFilter;
import com.crawler.jd.domain.JdGroup;
import com.crawler.jd.domain.items.JdItem;
import com.crawler.jd.http.JdHttpUtil;
import okhttp3.HttpUrl;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.*;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/5/12 13:12
 * Description:
 */
public class JdItemService {
    private static long parseMiaoShaItems(Long gid, List<JdItem> jdItemList, Map<Long, JdGroup> groups) throws IOException {
        String url = JdConfig.MIAO_SHA_DATA_API.getUrl();
        HttpUrl httpUrl = HttpUrl.parse(url);
        HttpUrl.Builder builder = httpUrl.newBuilder()
                .addQueryParameter("_", new Date().getTime() + "");
        if (gid != null) {
            builder.addQueryParameter("gid", gid + "");
        }
        httpUrl = builder.build();
        String content = JdHttpUtil.get(httpUrl.toString());
        String json = JdHttpUtil.parseJqueryJson(content);
        JSONObject jsonObject = JSONObject.parseObject(json);

        JSONArray miaoShaList = jsonObject.getJSONArray("miaoShaList");
        for (int i = 0; i < miaoShaList.size(); i++) {
            JSONObject jsonItem = miaoShaList.getJSONObject(i);
            JdItem jdItem = new JdItem();
            jdItem.setId(jsonItem.getString("wareId"));
            jdItem.setImg("http:" + jsonItem.getString("imageurl"));
            jdItem.setName(jsonItem.getString("wname"));
            jdItem.setRate(jsonItem.getString("rate"));
            jdItem.setDiscount(jsonItem.getString("discount"));
            long startTimeMills = jsonItem.getLong("startTimeMills");
            jdItem.setMiaoShaStartTime(new Date(startTimeMills));
            jdItem.setStartRemainTime(jsonItem.getLong("startRemainTime"));
            jdItem.setEndRemainTime(jsonItem.getLong("endRemainTime"));
            String miaoShaPrice = jsonItem.getString("miaoShaPrice");
            String jdPrice = jsonItem.getString("jdPrice");
            jdItem.setOriginalPrice(Double.parseDouble(jdPrice));
            jdItem.setRealPrice(Double.parseDouble(miaoShaPrice));
            jdItemList.add(jdItem);
        }
        if (groups != null) {
            JSONArray miaoGroups = jsonObject.getJSONArray("groups");
            for (int i = 0; i < miaoGroups.size(); i++) {
                JSONObject group = miaoGroups.getJSONObject(i);
                long id = group.getInteger("gid");
                if (groups.containsKey(id)) {
                    continue;
                }
                JdGroup jdGroup = new JdGroup();
                jdGroup.setGid(id);
                jdGroup.setName(group.getString("name"));
                long startTimeMills = group.getLong("startTimeMills");
                jdGroup.setStartTime(new Date(startTimeMills));
                groups.put(id, jdGroup);
            }
        }

        String dataGid = jsonObject.getString("gid");
        return Long.parseLong(dataGid);
    }

    public static Map<Long, JdGroup> getAllMiaoSha() throws IOException {
        Map<Long, JdGroup> groups = new HashMap<>();
        List<JdItem> jdItemList = new ArrayList<>();
        long gid = parseMiaoShaItems(null, jdItemList, groups);
        groups.get(gid).setItemList(jdItemList);
        Set<Long> ids = groups.keySet();
        for (Long id : ids) {
            if (id.equals(gid)) {
                continue;
            }
            List<JdItem> itemList = new ArrayList<>();
            parseMiaoShaItems(id, itemList, null);
            groups.get(id).setItemList(itemList);
        }
        return groups;
    }

    public static Map<Long, JdGroup> filterItems(Map<Long, JdGroup> groups, JdItemFilter filter) {
        Map<Long, JdGroup> highValueMap = new HashMap<>();
        for (Map.Entry<Long, JdGroup> entry : groups.entrySet()) {
            Long gid = entry.getKey();
            JdGroup group = entry.getValue();
            List<JdItem> items = group.getItemList();
            if (items == null || items.size() == 0) {
                continue;
            }
            List<JdItem> highValueItems = new ArrayList<>();
            for (JdItem item : items) {
                if (filter.filter(group,item)) {
                    highValueItems.add(copy(item, JdItem.class));
                }
            }
            if (highValueItems.size() > 0) {
                group = copy(group, JdGroup.class);
                group.setItemList(highValueItems);
                highValueMap.put(gid, group);
            }
        }
        return highValueMap;
    }

    static <T> T copy(T src, Class<T> tClass) {
        return JSONObject.parseObject(JSONObject.toJSONString(src), tClass);
    }


    public static boolean canBuyWithMiaoShaPrice(JdItem item) throws IOException {
        if(!item.canMiaoSha()){
            return false;
        }
        String url=String.format("http://item.jd.com/%s.html",item.getId());
        String html=JdHttpUtil.get(url);
        Document doc = Jsoup.parse(html);
        Elements priceHtml = doc.select("div.summary-price-wrap div.summary-price div.dt");
        String name=priceHtml.html();
        if("秒 杀 价".equals(name)){
            return true;
        }
        return false;
    }
}
