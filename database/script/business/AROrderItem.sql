
CREATE TABLE `AROrderItem` (
  
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
  `storecell` varchar(100) DEFAULT NULL,
  `warehouse` binary(17) DEFAULT NULL,
  
  `arorder` binary(17) NOT NULL,
  `arshipment` binary(17) DEFAULT NULL,
  `arshipmentitem` varchar(10) DEFAULT NULL,
  `arinvoice` binary(17) DEFAULT NULL,
  `arinvoiceitem` varchar(10) DEFAULT NULL,
  `icissue` binary(17) DEFAULT NULL,
  `icissueitem` varchar(10) DEFAULT NULL,
  `appurchase` binary(17) DEFAULT NULL,
  `appurchaseitem` varchar(10) DEFAULT NULL,
  
  `customer` binary(17) DEFAULT NULL,

  `item` binary(17) NOT NULL,
  `desc` varchar(10) DEFAULT NULL,
  `attr` JSON DEFAULT NULL ,
  `lot` varchar(50) DEFAULT NULL,
  `UOM` varchar(8) NOT NULL DEFAULT 'BASE',
  
  `qty` decimal(15,8) NOT NULL,
  `unitprice` decimal(15,8) NOT NULL,
  `discpct`tinyint(4) DEFAULT NULL,
  `discamt` decimal(15,8) DEFAULT NULL,
  `manual_discamt` decimal(15,8) DEFAULT NULL,
  `VATpct`tinyint(4) DEFAULT NULL,
  `VATamt` decimal(15,8) DEFAULT NULL,
  `amount` decimal(15,8) NOT NULL,

  `shippable` tinyint(1) NOT NULL DEFAULT '1',
  `partialship` tinyint(1) NOT NULL DEFAULT '0',
  `shipinfo` JSON DEFAULT NULL,
  `shipping` decimal(15,8) DEFAULT NULL,
  `shipped` decimal(15,8) DEFAULT NULL,
  `shipremain` decimal(15,8) DEFAULT NULL,

  `invoiceinfo` JSON DEFAULT NULL,
  `invoicing` decimal(15,8) DEFAULT NULL,
  `invoicing_amt` decimal(15,8) DEFAULT NULL,
  `invoiced` decimal(15,8) DEFAULT NULL,
  `invoiced_amt` decimal(15,8) DEFAULT NULL,
  `invoice_remain` decimal(15,8) DEFAULT NULL,
  `invoice_remain_amt` decimal(15,8) DEFAULT NULL,
  
  `returned` decimal(15,8) DEFAULT NULL,
  `warrantied` decimal(15,8) DEFAULT NULL,

  `purchasable` tinyint(1) NOT NULL DEFAULT '0',
  `purchaseinfo` JSON DEFAULT NULL,
  `purchasing` decimal(15,8) DEFAULT NULL,
  `purchased` decimal(15,8) DEFAULT NULL,
  `purchase_remain` decimal(15,8) DEFAULT NULL,

  PRIMARY KEY (`id`),
  INDEX `ID_INDEX`(`business` ASC,`arorder` ASC,`id` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;