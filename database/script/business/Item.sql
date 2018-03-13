CREATE TABLE `Item` (
 
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
  `itemgroup` binary(17) DEFAULT NULL, 
  `vendor` binary(17) DEFAULT NULL, 
  `employee` binary(17) DEFAULT NULL, 

  `no` varchar(60) NOT NULL,
  `code` varchar(60) NOT NULL,
  `name` varchar(60) NOT NULL,
  `desc` varchar(255) DEFAULT NULL,

  `type` varchar(60) NOT NULL,
  `stockable` tinyint(4) NOT NULL DEFAULT '1',
  `saleable` tinyint(4) NOT NULL DEFAULT '1',
  `purchasable` tinyint(4) NOT NULL DEFAULT '1',
  `expensable` tinyint(4) NOT NULL DEFAULT '1',

  `img` mediumblob DEFAULT NULL,

  `baseprice` decimal(15,8) NOT NULL,
  `unitcost` decimal(15,8) NOT NULL,

  PRIMARY KEY (`id`),
  UNIQUE KEY `NO_UNIQUE` (`business`,`no`),
  UNIQUE KEY `CODE_UNIQUE` (`business`,`code`),
  INDEX `ID_INDEX`(`business` ASC,`id` ASC),
  INDEX `NO_INDEX`(`business` ASC,`no` ASC),
  INDEX `GROUP_INDEX`(`business` ASC,`itemgroup` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;