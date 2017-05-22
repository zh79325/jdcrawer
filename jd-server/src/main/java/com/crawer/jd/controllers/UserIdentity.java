package com.crawer.jd.controllers;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/5/21 12:49
 * Description:
 */
public class UserIdentity {
    String identity;
    boolean logInSuccess;

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
