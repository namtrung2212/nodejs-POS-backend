
CREATE TABLE `AROrder` (
  
  `id` binary(17) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `docdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user` binary(17) NOT NULL,
  `username` varchar(255) DEFAULT NULL,

  `orderno` varchar(100) DEFAULT NULL,
  `ref` varchar(20) DEFAULT NULL,
  `reftype` varchar(20) DEFAULT NULL,
  `released` tinyint(1) NOT NULL DEFAULT '0',
  `status` varchar(20) DEFAULT NULL,

  `business` binary(17) NOT NULL,
  `branch` binary(17) DEFAULT NULL,
  `branchno` varchar(100) DEFAULT NULL,
  `store` binary(17) DEFAULT NULL,
  `storeno` varchar(100) DEFAULT NULL,
  `storecell` binary(17) DEFAULT NULL,
  `storecellno` varchar(100) DEFAULT NULL,
  `warehouse` binary(17) DEFAULT NULL,
  `warehouseno` varchar(100) DEFAULT NULL,

  `ar_shipment` binary(17) DEFAULT NULL,
  `ar_shipmentno` varchar(10) DEFAULT NULL,
  `ar_invoice` binary(17) DEFAULT NULL,
  `ar_invoiceno` varchar(10) DEFAULT NULL,
  `ic_issue` binary(17) DEFAULT NULL,
  `ic_issueno` varchar(10) DEFAULT NULL,
  `ap_purchase` binary(17) DEFAULT NULL,
  `ap_purchaseno` varchar(10) DEFAULT NULL,

  `phonenum` varchar(20) DEFAULT NULL,
  `customer` binary(17) DEFAULT NULL,
  `customername` varchar(255) DEFAULT NULL,
  
  `qty` decimal(15,8) DEFAULT NULL,
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

  `checksum` binary(20) NOT NULL,

  PRIMARY KEY (`id`),
  INDEX `SEARCH_INDEX_1`(`business` ASC,`created_at` ASC),
  INDEX `SEARCH_INDEX_2`(`user` ASC,`created_at` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;