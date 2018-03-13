CREATE TABLE `Employee` (

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
  `user_acc` binary(17) DEFAULT NULL, -- ref : User

  `no` varchar(60) NOT NULL,
  `name` varchar(60) DEFAULT NULL,
  `phonenum` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  
  PRIMARY KEY (`id`) ,
  UNIQUE KEY `NO_UNIQUE` (`business`,`no`),
  INDEX `NAME_INDEX`(`business` ASC,`id` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;