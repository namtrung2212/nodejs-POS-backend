
CREATE TABLE `APPaymentItem` (

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
  `storecell` binary(17) DEFAULT NULL,
  `storecellno` varchar(100) DEFAULT NULL,
  
  `ap_payment` binary(17) NOT NULL,
  `ap_paymentno` varchar(10) DEFAULT NULL,
  `ap_bill` binary(17) DEFAULT NULL,
  `ap_billno` varchar(10) DEFAULT NULL,
  `ap_creditadjust` binary(17) DEFAULT NULL,
  `ap_creditadjustno` varchar(10) DEFAULT NULL,
  `ap_order` binary(17) DEFAULT NULL,
  `ap_orderno` varchar(10) DEFAULT NULL,

  `phonenum` varchar(20) DEFAULT NULL,
  `vendor` binary(17) DEFAULT NULL,
  `vendorname` varchar(255) DEFAULT NULL,
  
  `docamt` decimal(15,8) NOT NULL,
  `applied` decimal(15,8) NOT NULL,

  `checksum` binary(20) NOT NULL,

  PRIMARY KEY (`id`),
  INDEX `SEARCH_INDEX_1`(`business` ASC,`created_at` ASC),
  INDEX `SEARCH_INDEX_2`(`user` ASC,`created_at` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;