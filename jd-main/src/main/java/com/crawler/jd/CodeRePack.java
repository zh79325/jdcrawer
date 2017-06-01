package com.crawler.jd;

import com.alibaba.fastjson.JSONArray;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;

import java.io.*;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/6/1 16:35
 * Description:
 */
public class CodeRePack {
    public static void main(String[] args) throws IOException {
        File f = new File("d:\\Users\\zh_zhou\\Desktop\\jsFile.js");
        InputStream is = new FileInputStream(f);
        List<String> lines = IOUtils.readLines(is);
        is.close();

        String line1 = lines.get(0);
        line1 = line1.substring(line1.indexOf("["), line1.lastIndexOf("]") + 1);
        JSONArray params = JSONArray.parseArray(line1);
        Pattern p = Pattern.compile("_\\$_53a7\\[(\\d+?)\\]");

        File ofile = new File(f.getParent(), "jsFile.decrypt.js");
        if (ofile.exists()) {
            FileUtils.deleteQuietly(ofile);
        }
        ofile.createNewFile();
        OutputStream os = new FileOutputStream(ofile);

        for (int i = 1; i < lines.size(); i++) {
            String line = lines.get(i);
            Matcher matcher = p.matcher(line);
            while (matcher.find()) {
                String id = matcher.group(1);
                int index = Integer.parseInt(id);
                String word = params.getString(index);

                try {
                    boolean encode=false;
                    if(word.indexOf("$")>=0){
                        encode=true;
                        word=word.replaceAll("\\$","RDS_CHAR_DOLLAR");
                    }
                    line = matcher.replaceFirst("'" + word + "'");
                    if(encode){
                        line = line.replaceAll("RDS_CHAR_DOLLAR", "\\$");
                    }


                }catch (Exception e){
                    e.printStackTrace();
                }

                matcher.reset(line);
            }
            IOUtils.write(line+"\n", os);
        }
        os.close();


        System.out.println(line1);
    }
}
