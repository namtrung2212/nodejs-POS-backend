
CREATE TABLE `APPayment` (

  `id` binary(18) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `docdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user` binary(18) NOT NULL,
  `username` varchar(255) DEFAULT NULL,

  `paymentno` varchar(10) DEFAULT NULL,
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

  `phonenum` varchar(20) DEFAULT NULL,
  `vendor` binary(18) DEFAULT NULL,
  `vendorname` varchar(255) DEFAULT NULL,
  
  `ca_account` binary(18) DEFAULT NULL,
  `ca_accountno` varchar(10) DEFAULT NULL,
  `paymethod` varchar(10) DEFAULT NULL,
  `paytran` varchar(60) DEFAULT NULL, 
  `ven_cardno` varchar(20) DEFAULT NULL,
  `ven_bank` varchar(255) DEFAULT NULL,
  `ven_bankstate` varchar(255) DEFAULT NULL,
  `ven_bankbranch` varchar(255) DEFAULT NULL,
  `ven_bankacc` varchar(255) DEFAULT NULL,
  `ven_bankacc_owner` varchar(255) DEFAULT NULL,
  
  `amount` decimal(15,8) NOT NULL,
  `applied` decimal(15,8) NOT NULL,
  `remain` decimal(15,8) NOT NULL,
  
  `pre_record` binary(18) DEFAULT NULL,
  `pre_hashed` bigint(20) DEFAULT NULL,
  `venbal_befor` decimal(15,8) DEFAULT NULL,
  `venbal_after` decimal(15,8) DEFAULT NULL,
  `checksum` bigint(20) NOT NULL,

  PRIMARY KEY (`id`),
  INDEX `SEARCH_INDEX_1`(`business` ASC,`created_at` ASC),
  INDEX `SEARCH_INDEX_2`(`user` ASC,`created_at` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;