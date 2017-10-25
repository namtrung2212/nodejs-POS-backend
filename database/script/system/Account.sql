CREATE TABLE `Account` (
  `id` binary(17) NOT NULL,
  `phonenum` varchar(20) NOT NULL,
  `name` varchar(60) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `checksum` binary(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `PHONE_UNIQUE` (`phonenum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;