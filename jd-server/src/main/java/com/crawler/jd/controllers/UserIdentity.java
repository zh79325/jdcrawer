package com.crawler.jd.controllers;

import com.crawler.jd.JdUser;

/**
 * Author     : zh79325@163.com
 * Copyright  :
 * Company    :
 * Create at  : 2017/5/21 12:49
 * Description:
 */
public class UserIdentity {
    String identity;
    boolean logInSuccess;
    private String nickName;
    private String imgUrl;
    private String userId;

    public UserIdentity(){

    }

    public UserIdentity(JdUser user){
        identity=user.getIdentity();
        logInSuccess=user.isLoginSuccess();
        nickName=user.getNickName();
        imgUrl=user.getImgUrl();
        userId=user.getUserId();
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public boolean isLogInSuccess() {
        return logInSuccess;
    }

    public void setLogInSuccess(boolean logInSuccess) {
        this.logInSuccess = logInSuccess;
    }

    public String getIdentity() {
        return identity;
    }

    public void setIdentity(String identity) {
        this.identity = identity;
    }
}
