package com.crawler.jd.domain.items;

import java.util.Date;

/**
 * Author     : zh79325@163.com
 * Copyright  :
 * Company    :
 * Create at  : 2017/5/12 13:07
 * Description:
 */
public class JdItem {
    String id;
    String name;
    String img;
    double originalPrice;
    double realPrice;
    Date miaoShaStartTime;
    long startRemainTime;
    long endRemainTime;
    private String rate;
    private String discount;

    public long getStartRemainTime() {
        return startRemainTime;
    }

    public void setStartRemainTime(long startRemainTime) {
        this.startRemainTime = startRemainTime;
    }

    public long getEndRemainTime() {
        return endRemainTime;
    }

    public void setEndRemainTime(long endRemainTime) {
        this.endRemainTime = endRemainTime;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public double getOriginalPrice() {
        return originalPrice;
    }

    public void setOriginalPrice(double originalPrice) {
        this.originalPrice = originalPrice;
    }

    public double getRealPrice() {
        return realPrice;
    }

    public void setRealPrice(double realPrice) {
        this.realPrice = realPrice;
    }

    public Date getMiaoShaStartTime() {
        return miaoShaStartTime;
    }

    public void setMiaoShaStartTime(Date miaoShaStartTime) {
        this.miaoShaStartTime = miaoShaStartTime;
    }

    public void setRate(String rate) {
        this.rate = rate;
    }

    public String getRate() {
        return rate;
    }

    public void setDiscount(String discount) {
        this.discount = discount;
    }

    public String getDiscount() {
        return discount;
    }

    public String getItemUrl(){
        String url=String.format("http://item.jd.com/%s.html",getId());
        return url;
    }

    public double getRateNum(){
        double rateNum=1000;
        try{
            rateNum=Double.parseDouble(rate.split("折")[0]);
        }catch (Exception ex){

        }
        return rateNum;
    }

    public boolean canMiaoSha() {
        Date now=new Date();
        long time=miaoShaStartTime.getTime()-now.getTime();
        return time<1000*10;
    }
}
