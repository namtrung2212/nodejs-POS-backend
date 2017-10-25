CREATE TABLE `Business` (
  `id` binary(17) NOT NULL, -- 2 first bytes refect dbnum  
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `type` varchar(20) NOT NULL DEFAULT 'retail',
  `owner` binary(17) NOT NULL, -- ref : Account
  `config` JSON NOT NULL ,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `checksum` binary(20) NOT NULL,
  PRIMARY KEY (`id`), 
  UNIQUE KEY `CODE_UNIQUE` (`code`),
  INDEX `CODE_INDEX`(`code` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;