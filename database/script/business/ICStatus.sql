
CREATE TABLE `ICStatus` (
  
  `business` binary(18) NOT NULL,
  `branch` binary(18) DEFAULT NULL,
  `branchno` varchar(100) DEFAULT NULL,
  `store` binary(18) DEFAULT NULL,
  `storeno` varchar(100) DEFAULT NULL,
  `warehouse` binary(18) NOT NULL,
  `warehouseno` varchar(100) DEFAULT NULL,
  
  `item` binary(18) DEFAULT NULL,
  `itemno` varchar(100) DEFAULT NULL,
  `itemdesc` varchar(10) DEFAULT NULL,
  `lot` varchar(50) DEFAULT NULL,
  `qty` decimal(15,8) NOT NULL,
  `valuation` decimal(15,8) NOT NULL,
  `unitcost` decimal(15,8) NOT NULL,
  
  `checksum` bigint(20) NOT NULL,

  INDEX `SEARCH_INDEX_1`(`business` ASC,`item` ASC),
  INDEX `SEARCH_INDEX_2`(`business` ASC,`branch` ASC,`store` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;