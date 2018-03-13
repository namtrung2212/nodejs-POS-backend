
CREATE TABLE `APCreditAdjust` (
 
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
  `vendor` binary(17) DEFAULT NULL,
  
  `increase_VAT` decimal(15,8) NOT NULL,
  `increase_valuation` decimal(15,8) NOT NULL,
  `increase_venbal` decimal(15,8) NOT NULL,
  
  `applied` decimal(15,8) DEFAULT NULL,
  `remain` decimal(15,8) DEFAULT NULL,
  `paidamt` decimal(15,8) DEFAULT NULL,
  `payable` decimal(15,8) DEFAULT NULL,
  
  `pre_record` binary(17) DEFAULT NULL,
  `pre_hashed` bigint(20) DEFAULT NULL,
  `venbal_befor` decimal(15,8) DEFAULT NULL,
  `venbal_after` decimal(15,8) DEFAULT NULL,

  PRIMARY KEY (`id`),
  INDEX `SEARCH_INDEX_1`(`business` ASC,`created_at` ASC),
  INDEX `SEARCH_INDEX_2`(`user` ASC,`created_at` ASC),
  INDEX `ID_INDEX`(`business` ASC,`id` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;