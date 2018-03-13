CREATE TABLE `Customer` (

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

  `no` varchar(100) DEFAULT NULL,
  `name` varchar(60) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phonenum` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  
  `cus_acc` binary(17) DEFAULT NULL,-- ref : Business

  -- `cus_cardno` varchar(20) DEFAULT NULL,
  -- `cus_bank` varchar(255) DEFAULT NULL,
  -- `cus_bankstate` varchar(255) DEFAULT NULL,
  -- `cus_bankbranch` varchar(255) DEFAULT NULL,
  -- `cus_bankacc` varchar(255) DEFAULT NULL,
  -- `cus_bankacc_owner` varchar(255) DEFAULT NULL,

  `point` decimal(15,8) NOT NULL DEFAULT '0',
  `tier` tinyint(4) NOT NULL DEFAULT '0',
  
  PRIMARY KEY (`id`),
  UNIQUE KEY `NO_UNIQUE` (`business`,`no`),
  INDEX `PHONE_INDEX`(`business` ASC,`phonenum` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;