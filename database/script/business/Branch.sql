CREATE TABLE `Branch` (

  `id` binary(17) NOT NULL,
  `business` binary(17) NOT NULL, 
  `branchno` varchar(100) NOT NULL,
  `name` varchar(60) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `config` JSON NOT NULL ,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `checksum` binary(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `NAME_UNIQUE` (`business`,`branchno`),
  INDEX `NAME_INDEX`(`business` ASC,`id` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;