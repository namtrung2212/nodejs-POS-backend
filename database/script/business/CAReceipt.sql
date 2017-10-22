
CREATE TABLE `CAReceipt` (

  `id` binary(18) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `docdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user` binary(18) NOT NULL,
  `username` varchar(255) DEFAULT NULL,

  `receiptno` varchar(10) DEFAULT NULL,
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

  `ca_account` binary(18) DEFAULT NULL,
  `ca_accountno` varchar(10) DEFAULT NULL,

  `ca_entrytype` binary(18) DEFAULT NULL,
  `ca_entrytypename` varchar(255) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,

  `employee` binary(18) DEFAULT NULL,
  `employeename` varchar(255) DEFAULT NULL,

  `paymethod` varchar(10) DEFAULT NULL,
  `paytran` varchar(60) DEFAULT NULL, 
  `cardno` varchar(20) DEFAULT NULL,
  `bankaccno` varchar(20) DEFAULT NULL,
  
  `amount` decimal(15,8) NOT NULL,

  `checksum` bigint(20) NOT NULL,

  PRIMARY KEY (`id`),
  INDEX `SEARCH_INDEX_1`(`business` ASC,`created_at` ASC),
  INDEX `SEARCH_INDEX_2`(`user` ASC,`created_at` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;