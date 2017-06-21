# Crawer
 
## Version Update
### UpdateMajorVersion
```aidl
build-helper:parse-version versions:set -DnewVersion=${parsedVersion.nextMajorVersion}.0.0 versions:commit
```
### UpdateMinorVersion
```aidl
build-helper:parse-version versions:set -DnewVersion=${parsedVersion.majorVersion}.${parsedVersion.nextMinorVersion}.0 versions:commit
```
### UpdateNextIncrementalVersion
```aidl
build-helper:parse-version versions:set -DnewVersion=${parsedVersion.majorVersion}.${parsedVersion.minorVersion}.${parsedVersion.nextIncrementalVersion} versions:commit
```



# 开发工具列表
### Intellij
 ### 下载地址
 ```$xslt
 https://download.jetbrains.8686c.com/idea/ideaIU-2017.1.2.exe
 
 ```
 ### 学生免费账号注册
 ```$xslt
https://www.jetbrains.com/student/
```

### Atom
```$xslt
https://atom.io/
```

# 开发环境要求
### Java 1.8
```$xslt
http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
```
### Maven
### NodeJS



# 使用

# 环境要求
### Java 1.8
```$xslt
http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
```
### 执行命令
```$xslt
java -jar jd-serverxxx.jar
```
### 在浏览器输入 localhost:8080 即可访问


