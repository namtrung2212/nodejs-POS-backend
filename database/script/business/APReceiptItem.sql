
CREATE TABLE `APReceiptItem` (
  
  `id` binary(18) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `docdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user` binary(18) NOT NULL,
  `username` varchar(255) DEFAULT NULL,

  `ref` varchar(20) DEFAULT NULL,
  `reftype` varchar(20) DEFAULT NULL,
  `released` tinyint(1) NOT NULL DEFAULT '0',
  `status` varchar(20) DEFAULT NULL,
  
  `business` binary(18) NOT NULL,
  `branch` binary(18) DEFAULT NULL,
  `branchno` varchar(100) DEFAULT NULL,
  `store` binary(18) DEFAULT NULL,
  `storeno` varchar(100) DEFAULT NULL,
  `storecell` binary(18) DEFAULT NULL,
  `storecellno` varchar(100) DEFAULT NULL,
  `warehouse` binary(18) DEFAULT NULL,
  `warehouseno` varchar(100) DEFAULT NULL,
  
  `ap_order` binary(18) DEFAULT NULL,
  `ap_orderno` varchar(10) DEFAULT NULL,
  `ap_orderitem` binary(18) DEFAULT NULL,
  `ap_receipt` binary(18) DEFAULT NULL,
  `ap_receiptno` varchar(10) DEFAULT NULL,
  `ap_bill` binary(18) DEFAULT NULL,
  `ap_billno` varchar(10) DEFAULT NULL,
  `ap_billitem` binary(18) DEFAULT NULL,
  `ic_receipt` binary(18) DEFAULT NULL,
  `ic_receiptno` varchar(10) DEFAULT NULL,
  `ic_receiptitem` varchar(10) DEFAULT NULL,

  `phonenum` varchar(20) DEFAULT NULL,
  `vendor` binary(18) DEFAULT NULL,
  `vendorname` varchar(255) DEFAULT NULL,
  
  `item` binary(18) NOT NULL,
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
  `unitprice` decimal(15,8) NOT NULL,
  `discpct`tinyint(4) DEFAULT NULL,
  `discamt` decimal(15,8) DEFAULT NULL,
  `VATpct`tinyint(4) DEFAULT NULL,
  `VATamt` decimal(15,8) DEFAULT NULL,
  `amount` decimal(15,8) NOT NULL,

  `receiptinfo` JSON DEFAULT NULL,
  `billinfo` JSON DEFAULT NULL,

  `checksum` bigint(20) NOT NULL,

  PRIMARY KEY (`id`),
  INDEX `SEARCH_INDEX_1`(`business` ASC,`created_at` ASC),
  INDEX `SEARCH_INDEX_2`(`user` ASC,`created_at` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;