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
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` varchar(100) NOT NULL,
  `status` enum('PENDING','IN PROGRESS','DONE') DEFAULT 'PENDING',
  `dueDate` timestamp(3) NULL DEFAULT NULL,
  `isPublic` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fkUser` (`createdBy`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (5,'ce03a0bc-d8f0-4fca-99bd-45850dcbad56','Desarrollar Nuevos Modulos de Sistema de Tareas','Desarrollar Modulos del sistema de Tareas para la carga marisa de archivos',NULL,'2022-05-24 06:00:00.000',0,'d3d0258a-821f-4ae9-9351-422176f7032f'),(6,'49128568-2d34-4b3e-8945-ab7f4b3ebb73','Desarrollar Nuevos Modulos de Sistema de Tareas','Desarrollar Modulos del sistema de Tareas para la carga marisa de archivos',NULL,'2022-05-24 06:00:00.000',0,'d3d0258a-821f-4ae9-9351-422176f7032f'),(7,'169a0237-a0c0-42f4-a701-68a53739b6ae','Desarrollar Nuevos Modulos de Sistema de Tareas','Desarrollar Modulos del sistema de Tareas para la carga marisa de archivos',NULL,'2022-05-24 06:00:00.000',0,'d3d0258a-821f-4ae9-9351-422176f7032f'),(8,'9ad26cfe-e6c8-4381-ab25-0ec6feb64d08','Desarrollar Nuevos Modulos de Sistema de Tareas','Desarrollar Modulos del sistema de Tareas para la carga marisa de archivos',NULL,'2022-05-24 06:00:00.000',0,'d3d0258a-821f-4ae9-9351-422176f7032f'),(12,'5b220336-cc50-4848-aad1-e0c04d0d5690','Desarrollar Nuevos Modulos de Sistema de Tickets','Desarrollar Modulos del sistema de Tickets para la carga marisa de archivos','PENDING','2022-05-28 06:00:00.000',1,'4f42cde0-ed4f-4fb7-86ed-aaacf33d2f13');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-23 18:04:28
