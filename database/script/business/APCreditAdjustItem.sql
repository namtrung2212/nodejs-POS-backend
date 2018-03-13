
CREATE TABLE `APCreditAdjustItem` (

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
  `vendor` binary(17) DEFAULT NULL,
  
  `apcreditadjust` binary(17) NOT NULL,
  `apbill` binary(17) DEFAULT NULL,
  `aporder` binary(17) DEFAULT NULL,

  `desc` varchar(10) DEFAULT NULL,
  
  `billamt` decimal(15,8) DEFAULT NULL,
  `applied` decimal(15,8) NOT NULL,

  PRIMARY KEY (`id`),
  INDEX `ID_INDEX`(`business` ASC,`apcreditadjust` ASC,`id` ASC) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;