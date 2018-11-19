package com.crawler.jd.controllers.resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Author     : zh79325@163.com
 * Copyright  :
 * Company    :
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
