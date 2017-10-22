

CREATE TABLE `APOrder` (
  
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

  `ap_receipt` binary(18) DEFAULT NULL,
  `ap_receiptno` varchar(10) DEFAULT NULL,
  `ap_bill` binary(18) DEFAULT NULL,
  `ap_billno` varchar(10) DEFAULT NULL,
  `ic_receipt` binary(18) DEFAULT NULL,
  `ic_receiptno` varchar(10) DEFAULT NULL,
  `ar_order` binary(18) DEFAULT NULL,
  `ar_orderno` varchar(10) DEFAULT NULL,

  `phonenum` varchar(20) DEFAULT NULL,
  `vendor` binary(18) DEFAULT NULL,
  `vendorname` varchar(255) DEFAULT NULL,
  
  `qty` decimal(15,8) DEFAULT NULL,
  `VATamt` decimal(15,8) DEFAULT NULL,
  `amount` decimal(15,8) DEFAULT NULL,

  `receiptable` tinyint(1) NOT NULL DEFAULT '1',
  `partial_receipt` tinyint(1) NOT NULL DEFAULT '0',
  `receiptinfo` JSON DEFAULT NULL,
  `receipting` decimal(15,8) DEFAULT NULL,
  `receipted` decimal(15,8) DEFAULT NULL,
  `receipt_remain` decimal(15,8) DEFAULT NULL,

  `billinfo` JSON DEFAULT NULL,
  `billing` decimal(15,8) DEFAULT NULL,
  `billing_amt` decimal(15,8) DEFAULT NULL,
  `billed` decimal(15,8) DEFAULT NULL,
  `billed_amt` decimal(15,8) DEFAULT NULL,
  `bill_remain` decimal(15,8) DEFAULT NULL,
  `bill_remain_amt` decimal(15,8) DEFAULT NULL,
  
  `returned` decimal(15,8) DEFAULT NULL,
  `warrantied` decimal(15,8) DEFAULT NULL,
  
  `checksum` bigint(20) NOT NULL,

  PRIMARY KEY (`id`),
  INDEX `SEARCH_INDEX_1`(`business` ASC,`created_at` ASC),
  INDEX `SEARCH_INDEX_2`(`user` ASC,`created_at` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;