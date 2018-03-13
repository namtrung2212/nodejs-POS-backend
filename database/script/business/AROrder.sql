
CREATE TABLE `AROrder` (
  
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

  `arshipment` binary(17) DEFAULT NULL,
  `arinvoice` binary(17) DEFAULT NULL,
  `icissue` binary(17) DEFAULT NULL,
  `appurchase` binary(17) DEFAULT NULL,

  `customer` binary(17) DEFAULT NULL,
  
  `qty` decimal(15,8) DEFAULT NULL,
  `priceamt` decimal(15,8) NOT NULL,
  `discamt` decimal(15,8) DEFAULT NULL,
  `VATamt` decimal(15,8) DEFAULT NULL,
  `amount` decimal(15,8) DEFAULT NULL,

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
  
  `purchasing` decimal(15,8) DEFAULT NULL,
  `purchased` decimal(15,8) DEFAULT NULL,
  `purchase_remain` decimal(15,8) DEFAULT NULL,

  PRIMARY KEY (`id`),
  INDEX `SEARCH_INDEX_1`(`business` ASC,`created_at` ASC),
  INDEX `SEARCH_INDEX_2`(`user` ASC,`created_at` ASC) ,
  INDEX `ID_INDEX`(`business` ASC,`id` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;