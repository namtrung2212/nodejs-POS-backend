
CREATE TABLE `CAReceipt` (

  `id` binary(17) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user` binary(17) DEFAULT NULL,

  `metadata` JSON DEFAULT NULL ,
  `note` varchar(255) DEFAULT NULL,
  `checksum` binary(16) DEFAULT NULL,

  `no` varchar(10) DEFAULT NULL,
  `docdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ref` varchar(20) DEFAULT NULL,
  `reftype` varchar(20) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `glperiod` varchar(10) DEFAULT NULL,
  `glvoucher` binary(17) DEFAULT NULL,

  `business` binary(17) NOT NULL,
  `branch` binary(17) DEFAULT NULL,
  `store` binary(17) DEFAULT NULL,
  `storecell` varchar(100) DEFAULT NULL,

  `caaccount` binary(17) DEFAULT NULL,

  `caentrytype` binary(17) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,

  `employee` binary(17) DEFAULT NULL,

  `paymethod` varchar(10) DEFAULT NULL,
  `paytran` varchar(60) DEFAULT NULL, 

  -- `cardno` varchar(20) DEFAULT NULL,
  -- `bankaccno` varchar(20) DEFAULT NULL,
  
  `amount` decimal(15,8) NOT NULL,

  PRIMARY KEY (`id`),
  INDEX `SEARCH_INDEX_1`(`business` ASC,`created_at` ASC),
  INDEX `SEARCH_INDEX_2`(`user` ASC,`created_at` ASC),
  INDEX `ID_INDEX`(`business` ASC,`id` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;