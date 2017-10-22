CREATE TABLE `ItemGroup` (
  `id` binary(18) NOT NULL,
  `name` varchar(60) NOT NULL,
  `desc` varchar(255) NOT NULL,  
  `type` varchar(60) NOT NULL,
  `attribute` JSON NOT NULL ,
  `config` JSON NOT NULL ,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `checksum` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `NAME_UNIQUE` (`name`),
  INDEX `NAME_INDEX`(`name` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;