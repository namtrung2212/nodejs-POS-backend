CREATE TABLE `Store` (

  `id` binary(18) NOT NULL,
  `business` binary(18) NOT NULL,
  `branch` binary(18) DEFAULT NULL,
  `branchno` varchar(100) DEFAULT NULL,
  `storeno` varchar(100) DEFAULT NULL,
  `name` varchar(60) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `config` JSON NOT NULL ,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `checksum` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `NAME_UNIQUE` (`business`,`storeno`),
  INDEX `NAME_INDEX`(`business` ASC,`id` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;