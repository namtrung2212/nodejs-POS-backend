
CREATE TABLE `ARInvoice` (
  
  `id` binary(17) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `docdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user` binary(17) NOT NULL,
  `username` varchar(255) DEFAULT NULL,

  `invoiceno` varchar(10) DEFAULT NULL,
  `ref` varchar(20) DEFAULT NULL,
  `reftype` varchar(20) DEFAULT NULL,
  `released` tinyint(1) NOT NULL DEFAULT '0',
  `status` varchar(20) DEFAULT NULL,
  `glposted` tinyint(1) NOT NULL DEFAULT '0',
  `glperiod` varchar(10) DEFAULT NULL,
  `glvoucher` binary(17) DEFAULT NULL,
  `glvoucherno` varchar(100) DEFAULT NULL,

  `business` binary(17) NOT NULL,
  `branch` binary(17) DEFAULT NULL,
  `branchno` varchar(100) DEFAULT NULL,
  `store` binary(17) DEFAULT NULL,
  `storeno` varchar(100) DEFAULT NULL,
  `storecell` binary(17) DEFAULT NULL,
  `storecellno` varchar(100) DEFAULT NULL,
  `warehouse` binary(17) DEFAULT NULL,
  `warehouseno` varchar(100) DEFAULT NULL,
  
  `ar_order` binary(17) NOT NULL,
  `ar_orderno` varchar(10) DEFAULT NULL,
  `ar_shipment` binary(17) DEFAULT NULL,
  `ar_shipmentno` varchar(10) DEFAULT NULL,
  `ar_invoice` binary(17) NOT NULL,
  `ar_invoiceno` varchar(10) DEFAULT NULL,
  `ic_issue` binary(17) NOT NULL,
  `ic_issueno` varchar(10) DEFAULT NULL,
  `ar_payment` binary(17) NOT NULL,
  `ar_paymentno` varchar(10) DEFAULT NULL,

  `phonenum` varchar(20) DEFAULT NULL,
  `customer` binary(17) DEFAULT NULL,
  `customername` varchar(255) DEFAULT NULL,
  
  `qty` decimal(15,8) NOT NULL,
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
  `checksum` binary(20) NOT NULL,

  PRIMARY KEY (`id`),
  INDEX `SEARCH_INDEX_1`(`business` ASC,`created_at` ASC),
  INDEX `SEARCH_INDEX_2`(`user` ASC,`created_at` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;