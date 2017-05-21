CREATE TABLE `jd_item` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `productCode` varchar(255) DEFAULT NULL COMMENT 'productCode',
  `productName` varchar(255) DEFAULT NULL COMMENT 'productName',
  `appId` varchar(255) DEFAULT NULL COMMENT 'appId',
  `grayKey` varchar(255) DEFAULT NULL COMMENT 'grayKey',
  `packageType` varchar(255) DEFAULT NULL COMMENT 'packageType',
  `env` varchar(255) DEFAULT NULL COMMENT 'env',
  `name` bigint(20) DEFAULT NULL COMMENT 'envId',
  PRIMARY KEY (`Id`)
)