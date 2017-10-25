CREATE TABLE `CAEntryType` (

  `id` binary(17) NOT NULL,
  `business` binary(17) NOT NULL,

  `name` varchar(255) NOT NULL,
  `isPay` tinyint(4) NOT NULL DEFAULT '1', -- thu/chi
  
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `checksum` binary(20) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `NAME_INDEX`(`business` ASC,`id` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;