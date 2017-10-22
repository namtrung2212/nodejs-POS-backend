
CREATE TABLE `CATransfer` (

  `id` binary(18) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `docdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user` binary(18) NOT NULL,
  `username` varchar(255) DEFAULT NULL,

  `transferno` varchar(10) DEFAULT NULL,
  `ref` varchar(20) DEFAULT NULL,
  `reftype` varchar(20) DEFAULT NULL,
  `released` tinyint(1) NOT NULL DEFAULT '0',
  `status` varchar(20) DEFAULT NULL,
  `glposted` tinyint(1) NOT NULL DEFAULT '0',
  `glperiod` varchar(10) DEFAULT NULL,
  `glvoucher` binary(18) DEFAULT NULL,
  `glvoucherno` varchar(100) DEFAULT NULL,

  `business` binary(18) NOT NULL,

  `source_ca_account` binary(18) DEFAULT NULL,
  `source_ca_accountno` varchar(10) DEFAULT NULL,
  `source_amount` decimal(15,8) NOT NULL,
  `source_fee` decimal(15,8) NOT NULL,

  `dest_ca_account` binary(18) DEFAULT NULL,
  `dest_ca_accountno` varchar(10) DEFAULT NULL,
  `dest_amount` decimal(15,8) NOT NULL,
  `dest_fee` decimal(15,8) NOT NULL,
  `checksum` bigint(20) NOT NULL,

  PRIMARY KEY (`id`),
  INDEX `SEARCH_INDEX_1`(`business` ASC,`created_at` ASC),
  INDEX `SEARCH_INDEX_2`(`user` ASC,`created_at` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;