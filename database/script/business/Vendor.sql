CREATE TABLE `Vendor` (

  `id` binary(17) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user` binary(17) DEFAULT NULL,

  `config` JSON DEFAULT NULL ,
  `metadata` JSON DEFAULT NULL ,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `note` varchar(255) DEFAULT NULL,
  `checksum` binary(16) DEFAULT NULL,

  `business` binary(17) DEFAULT NULL,
  `branch` binary(17) DEFAULT NULL,
  `store` binary(17) DEFAULT NULL,
  `warehouse` binary(17) DEFAULT NULL,
  `employee` binary(17) DEFAULT NULL,
  `vendor_acc` binary(17) DEFAULT NULL,-- ref : Business

  `no` varchar(100) DEFAULT NULL,
  `name` varchar(60) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phonenum` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  
  `islanded` tinyint(4) NOT NULL DEFAULT '0',
  
  -- `ven_cardno` varchar(20) DEFAULT NULL,
  -- `ven_bank` varchar(255) DEFAULT NULL,
  -- `ven_bankstate` varchar(255) DEFAULT NULL,
  -- `ven_bankbranch` varchar(255) DEFAULT NULL,
  -- `ven_bankacc` varchar(255) DEFAULT NULL,
  -- `ven_bankacc_owner` varchar(255) DEFAULT NULL,

  
  PRIMARY KEY (`id`),
  UNIQUE KEY `NO_UNIQUE` (`business`,`no`),
  INDEX `ID_INDEX`(`business` ASC,`id` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;