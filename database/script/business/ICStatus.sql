
CREATE TABLE `ICStatus` (
  
  `metadata` JSON DEFAULT NULL ,
  `note` varchar(255) DEFAULT NULL,
  `checksum` binary(16) DEFAULT NULL,

  `business` binary(17) NOT NULL,
  `branch` binary(17) DEFAULT NULL,
  `store` binary(17) DEFAULT NULL,
  `warehouse` binary(17) NOT NULL,
  
  `item` binary(17) DEFAULT NULL,
  `attr` JSON DEFAULT NULL ,
  `lot` varchar(50) DEFAULT NULL,
  `qty` decimal(15,8) NOT NULL,
  `valuation` decimal(15,8) NOT NULL,
  `unitcost` decimal(15,8) NOT NULL,

  INDEX `SEARCH_INDEX_1`(`business` ASC,`item` ASC),
  INDEX `SEARCH_INDEX_2`(`business` ASC,`branch` ASC,`store` ASC) ,
  INDEX `ID_INDEX`(`business` ASC,`item` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;