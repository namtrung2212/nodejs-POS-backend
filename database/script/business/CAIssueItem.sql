
CREATE TABLE `CAIssueItem` (

  `id` binary(17) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `docdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user` binary(17) NOT NULL,
  `username` varchar(255) DEFAULT NULL,

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
  
  `ca_issue` binary(17) DEFAULT NULL,
  `ca_issueno` varchar(10) DEFAULT NULL,
  `ca_account` binary(17) DEFAULT NULL,
  `ca_accountno` varchar(10) DEFAULT NULL,

  `ca_entrytype` binary(17) DEFAULT NULL,
  `ca_entrytypename` varchar(255) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,

  `employee` binary(17) DEFAULT NULL,
  `employeename` varchar(255) DEFAULT NULL,
  
  `desc` varchar(10) DEFAULT NULL,
  `qty` decimal(15,8) NOT NULL,
  `unitprice` decimal(15,8) NOT NULL,
  `amount` decimal(15,8) NOT NULL,

  `checksum` binary(20) NOT NULL,

  PRIMARY KEY (`id`),
  INDEX `SEARCH_INDEX_1`(`business` ASC,`created_at` ASC),
  INDEX `SEARCH_INDEX_2`(`user` ASC,`created_at` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;