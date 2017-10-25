
CREATE TABLE `ICTransferItem` (
  
  `id` binary(17) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `docdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user` binary(17) NOT NULL,
  `username` varchar(255) DEFAULT NULL,

  `ref` varchar(20) DEFAULT NULL,
  `reftype` varchar(20) DEFAULT NULL,
  `released` tinyint(1) NOT NULL DEFAULT '0',
  `status` varchar(20) DEFAULT NULL,
  `glposted` tinyint(1) NOT NULL DEFAULT '0',
  `glperiod` varchar(10) DEFAULT NULL,
  `glvoucher` binary(17) DEFAULT NULL,
  `glvoucherno` varchar(100) DEFAULT NULL,

  `business` binary(17) NOT NULL,
  `branch` binary(17) DEFAULT NULL,
  `branchno` varchar(100) DEFAULT NULL,
  `store` binary(17) DEFAULT NULL,
  `storeno` varchar(100) DEFAULT NULL,
  `from_warehouse` binary(17) DEFAULT NULL,
  `from_warehouseno` varchar(100) DEFAULT NULL,
  `to_warehouse` binary(17) DEFAULT NULL,
  `to_warehouseno` varchar(100) DEFAULT NULL,
  
  `item` binary(17) NOT NULL,
  `itemno` varchar(100) DEFAULT NULL,
  `itemdesc` varchar(10) DEFAULT NULL,
  `attr1` varchar(50) DEFAULT NULL,
  `attr2` varchar(50) DEFAULT NULL,
  `attr3` varchar(50) DEFAULT NULL,
  `attr4` varchar(50) DEFAULT NULL,
  `attr5` varchar(50) DEFAULT NULL,
  `lot` varchar(50) DEFAULT NULL,
  `UOM` varchar(8) NOT NULL DEFAULT 'BASE',
  `otherinfo` JSON DEFAULT NULL,
  `qty` decimal(15,8) NOT NULL,
  
  `checksum` binary(20) NOT NULL,

  PRIMARY KEY (`id`),
  INDEX `SEARCH_INDEX_1`(`business` ASC,`created_at` ASC),
  INDEX `SEARCH_INDEX_2`(`user` ASC,`created_at` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;