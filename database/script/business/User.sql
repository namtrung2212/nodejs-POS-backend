CREATE TABLE `User` (

  `id` binary(17) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,

  `config` JSON DEFAULT NULL ,
  `metadata` JSON DEFAULT NULL ,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `note` varchar(255) DEFAULT NULL,
  `checksum` binary(16) DEFAULT NULL,

  `business` binary(17) NOT NULL, -- ref: Business
  `default_branch` binary(17) DEFAULT NULL,
  `default_store` binary(17) DEFAULT NULL,
  `default_warehouse` binary(17) DEFAULT NULL,
  
  `name` varchar(60) NOT NULL,
  `password` binary(16) DEFAULT NULL,
  `roles` varchar(20) NOT NULL DEFAULT 'admin',
  `linkacc` binary(17) DEFAULT NULL, -- ref : Account
  
  PRIMARY KEY (`id`),
  UNIQUE KEY `NAME_UNIQUE` (`business`,`name`),
  INDEX `ID_INDEX`(`business` ASC,`id` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;