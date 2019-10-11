-- MySQL dump 10.15  Distrib 10.0.38-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: ngops
-- ------------------------------------------------------
-- Server version	10.0.38-MariaDB-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `acl_attendances`
--

DROP TABLE IF EXISTS `acl_attendances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acl_attendances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `login_id` int(11) DEFAULT NULL,
  `punch_in` datetime DEFAULT NULL,
  `punch_out` datetime DEFAULT NULL,
  `status` tinyint(4) DEFAULT '0' COMMENT '0-pending,1-full day,2-half day, 3- short leave, 4-OT, 5-less than 4 hours',
  `reason` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_acl_attendances_user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acl_attendances`
--

LOCK TABLES `acl_attendances` WRITE;
/*!40000 ALTER TABLE `acl_attendances` DISABLE KEYS */;
INSERT INTO `acl_attendances` VALUES (12,2,NULL,'2019-10-07 18:43:24','2019-10-07 18:58:26',5,NULL,'2019-10-07 13:13:24','2019-10-07 13:28:26'),(14,2,NULL,'2019-10-09 12:47:03','2019-10-09 12:47:07',5,NULL,'2019-10-09 07:17:03','2019-10-09 07:17:07'),(15,43,NULL,'2019-10-10 11:07:07','2019-10-10 12:24:56',5,NULL,'2019-10-10 05:37:07','2019-10-10 06:54:56'),(17,2,NULL,'2019-10-10 11:14:11',NULL,0,NULL,'2019-10-10 05:44:11',NULL),(18,2,NULL,'2019-10-11 00:56:32',NULL,0,NULL,'2019-10-10 19:26:32',NULL),(19,43,NULL,'2019-10-11 11:36:11','2019-10-11 11:36:15',5,NULL,'2019-10-11 06:06:11','2019-10-11 06:06:15');
/*!40000 ALTER TABLE `acl_attendances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acl_holidays`
--

DROP TABLE IF EXISTS `acl_holidays`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acl_holidays` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `status` tinyint(4) DEFAULT '0' COMMENT '0-inactive,1-active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acl_holidays`
--

LOCK TABLES `acl_holidays` WRITE;
/*!40000 ALTER TABLE `acl_holidays` DISABLE KEYS */;
INSERT INTO `acl_holidays` VALUES (1,'Dussehra','2019-10-08',1,'2019-10-07 10:20:59','2019-10-07 10:21:55'),(2,'Diwali','2019-10-28',1,'2019-10-07 10:21:15','2019-10-07 10:21:55');
/*!40000 ALTER TABLE `acl_holidays` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acl_logins`
--

DROP TABLE IF EXISTS `acl_logins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acl_logins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `os_version` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `os` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `browser_version` varchar(20) CHARACTER SET utf16 DEFAULT NULL,
  `user_agent` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `browser` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `latitude` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `longitude` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `device` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'mobile/desktop',
  `status` tinyint(4) DEFAULT '0' COMMENT '0-failed login, 1-successful login',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_acl_logins_user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acl_logins`
--

LOCK TABLES `acl_logins` WRITE;
/*!40000 ALTER TABLE `acl_logins` DISABLE KEYS */;
INSERT INTO `acl_logins` VALUES (1,'raj.singh@cardekho.com',43,'unknown','Linux','77.0.3865.75',NULL,'Chrome','127.0.0.1',NULL,NULL,'desktop',1,'2019-10-11 03:44:43',NULL),(2,'rn.kushwaha022@gmail.com',2,'unknown','Linux','69.0',NULL,'Firefox','127.0.0.1',NULL,NULL,'desktop',1,'2019-10-11 03:45:16',NULL),(3,'rn.kushwaha022@gmail.com',2,'unknown','Linux','69.0',NULL,'Firefox','127.0.0.1',NULL,NULL,'desktop',1,'2019-10-11 05:49:34',NULL),(4,'rn.kushwaha022@gmail.com',2,'unknown','Linux','69.0',NULL,'Firefox','127.0.0.1',NULL,NULL,'desktop',1,'2019-10-11 06:07:06',NULL),(5,'rn.kushwaha022@gmail.com',2,'unknown','Linux','69.0',NULL,'Firefox','115.113.240.2',NULL,NULL,'desktop',1,'2019-10-11 06:31:41',NULL);
/*!40000 ALTER TABLE `acl_logins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acl_logs`
--

DROP TABLE IF EXISTS `acl_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acl_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `task` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `started_at` datetime DEFAULT NULL,
  `ended_at` datetime DEFAULT NULL,
  `status` tinyint(4) DEFAULT '0' COMMENT '0-In Progress,1-Completed,2-Hold,3-In QA, 4-Cancelled',
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_acl_logs_user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acl_logs`
--

LOCK TABLES `acl_logs` WRITE;
/*!40000 ALTER TABLE `acl_logs` DISABLE KEYS */;
INSERT INTO `acl_logs` VALUES (8,2,'dasd','2019-10-10 10:01:00','2019-10-10 17:09:00',1,'dasdsa','2019-10-10 13:08:38',NULL),(9,2,'new task','2019-10-11 10:00:00','2019-10-12 12:00:00',0,'dsad','2019-10-11 06:55:38',NULL);
/*!40000 ALTER TABLE `acl_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acl_role`
--

DROP TABLE IF EXISTS `acl_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acl_role` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `role_group_id` int(5) NOT NULL,
  `be_id` int(3) NOT NULL,
  `role` varchar(50) NOT NULL,
  `role_disp_name` varchar(50) NOT NULL,
  `report_role_id` int(5) NOT NULL,
  `user_id` int(10) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `role_group_id` (`role_group_id`,`be_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acl_role`
--

LOCK TABLES `acl_role` WRITE;
/*!40000 ALTER TABLE `acl_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `acl_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acl_users`
--

DROP TABLE IF EXISTS `acl_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acl_users` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `role_id` int(5) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `first_name` varchar(100) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `status` tinyint(4) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_acl_users_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acl_users`
--

LOCK TABLES `acl_users` WRITE;
/*!40000 ALTER TABLE `acl_users` DISABLE KEYS */;
INSERT INTO `acl_users` VALUES (2,0,'','rn.kushwaha022@gmail.com','$2a$08$NUWVp2aqIpBj5GqYL/IsNe2TiyOy1xoiz/mVy3G2P61Cq93tlrXuC',NULL,'RN','','Kushwaha',1,'2019-08-22 04:34:18','2019-10-10 19:25:53'),(39,0,'','sunil.kumar@cardekho.com','$2a$08$qFcRs7/m0StkX1bXLAVXru1e6iaWVPToBGAMfasPcDcvOBT9La.RC','','Sunil','','Kumar',1,'2019-09-30 06:08:24',NULL),(42,0,'','piyush.kumar@cardekho.com','$2a$08$5OLxn22O2ssh19/Umqpjyufk08RN0VbIhlMPD7mwKY5AYFTDpf22W',NULL,'Piyush','','Kumar',1,'2019-10-04 11:01:50',NULL),(43,1,'','raj.singh@cardekho.com','$2a$08$wi51hA5Yu8WwKR9KvrWZL.0RpqqQRAMrnbfS5OWHd3ZoiVKbKpxly',NULL,'Raj','','Singh',1,'2019-10-04 11:03:55',NULL);
/*!40000 ALTER TABLE `acl_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-11 13:05:00
