-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: tasks
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(70) NOT NULL,
  `userType` enum('Admin','User') NOT NULL DEFAULT 'User',
  `uuid` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Jesus Alberto Castillo Hernández','jesusach92@gmail.com','$2b$10$pXt057X3HHCM6FVVFvk1keluTrjRexEuAV8eLtDtrdh92liGKdHLW','Admin','e252e0f0-946c-480c-b969-25f8ed89ab4a'),(3,'Jesus Alberto Castillo Hernández','jesusach@gmail.com','$2b$10$dViaNNsrcEVBW5mcgY7EdO2C.XbA.NamsBWAyn0vixjyzB8eWL7sW','User','b48a5eb5-e136-440b-94c7-394eaf5f9602'),(6,'Jesus Alberto Castillo Hernández','jesus@gmail.com','$2b$10$CgGdnP4C71xdnpm4HNisfObLQl7XjoouFqA4Y.qVBI6zG19gk5E6e','User','b4639a73-3e88-4027-928e-f333d416315b'),(8,'Jesus Alberto Castillo Hernández','Elodia@gmail.com','$2b$10$jywiaJWwwa/kKgwnHE4YKuyD4ZEMKSCgqP7Hh0GqRlMX75DzvfgP6','User','f19fad7f-83d1-4c2c-9b60-64dd98c31016'),(9,'Jesus Alberto Castillo Hernández','elodiaach@gmail.com','$2b$10$gYWVopL3t.FeYN4wF4horOWCXDEg796dCNi.jy8nce1LZgFZt4u9y','User','707521e8-0c51-4b7a-a620-7f009bfe8627'),(10,'Jesus Alberto Castillo Hernández','prueba@gmail.com','$2b$10$bk7fyOm8mWta4lq66ul9uO7C3PQ8Z1VoghpIjZcw5cMohk1WcCZEi','User','4f42cde0-ed4f-4fb7-86ed-aaacf33d2f13'),(11,'Jesus Alberto Castillo Hernández','prueba2@gmail.com','$2b$10$7z8ZEeR7IuJ5Z9k8.DqWZuRQpIBZdd0YEwc68DhFPw.y/5N4pCI7S','User','1ec46b45-613c-4094-83ec-4ca34831f43c'),(12,'Jesus Alberto Castillo Hernández','prueba3@gmail.com','$2b$10$S8kY8dSpvNFb8LxITxIX.uKTYONPhXq5VHvwLMNcUnblbqUpTc5w.','User','ff4a86cd-5ff6-46b8-b735-6a3aa86cc5cd');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-22  9:05:49
