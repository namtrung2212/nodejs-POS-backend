CREATE TABLE `Item` (
  `id` binary(17) NOT NULL,
  `name` varchar(60) NOT NULL,
  `desc` varchar(255) NOT NULL,
  `group` binary(17) NOT NULL, 
  `type` varchar(60) NOT NULL,
  `img` mediumblob NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `note` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `checksum` binary(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `NAME_UNIQUE` (`group`,`name`),
  INDEX `NAME_INDEX`(`group` ASC,`name` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;