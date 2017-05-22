package com.crawer.jd.controllers;

import com.crawer.jd.JdUser;
import com.crawer.jd.service.JdUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/5/21 12:32
 * Description:
 */
@RestController
public class JdUserController {
    @Autowired
    JdUserService userService;

    @RequestMapping(value = "/newLogIn", method = RequestMethod.GET)
    UserIdentity newUserLogIn() throws IOException {
        JdUser user = userService.getNewUser();
        user = userService.loginByQrCode(user.getIdentity());
        UserIdentity identity = new UserIdentity();
        identity.setIdentity(user.getIdentity());
        return identity;
    }

    @RequestMapping(value = "/userQrCode/{identity}", method = RequestMethod.GET)
    public void get(@PathVariable("identity") String identity, HttpServletResponse response) throws Exception {
        try {
            JdUser user = userService.getByKey(identity);
            BufferedImage bi = ImageIO.read(user.getQrCode());
            OutputStream out = response.getOutputStream();
            ImageIO.write(bi, "png", out);
            out.flush();
            out.close();
            return;
        } catch (Exception ex) {
        } finally {
        }

    }
}
