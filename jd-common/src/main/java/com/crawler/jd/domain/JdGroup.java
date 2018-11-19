package com.crawler.jd.domain;

import com.crawler.jd.domain.items.JdItem;

import java.util.Date;
import java.util.List;

/**
 * Author     : zh79325@163.com
 * Copyright  :
 * Company    :
 * Create at  : 2017/5/12 13:37
 * Description:
 */
public class JdGroup {

    long gid;
    String name;
    Date startTime;

    List<JdItem> itemList;

    public List<JdItem> getItemList() {
        return itemList;
    }

    public void setItemList(List<JdItem> itemList) {
        this.itemList = itemList;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public long getGid() {
        return gid;
    }

    public void setGid(long gid) {
        this.gid = gid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
