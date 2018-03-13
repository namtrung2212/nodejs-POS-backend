
CREATE TABLE `ARPromotion` (
  
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
  `UOM` varchar(8) DEFAULT 'BASE',

  `cus_minpoint` decimal(15,8) DEFAULT NULL,
  `cus_maxpoint` decimal(15,8) DEFAULT NULL,
  `cus_mintier` tinyint(4) DEFAULT NULL,
  `cus_maxtier` tinyint(4) DEFAULT NULL,

  `minqty` decimal(15,8) DEFAULT NULL,
  `maxqty` decimal(15,8) DEFAULT NULL,
  `discpct`tinyint(4) DEFAULT NULL,

  PRIMARY KEY (`id`),
  INDEX `SEARCH_INDEX_1`(`business` ASC,`created_at` ASC),
  INDEX `SEARCH_INDEX_2`(`user` ASC,`created_at` ASC) ,
  INDEX `ID_INDEX`(`business` ASC,`itemgroup` ASC,`item` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;