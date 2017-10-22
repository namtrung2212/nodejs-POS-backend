
CREATE TABLE `ICReceipt` (
  
  `id` binary(18) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `docdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user` binary(18) NOT NULL,
  `username` varchar(255) DEFAULT NULL,

  `receiptno` varchar(100) DEFAULT NULL,
  `ref` varchar(20) DEFAULT NULL,
  `reftype` varchar(20) DEFAULT NULL,
  `released` tinyint(1) NOT NULL DEFAULT '0',
  `status` varchar(20) DEFAULT NULL,
  `glposted` tinyint(1) NOT NULL DEFAULT '0',
  `glperiod` varchar(10) DEFAULT NULL,
  `glvoucher` binary(18) DEFAULT NULL,
  `glvoucherno` varchar(100) DEFAULT NULL,

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
  `ap_receipt` binary(18) DEFAULT NULL,
  `ap_receiptno` varchar(10) DEFAULT NULL,
  `ap_bill` binary(18) DEFAULT NULL,
  `ap_billno` varchar(10) DEFAULT NULL,

  `ar_return` binary(18) DEFAULT NULL,
  `ar_returnno` varchar(10) DEFAULT NULL,
  `ar_order` binary(18) DEFAULT NULL,
  `ar_orderno` varchar(10) DEFAULT NULL,
  `ar_invoice` binary(18) DEFAULT NULL,
  `ar_invoiceno` varchar(10) DEFAULT NULL,


  `qty` decimal(15,8) NOT NULL,
  `valuation` decimal(15,8) NOT NULL,
  
  `checksum` bigint(20) NOT NULL,

  PRIMARY KEY (`id`),
  INDEX `SEARCH_INDEX_1`(`business` ASC,`created_at` ASC),
  INDEX `SEARCH_INDEX_2`(`user` ASC,`created_at` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;