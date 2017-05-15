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


# Reference
## Back End
### Spring-boot

## Front End
### react-bootstrap
https://react-bootstrap.github.io/getting-started.html


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

