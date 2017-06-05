package com.crawler.proxy;

import org.apache.commons.collections4.ListUtils;
import org.apache.commons.lang3.RandomUtils;

import java.io.IOException;
import java.net.Proxy;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/6/4 15:18
 * Description:
 */
public class ProxyTool {


    static Map<String, ProxyServer> serverMap = new ConcurrentHashMap<>();
    static Map<String, ProxyServer> aliveServerMap = new ConcurrentHashMap<>();
    static class  WorkerThread implements  Runnable{
        List<String> ids;
        public WorkerThread(List<String> ids){
            this.ids=ids;
        }
        @Override
        public void run() {
            for (String id: ids) {
                ProxyServer server = serverMap.get(id);
                if (server.isChecked()) {
                    continue;
                }
                AllCheckedNum++;
                CurrentCheckNum++;
                server.setChecked(true);
                boolean alive = server.alive();
                server.setDead(!alive);
                if (alive) {
                    aliveServerMap.put(server.url(), server);
                }
                String progress = String.format("%d of %d checked => %d alive", AllCheckedNum, serverMap.size(), aliveServerMap.size());
                System.out.println(progress);
            }
        }
    }
    static int AllCheckedNum = 0;
    static int CurrentCheckNum = 0;
    static Thread aliveCheckThread = new Thread(new Runnable() {
        @Override
        public void run() {

            while (true) {

                CurrentCheckNum=0;
                int threadNum=20;
                ExecutorService executor = Executors.newFixedThreadPool(threadNum);
                List<String> ids=new ArrayList<>( serverMap.keySet());
                List<List<String>> output = ListUtils.partition(ids, 10);
                for (int i = 0; i < output.size(); i++) {
                    Runnable worker = new WorkerThread(output.get(i));
                    executor.execute(worker);
                }
                executor.shutdown();
                while (!executor.isTerminated()) {
                }
                if (CurrentCheckNum == 0) {
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    });

    static {
        aliveCheckThread.start();
    }


    public static Proxy randomProxyServer(){
        if(aliveServerMap.size()==0){
            return null;
        }
        int n=RandomUtils.nextInt(0,aliveServerMap.size());
        return aliveServerMap.values().toArray(new ProxyServer[]{})[n].proxy();
    }

    public static void main(String[] args) throws IOException {

        XiCiProxyUtil.startCrawler(false,serverMap);
        KuaiDailiUtil.startCrawler(false,serverMap);
        while (aliveServerMap.size()<0){
        }

    }
}
