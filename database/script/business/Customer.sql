CREATE TABLE `Customer` (

  `id` binary(18) NOT NULL,
  `islanded` tinyint(4) NOT NULL DEFAULT '0',

  `customerno` varchar(100) DEFAULT NULL,
  `name` varchar(60) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phonenum` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `business` binary(18) DEFAULT NULL,
  
  `islinked` tinyint(4) NOT NULL DEFAULT '0',
  `note` varchar(255) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  
  `cus_cardno` varchar(20) DEFAULT NULL,
  `cus_bank` varchar(255) DEFAULT NULL,
  `cus_bankstate` varchar(255) DEFAULT NULL,
  `cus_bankbranch` varchar(255) DEFAULT NULL,
  `cus_bankacc` varchar(255) DEFAULT NULL,
  `cus_bankacc_owner` varchar(255) DEFAULT NULL,

  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `checksum` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `NAME_UNIQUE` (`business`,`customerno`),
  INDEX `CODE_INDEX`(`business` ASC,`id` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;