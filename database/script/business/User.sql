CREATE TABLE `User` (
  `id` binary(18) NOT NULL,

  `business` binary(18) NOT NULL, -- ref: Business
  `default_branch` binary(18) DEFAULT NULL,
  `default_branchno` varchar(100) DEFAULT NULL,
  `default_store` binary(18) DEFAULT NULL,
  `default_storeno` varchar(100) DEFAULT NULL,
  `default_warehouse` binary(18) DEFAULT NULL,
  `default_warehouseno` varchar(100) DEFAULT NULL,

  `userno` varchar(100) DEFAULT NULL,
  `name` varchar(60) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'admin',
  `linkacc` binary(16) NOT NULL, -- ref : Account
  `linked` tinyint(4) NOT NULL DEFAULT '0',
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `checksum` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `NAME_UNIQUE` (`business`,`userno`),
  INDEX `CODE_INDEX`(`business` ASC,`id` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;