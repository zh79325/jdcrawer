package com.crawler.jd.controllers.resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/5/14 14:08
 * Description:
 */
@Controller
public class IndexController {
    @RequestMapping("/")
    String home() {
        return "index.html";
    }
}
