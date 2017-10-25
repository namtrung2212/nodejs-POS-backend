
CREATE TABLE `ICStatus` (
  
  `business` binary(17) NOT NULL,
  `branch` binary(17) DEFAULT NULL,
  `branchno` varchar(100) DEFAULT NULL,
  `store` binary(17) DEFAULT NULL,
  `storeno` varchar(100) DEFAULT NULL,
  `warehouse` binary(17) NOT NULL,
  `warehouseno` varchar(100) DEFAULT NULL,
  
  `item` binary(17) DEFAULT NULL,
  `itemno` varchar(100) DEFAULT NULL,
  `itemdesc` varchar(10) DEFAULT NULL,
  `lot` varchar(50) DEFAULT NULL,
  `qty` decimal(15,8) NOT NULL,
  `valuation` decimal(15,8) NOT NULL,
  `unitcost` decimal(15,8) NOT NULL,
  
  `checksum` binary(20) NOT NULL,

  INDEX `SEARCH_INDEX_1`(`business` ASC,`item` ASC),
  INDEX `SEARCH_INDEX_2`(`business` ASC,`branch` ASC,`store` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;