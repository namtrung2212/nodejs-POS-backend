CREATE TABLE `CAAccount` (

  `id` binary(17) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user` binary(17) DEFAULT NULL,

  `config` JSON DEFAULT NULL ,
  `metadata` JSON DEFAULT NULL ,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `note` varchar(255) DEFAULT NULL,
  `checksum` binary(16) DEFAULT NULL,

  `business` binary(17) NOT NULL,
  `branch` binary(17) DEFAULT NULL,
  `store` binary(17) DEFAULT NULL,
  `restrict_bybranch` tinyint(1) NOT NULL DEFAULT '0',
  `restrict_bystore` tinyint(1) NOT NULL DEFAULT '0',

  `no` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,

  -- `cardno` varchar(255) DEFAULT NULL,
  -- `bank` varchar(255) DEFAULT NULL,
  -- `bankstate` varchar(255) DEFAULT NULL,
  -- `bankbranch` varchar(255) DEFAULT NULL,
  -- `bankacc` varchar(255) DEFAULT NULL,
  -- `bankacc_owner` varchar(255) DEFAULT NULL,
  
  PRIMARY KEY (`id`),
  UNIQUE KEY `NO_UNIQUE` (`business`,`no`),
  INDEX `ID_INDEX`(`business` ASC,`id` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;