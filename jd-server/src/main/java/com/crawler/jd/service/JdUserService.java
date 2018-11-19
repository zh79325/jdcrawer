package com.crawler.jd.service;

import com.crawler.jd.JdUser;
import com.crawler.jd.UserLoginCallBack;
import com.crawler.jd.domain.items.JdItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.script.ScriptException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Author     : zh79325@163.com
 * Copyright  :
 * Company    :
 * Create at  : 2017/5/21 12:34
 * Description:
 */
@Service
public class JdUserService {

    Map<String, JdUser> userMap = new HashMap<>();

    public JdUser getNewUser() {
        JdUser user = new JdUser();
        userMap.put(user.getIdentity(), user);
        return user;
    }

    @Autowired
    void  init(){
        new Thread(new Runnable() {
            @Override
            public void run() {
                while (true){
                    List<JdUser> userList=loggedUsers();
                    for (JdUser user : userList) {
                        try{
                            user.heartBeat();
                        }catch (Exception ex){
                            ex.printStackTrace();
                        }

                    }

                    try {
                        Thread.sleep(1000*30);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        }).start();
    }

    public List<JdUser> loggedUsers(){
        List<JdUser> users=new ArrayList<>();
        for (Map.Entry<String, JdUser> entry : userMap.entrySet()) {
            JdUser user=entry.getValue();
            if(user.isLoginSuccess()){
                users.add(user);
            }
        }
        return users;
    }
    public JdUser getByKey(String key) {
        return userMap.get(key);
    }

    public JdUser loginByQrCode(String key) throws IOException, ScriptException, NoSuchMethodException {
        final JdUser user = getByKey(key);
        user.loadLogInQrCode();
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    user.waitToScanQrCode(new UserLoginCallBack() {
                        @Override
                        public void logInResult(boolean success) {
                            if (!success) {
                                userMap.remove(user.getIdentity());
                                System.out.println("登录失败");
                            } else {
                                System.out.println("登录成功");
                            }
                        }
                    });
                } catch (IOException e) {
                    userMap.remove(user.getIdentity());
                }
            }
        }).start();
        return user;
    }


    public JdItem buy(JdItem item) throws IOException {
//        if(!JdItemService.canBuyWithMiaoShaPrice(item)){
//            return null;
//        }
        for (Map.Entry<String, JdUser> entry : userMap.entrySet()) {
            JdUser user=entry.getValue();
            if(user.isLoginSuccess()){
                user.buy(item);
            }
        }
        return item;
    }
}
