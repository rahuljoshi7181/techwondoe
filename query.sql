CREATE TABLE `tbl_company` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `ceo` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `Inception_date` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`,`ceo`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci


CREATE TABLE `tbl_team` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comp_id` int(11) NOT NULL,
  `tl_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `comp_id` (`comp_id`),
  CONSTRAINT `tbl_team_ibfk_1` FOREIGN KEY (`comp_id`) REFERENCES `tbl_company` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci