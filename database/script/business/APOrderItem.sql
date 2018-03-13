

CREATE TABLE `APOrderItem` (
  
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

  `aporder` binary(17) DEFAULT NULL,
  `apreceipt` binary(17) DEFAULT NULL,
  `apreceiptitem` binary(17) DEFAULT NULL,
  `apbill` binary(17) DEFAULT NULL,
  `apbillitem` binary(17) DEFAULT NULL,
  `icreceipt` binary(17) DEFAULT NULL,
  `icreceiptitem` binary(17) DEFAULT NULL,
  `arorder` binary(17) DEFAULT NULL,
  `arorderitem` binary(17) DEFAULT NULL,

  `item` binary(17) NOT NULL,
  `desc` varchar(10) DEFAULT NULL,
  `attr` JSON DEFAULT NULL ,
  `lot` varchar(50) DEFAULT NULL,
  `UOM` varchar(8) NOT NULL DEFAULT 'BASE',
  `qty` decimal(15,8) NOT NULL,
  `unitprice` decimal(15,8) NOT NULL,
  `discamt` decimal(15,8) DEFAULT NULL,
  `VATpct`tinyint(4) DEFAULT NULL,
  `VATamt` decimal(15,8) DEFAULT NULL,
  `amount` decimal(15,8) NOT NULL,

  `orderdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `est_receiptdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  `receiptable` tinyint(1) NOT NULL DEFAULT '1',
  `partial_receipt` tinyint(1) NOT NULL DEFAULT '0',
  `receiptinfo` JSON DEFAULT NULL,
  `receipting` decimal(15,8) DEFAULT NULL,
  `receipting_amt` decimal(15,8) DEFAULT NULL,
  `receipted` decimal(15,8) DEFAULT NULL,
  `receipted_amt` decimal(15,8) DEFAULT NULL,
  `receipt_remain` decimal(15,8) DEFAULT NULL,
  `receipt_remain_amt` decimal(15,8) DEFAULT NULL,

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
  INDEX `ID_INDEX`(`business` ASC,`aporder` ASC,`id` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;