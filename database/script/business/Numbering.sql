CREATE TABLE `Numbering` (
  `business` binary(18) NOT NULL,
  
  `ICIssue_prefix` varchar(10) DEFAULT NULL,
  `ICIssue_index` int(10) DEFAULT '0',
  
  `ICReceipt_prefix` varchar(10) DEFAULT NULL,
  `ICReceipt_index` int(10) DEFAULT '0',
  
  `ICTransfer_prefix` varchar(10) DEFAULT NULL,
  `ICTransfer_index` int(10) DEFAULT '0',

  `ICCounting_prefix` varchar(10) DEFAULT NULL,
  `ICCounting_index` int(10) DEFAULT '0',

  `ICAdjust_prefix` varchar(10) DEFAULT NULL,
  `ICAdjust_index` int(10) DEFAULT '0',

  `ICKitAssem_prefix` varchar(10) DEFAULT NULL,
  `ICKitAssem_index` int(10) DEFAULT '0',

  `AROrder_prefix` varchar(10) DEFAULT NULL,
  `AROrder_index` int(10) DEFAULT '0',
  
  `ARReturn_prefix` varchar(10) DEFAULT NULL,
  `ARReturn_index` int(10) DEFAULT '0',
  
  `ARWarrantyOrder_prefix` varchar(10) DEFAULT NULL,
  `ARWarrantyOrder_index` int(10) DEFAULT '0',
  
  `ARShipment_prefix` varchar(10) DEFAULT NULL,
  `ARShipment_index` int(10) DEFAULT '0',
  
  `ARInvoice_prefix` varchar(10) DEFAULT NULL,
  `ARInvoice_index` int(10) DEFAULT '0',
  
  `ARAdjust_prefix` varchar(10) DEFAULT NULL,
  `ARAdjust_index` int(10) DEFAULT '0',
  
  `ARPayment_prefix` varchar(10) DEFAULT NULL,
  `ARPayment_index` int(10) DEFAULT '0',
  
  `ARRefund_prefix` varchar(10) DEFAULT NULL,
  `ARRefund_index` int(10) DEFAULT '0',
  
  `APOrder_prefix` varchar(10) DEFAULT NULL,
  `APOrder_index` int(10) DEFAULT '0',
  
  `APReceipt_prefix` varchar(10) DEFAULT NULL,
  `APReceipt_index` int(10) DEFAULT '0',

  `APReturn_prefix` varchar(10) DEFAULT NULL,
  `APReturn_index` int(10) DEFAULT '0',

  `APBill_prefix` varchar(10) DEFAULT NULL,
  `APBill_index` int(10) DEFAULT '0',
  
  `APAdjust_prefix` varchar(10) DEFAULT NULL,
  `APAdjust_index` int(10) DEFAULT '0',
  
  `APPayment_prefix` varchar(10) DEFAULT NULL,
  `APPayment_index` int(10) DEFAULT '0',
  
  `APRefund_prefix` varchar(10) DEFAULT NULL,
  `APRefund_index` int(10) DEFAULT '0',
  
  `CAIssue_prefix` varchar(10) DEFAULT NULL,
  `CAIssue_index` int(10) DEFAULT '0',
  
  `CAReceipt_prefix` varchar(10) DEFAULT NULL,
  `CAReceipt_index` int(10) DEFAULT '0',
  
  `CATransfer_prefix` varchar(10) DEFAULT NULL,
  `CATransfer_index` int(10) DEFAULT '0',

  UNIQUE KEY `BUSINESS_UNIQUE` (`business`),
  INDEX `BUSINESS_INDEX`(`business` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;