
CREATE TABLE `ARInvoice` (
  
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
  `warehouse` binary(17) DEFAULT NULL,
  
  `arorder` binary(17) NOT NULL,
  `arshipment` binary(17) DEFAULT NULL,
  `arinvoice` binary(17) NOT NULL,
  `icissue` binary(17) NOT NULL,
  `arpayment` binary(17) NOT NULL,

  `customer` binary(17) DEFAULT NULL,
  
  `qty` decimal(15,8) NOT NULL,
  `priceamt` decimal(15,8) NOT NULL,
  `discamt` decimal(15,8) DEFAULT NULL,
  `VATamt` decimal(15,8) DEFAULT NULL,
  `amount` decimal(15,8) NOT NULL,
  `paidamt` decimal(15,8) NOT NULL,
  `adjustamt` decimal(15,8) NOT NULL,
  `remainamt` decimal(15,8) NOT NULL,

  `invoiceinfo` JSON DEFAULT NULL,
    
  `pre_record` binary(17) DEFAULT NULL,
  `pre_hashed` bigint(20) DEFAULT NULL,
  `cusbal_befor` decimal(15,8) DEFAULT NULL,
  `cusbal_after` decimal(15,8) DEFAULT NULL,

  PRIMARY KEY (`id`),
  INDEX `SEARCH_INDEX_1`(`business` ASC,`created_at` ASC),
  INDEX `SEARCH_INDEX_2`(`user` ASC,`created_at` ASC) ,
  INDEX `ID_INDEX`(`business` ASC,`id` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;