package com.crawer.jd.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/5/14 14:28
 * Description:
 */
@RestController
public class DataApi {
    @RequestMapping("/")
    String home() {
        return "index.html";
    }
}
