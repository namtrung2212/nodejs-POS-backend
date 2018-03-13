
CREATE TABLE `ICReceiptItem` (
  
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
  `glvoucher` binary(17) DEFAULT NULL,

  `business` binary(17) NOT NULL,
  `branch` binary(17) DEFAULT NULL,
  `store` binary(17) DEFAULT NULL,
  `storecell` varchar(100) DEFAULT NULL,
  `warehouse` binary(17) NOT NULL,
  
  `icreceipt` binary(17) DEFAULT NULL,
  
  `aporder` binary(17) DEFAULT NULL,
  `aporderitem` binary(17) DEFAULT NULL,
  `apreceipt` binary(17) DEFAULT NULL,
  `apreceiptitem` binary(17) DEFAULT NULL,
  `apbill` binary(17) DEFAULT NULL,
  `apbillitem` binary(17) DEFAULT NULL,

  `arreturn` binary(17) DEFAULT NULL,
  `arreturnitem` binary(17) DEFAULT NULL,
  `arorder` binary(17) DEFAULT NULL,
  `arorderitem` binary(17) DEFAULT NULL,
  `arinvoice` binary(17) DEFAULT NULL,
  `arinvoiceitem` binary(17) DEFAULT NULL,

  `item` binary(17) NOT NULL,
  `desc` varchar(10) DEFAULT NULL,
  `attr` JSON DEFAULT NULL ,
  `lot` varchar(50) DEFAULT NULL,
  `UOM` varchar(8) NOT NULL DEFAULT 'BASE',
  
  `qty` decimal(15,8) NOT NULL,
  `unitcost` decimal(15,8) NOT NULL,
  `valuation` decimal(15,8) NOT NULL,

  PRIMARY KEY (`id`),
  INDEX `ID_INDEX`(`business` ASC,`icreceipt` ASC,`id` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;