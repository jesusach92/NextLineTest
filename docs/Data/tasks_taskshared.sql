-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: tasks
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `taskshared`
--

DROP TABLE IF EXISTS `taskshared`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taskshared` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `UserID` int unsigned NOT NULL,
  `taskID` int unsigned NOT NULL,
  `responsible` tinyint(1) DEFAULT '0',
  `uuid` varchar(36) NOT NULL,
  `taskUUID` varchar(36) NOT NULL,
  `userUUID` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `taskID` (`taskID`,`UserID`),
  KEY `fkUserTask` (`UserID`),
  CONSTRAINT `fkTaskUser` FOREIGN KEY (`taskID`) REFERENCES `tasks` (`id`),
  CONSTRAINT `fkUserTask` FOREIGN KEY (`UserID`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taskshared`
--

LOCK TABLES `taskshared` WRITE;
/*!40000 ALTER TABLE `taskshared` DISABLE KEYS */;
INSERT INTO `taskshared` VALUES (5,1,2,0,'10de1b09-d563-4615-9e63-f012bcf11b03','6e9c780c-c88c-4135-9fbf-0c5f29a06d82','e252e0f0-946c-480c-b969-25f8ed89ab4a'),(6,3,2,0,'024f0d7b-f494-497b-9289-a2aed583a484','6e9c780c-c88c-4135-9fbf-0c5f29a06d82','b48a5eb5-e136-440b-94c7-394eaf5f9602'),(7,6,2,1,'40794b1a-18a3-41f2-8901-7b6678243b5f','6e9c780c-c88c-4135-9fbf-0c5f29a06d82','b4639a73-3e88-4027-928e-f333d416315b'),(8,8,2,0,'db408dfe-04de-462f-b6c8-87edc9e9e8f6','6e9c780c-c88c-4135-9fbf-0c5f29a06d82','f19fad7f-83d1-4c2c-9b60-64dd98c31016'),(9,1,3,0,'95454712-78cf-4189-b57a-e7ee0c8a7ffc','64ef1344-08d5-48b3-a394-6ce61e67d87b','e252e0f0-946c-480c-b969-25f8ed89ab4a'),(10,6,3,0,'16b50c74-9028-45a4-85cb-2434ef20e8c1','64ef1344-08d5-48b3-a394-6ce61e67d87b','b4639a73-3e88-4027-928e-f333d416315b'),(11,3,3,1,'c5350399-3b9b-49e8-b440-21214f69f345','64ef1344-08d5-48b3-a394-6ce61e67d87b','b48a5eb5-e136-440b-94c7-394eaf5f9602'),(12,8,3,0,'33092780-ce21-47b2-9210-7a5f72755473','64ef1344-08d5-48b3-a394-6ce61e67d87b','f19fad7f-83d1-4c2c-9b60-64dd98c31016');
/*!40000 ALTER TABLE `taskshared` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-22 17:46:03
