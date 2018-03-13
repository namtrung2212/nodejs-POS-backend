CREATE TABLE `CAEntryType` (

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

  `name` varchar(255) NOT NULL,
  `isPay` tinyint(4) NOT NULL DEFAULT '1', -- thu/chi
  
  PRIMARY KEY (`id`),
  INDEX `ID_INDEX`(`business` ASC,`id` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;