CREATE TABLE `Numbering` (
  `business` binary(17) NOT NULL,
  
  `pattern` JSON DEFAULT NULL ,
  `current` JSON DEFAULT NULL ,

  UNIQUE KEY `BUSINESS_UNIQUE` (`business`),
  INDEX `BUSINESS_INDEX`(`business` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;