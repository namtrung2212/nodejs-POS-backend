
CREATE TABLE `ARPaymentItem` (

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
  `glvoucher` binary(17) DEFAULT NULL,

  `business` binary(17) NOT NULL,
  `branch` binary(17) DEFAULT NULL,
  `store` binary(17) DEFAULT NULL,
  `storecell` varchar(100) DEFAULT NULL,
  
  `arpayment` binary(17) NOT NULL,
  `arinvoice` binary(17) DEFAULT NULL,
  `ardebitmemo` binary(17) DEFAULT NULL,
  `arorder` binary(17) DEFAULT NULL,

  `customer` binary(17) DEFAULT NULL,
  
  `docamt` decimal(15,8) NOT NULL,
  `applied` decimal(15,8) NOT NULL,

  PRIMARY KEY (`id`),
  INDEX `ID_INDEX`(`business` ASC,`arpayment` ASC,`id` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;