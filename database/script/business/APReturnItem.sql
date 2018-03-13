
CREATE TABLE `APReturnItem` (
  
  `id` binary(17) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user` binary(17) DEFAULT NULL,

  `metadata` JSON DEFAULT NULL ,
  `note` varchar(255) DEFAULT NULL,
  `checksum` binary(16) DEFAULT NULL,

  `docdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ref` varchar(20) DEFAULT NULL,
  `reftype` varchar(20) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  
  `business` binary(17) NOT NULL,
  `branch` binary(17) DEFAULT NULL,
  `store` binary(17) DEFAULT NULL,
  `warehouse` binary(17) DEFAULT NULL,
  `vendor` binary(17) DEFAULT NULL,
  
  `apreturn` binary(17) DEFAULT NULL,
  `aporder` binary(17) DEFAULT NULL,
  `aporderitem` binary(17) DEFAULT NULL,
  `apreceipt` binary(17) DEFAULT NULL,
  `apreceiptitem` binary(17) DEFAULT NULL,
  `apbill` binary(17) DEFAULT NULL,
  `apbillitem` binary(17) DEFAULT NULL,
  `icreceipt_old` binary(17) DEFAULT NULL,
  `icreceipt_olditem` varchar(10) DEFAULT NULL,
  
  `item` binary(17) NOT NULL,
  `desc` varchar(10) DEFAULT NULL,
  `attr` JSON DEFAULT NULL ,
  `lot` varchar(50) DEFAULT NULL,
  `UOM` varchar(8) NOT NULL DEFAULT 'BASE',
  
  `qty` decimal(15,8) NOT NULL,
  `unitprice` decimal(15,8) NOT NULL,
  `discamt` decimal(15,8) DEFAULT NULL,
  `VATpct`tinyint(4) DEFAULT NULL,
  `VATamt` decimal(15,8) DEFAULT NULL,
  `amount` decimal(15,8) NOT NULL,

  `receiptinfo` JSON DEFAULT NULL,
  `billinfo` JSON DEFAULT NULL,

  `apdebitadjust` binary(17) DEFAULT NULL,

  `icissue` binary(17) DEFAULT NULL,
  `icissueitem` varchar(10) DEFAULT NULL,

  PRIMARY KEY (`id`),
  INDEX `ID_INDEX`(`business` ASC,`apreturn` ASC,`id` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;