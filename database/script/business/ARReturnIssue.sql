
CREATE TABLE `ARReturnIssue` (
  
  `id` binary(17) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user` binary(17) DEFAULT NULL,

  `metadata` JSON DEFAULT NULL ,
  `note` varchar(255) DEFAULT NULL,
  `checksum` binary(16) DEFAULT NULL,

  `docdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ref` varchar(20) DEFAULT NULL,
  `reftype` varchar(20) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,

  `business` binary(17) NOT NULL,
  `branch` binary(17) DEFAULT NULL,
  `store` binary(17) DEFAULT NULL,
  `storecell` varchar(100) DEFAULT NULL,
  `warehouse` binary(17) DEFAULT NULL,
  
  `arreturn` binary(17) NOT NULL,
  `arorder` binary(17) DEFAULT NULL,
  `arshipment` binary(17) DEFAULT NULL,
  `arinvoice` binary(17) DEFAULT NULL,
  `icissue_old` binary(17) DEFAULT NULL,
  
  `customer` binary(17) DEFAULT NULL,

  `item` binary(17) NOT NULL,
  `desc` varchar(10) DEFAULT NULL,
  `attr` JSON DEFAULT NULL ,
  `lot` varchar(50) DEFAULT NULL,
  `UOM` varchar(8) NOT NULL DEFAULT 'BASE',
  
  `qty` decimal(15,8) NOT NULL,
  `unitprice` decimal(15,8) NOT NULL,
  `discpct`tinyint(4) DEFAULT NULL,
  `discamt` decimal(15,8) DEFAULT NULL,
  `manual_discamt` decimal(15,8) DEFAULT NULL,
  `VATpct`tinyint(4) DEFAULT NULL,
  `VATamt` decimal(15,8) DEFAULT NULL,
  `amount` decimal(15,8) NOT NULL,

  `icissue` binary(17) DEFAULT NULL,
  `icissueitem` binary(17) DEFAULT NULL,

  PRIMARY KEY (`id`),
  INDEX `ID_INDEX`(`business` ASC,`arreturn` ASC,`id` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;