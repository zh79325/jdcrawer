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


