
CREATE TABLE `ARPriceList` (
  
  `id` binary(17) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user` binary(17) DEFAULT NULL,

  `metadata` JSON DEFAULT NULL ,
  `note` varchar(255) DEFAULT NULL,
  `checksum` binary(16) DEFAULT NULL,

  `business` binary(17) NOT NULL,
  `branch` binary(17) DEFAULT NULL,
  `store` binary(17) DEFAULT NULL,

  `effected_start` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `effected_end` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(4) NOT NULL DEFAULT '1',

  `itemgroup` binary(17) DEFAULT NULL,
  `item` binary(17) NOT NULL,
  `desc` varchar(10) DEFAULT NULL,
  `attr` JSON DEFAULT NULL ,
  `UOM` varchar(8) NOT NULL DEFAULT 'BASE',

  `unitprice` decimal(15,8) NOT NULL,
  `VATpct`tinyint(4) DEFAULT NULL,
  `taxedprice` decimal(15,8) NOT NULL,

  PRIMARY KEY (`id`),
  INDEX `SEARCH_INDEX_1`(`business` ASC,`created_at` ASC),
  INDEX `SEARCH_INDEX_2`(`user` ASC,`created_at` ASC) ,
  INDEX `ID_INDEX`(`business` ASC,`itemgroup` ASC,`item` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;