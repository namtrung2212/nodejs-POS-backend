CREATE TABLE `Vendor` (

  `id` binary(17) NOT NULL,
  `islanded` tinyint(4) NOT NULL DEFAULT '0',

  `vendorno` varchar(100) DEFAULT NULL,
  `name` varchar(60) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phonenum` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `business` binary(17) DEFAULT NULL,
  `islinked` tinyint(4) NOT NULL DEFAULT '0',
  `note` varchar(255) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  
  `ven_cardno` varchar(20) DEFAULT NULL,
  `ven_bank` varchar(255) DEFAULT NULL,
  `ven_bankstate` varchar(255) DEFAULT NULL,
  `ven_bankbranch` varchar(255) DEFAULT NULL,
  `ven_bankacc` varchar(255) DEFAULT NULL,
  `ven_bankacc_owner` varchar(255) DEFAULT NULL,

  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `checksum` binary(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `NAME_UNIQUE` (`business`,`vendorno`),
  INDEX `CODE_INDEX`(`business` ASC,`id` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;