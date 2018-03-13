

CREATE TABLE `APOrder` (
  
  `id` binary(17) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user` binary(17) DEFAULT NULL,

  `metadata` JSON DEFAULT NULL ,
  `note` varchar(255) DEFAULT NULL,
  `checksum` binary(16) DEFAULT NULL,

  `docdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ref` varchar(20) DEFAULT NULL,
  `reftype` varchar(20) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,

  `business` binary(17) NOT NULL,
  `branch` binary(17) DEFAULT NULL,
  `store` binary(17) DEFAULT NULL,
  `warehouse` binary(17) DEFAULT NULL,
  `vendor` binary(17) DEFAULT NULL,

  `apreceipt` binary(17) DEFAULT NULL,
  `apbill` binary(17) DEFAULT NULL,
  `icreceipt` binary(17) DEFAULT NULL,
  `arorder` binary(17) DEFAULT NULL,

  `qty` decimal(15,8) DEFAULT NULL,
  `priceamt` decimal(15,8) NOT NULL,
  `discamt` decimal(15,8) DEFAULT NULL,
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
  
  PRIMARY KEY (`id`),
  INDEX `SEARCH_INDEX_1`(`business` ASC,`created_at` ASC),
  INDEX `SEARCH_INDEX_2`(`user` ASC,`created_at` ASC) ,
  INDEX `ID_INDEX`(`business` ASC,`id` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;