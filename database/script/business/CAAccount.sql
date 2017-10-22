CREATE TABLE `CAAccount` (

  `id` binary(18) NOT NULL,
  `business` binary(18) NOT NULL,
  `branch` binary(18) DEFAULT NULL,
  `branchno` varchar(100) DEFAULT NULL,
  `store` binary(18) DEFAULT NULL,
  `storeno` varchar(100) DEFAULT NULL,
  `restrict_bybranch` tinyint(1) NOT NULL DEFAULT '0',
  `restrict_bystore` tinyint(1) NOT NULL DEFAULT '0',

  `accountno` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `cardno` varchar(255) DEFAULT NULL,
  `bank` varchar(255) DEFAULT NULL,
  `bankstate` varchar(255) DEFAULT NULL,
  `bankbranch` varchar(255) DEFAULT NULL,
  `bankacc` varchar(255) DEFAULT NULL,
  `bankacc_owner` varchar(255) DEFAULT NULL,

  `config` JSON NOT NULL , -- payment method & modules
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `checksum` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `NAME_UNIQUE` (`business`,`accountno`),
  INDEX `NAME_INDEX`(`business` ASC,`id` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;