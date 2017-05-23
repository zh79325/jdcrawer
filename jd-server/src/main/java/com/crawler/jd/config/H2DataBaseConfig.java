package com.crawler.jd.config;

import com.alibaba.druid.pool.DruidDataSourceFactory;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import javax.sql.DataSource;
import java.util.Properties;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/5/19 18:11
 * Description:
 */
@Configuration
@MapperScan("com.crawler.jd.db.h2")
public class H2DataBaseConfig {
    @Autowired
    private Environment env;

    @Bean
    @Primary
    public DataSource h2DataSource() throws Exception {
        Properties props = new Properties();
        props.put("driverClassName", "org.h2.Driver");
        props.put("url", env.getProperty("jdbc.datasource.url"));
        props.put("username", env.getProperty("jdbc.datasource.username"));
        props.put("password", env.getProperty("jdbc.datasource.password"));
        return DruidDataSourceFactory.createDataSource(props);
    }


    @Bean
    public SqlSessionFactory sqlSessionFactory(DataSource ds) throws Exception {
        SqlSessionFactoryBean fb = new SqlSessionFactoryBean();
        fb.setDataSource(ds);// 指定数据源(这个必须有，否则报错)
        fb.setTypeAliasesPackage("com.crawer.jd");// 指定基包
        fb.setMapperLocations(
                new PathMatchingResourcePatternResolver().getResources("classpath:*.xml"));
        return fb.getObject();

    }

    @Autowired
    public DataSourceTransactionManager transactionManager(DataSource dataSource) throws Exception {
        return new DataSourceTransactionManager(dataSource);
    }

}
