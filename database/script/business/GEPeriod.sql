CREATE TABLE `GEPeriod` (
  `business` binary(18) NOT NULL,
  `no` varchar(10) DEFAULT NULL,
  `startdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `enddate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isadjust` tinyint(1) NOT NULL DEFAULT '0',
  `isclosed` tinyint(1) NOT NULL DEFAULT '0',

  UNIQUE KEY `BUSINESS_UNIQUE` (`business`,`no`),
  INDEX `BUSINESS_INDEX`(`business` ASC,`no` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;