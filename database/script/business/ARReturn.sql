
CREATE TABLE `ARReturn` (
  
  `id` binary(17) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user` binary(17) DEFAULT NULL,

  `metadata` JSON DEFAULT NULL ,
  `note` varchar(255) DEFAULT NULL,
  `checksum` binary(16) DEFAULT NULL,

  `no` varchar(100) DEFAULT NULL,
  `docdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ref` varchar(20) DEFAULT NULL,
  `reftype` varchar(20) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,

  `business` binary(17) NOT NULL,
  `branch` binary(17) DEFAULT NULL,
  `store` binary(17) DEFAULT NULL,
  `storecell` varchar(100) DEFAULT NULL,
  `warehouse` binary(17) DEFAULT NULL,

  `arorder` binary(17) DEFAULT NULL,
  `arshipment` binary(17) DEFAULT NULL,
  `arinvoice` binary(17) DEFAULT NULL,
  `icissue_old` binary(17) DEFAULT NULL,

  `customer` binary(17) DEFAULT NULL,
  
  `receipt_qty` decimal(15,8) DEFAULT NULL,
  `receipt_discamt` decimal(15,8) DEFAULT NULL,
  `receipt_VATamt` decimal(15,8) DEFAULT NULL,
  `receipt_amount` decimal(15,8) DEFAULT NULL,
  
  `issue_qty` decimal(15,8) DEFAULT NULL,
  `issue_discamt` decimal(15,8) DEFAULT NULL,
  `issue_VATamt` decimal(15,8) DEFAULT NULL,
  `issue_amount` decimal(15,8) DEFAULT NULL,

  `diff_VAT` decimal(15,8) DEFAULT NULL,
  `diff_amount` decimal(15,8) DEFAULT NULL,
  `arcreditmemo` binary(17) DEFAULT NULL,
  `arcreditmemono` varchar(10) DEFAULT NULL,
  `ardebitmemo` binary(17) DEFAULT NULL,
  `ardebitmemono` varchar(10) DEFAULT NULL,

  `icissue` binary(17) DEFAULT NULL,
  `icreceipt` binary(17) DEFAULT NULL,

  PRIMARY KEY (`id`),
  INDEX `SEARCH_INDEX_1`(`business` ASC,`created_at` ASC),
  INDEX `SEARCH_INDEX_2`(`user` ASC,`created_at` ASC) ,
  INDEX `ID_INDEX`(`business` ASC,`id` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;