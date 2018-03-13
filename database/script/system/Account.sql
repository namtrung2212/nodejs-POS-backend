CREATE TABLE `Account` (

  `id` binary(17) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,

  `config` JSON DEFAULT NULL ,
  `metadata` JSON DEFAULT NULL ,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `checksum` binary(16) DEFAULT NULL,

  `phonenum` varchar(20) NOT NULL,
  `name` varchar(60) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` binary(16) DEFAULT NULL,

  PRIMARY KEY (`id`),
  UNIQUE KEY `PHONE_UNIQUE` (`phonenum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;