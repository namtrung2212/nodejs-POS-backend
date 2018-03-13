CREATE TABLE `UserRole` (
  
  `id` binary(17) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,

  `config` JSON DEFAULT NULL ,
  `metadata` JSON DEFAULT NULL ,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `note` varchar(255) DEFAULT NULL,
  `checksum` binary(16) DEFAULT NULL,

  `business` binary(17) NOT NULL, -- ref: Business
  `name` varchar(60) NOT NULL,
  `type` varchar(60) NOT NULL,

  PRIMARY KEY (`id`),
  UNIQUE KEY `NAME_UNIQUE` (`business`,`name`),
  INDEX `NAME_INDEX`(`business` ASC,`name` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;