-- MariaDB dump 10.19  Distrib 10.4.21-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: prueba
-- ------------------------------------------------------
-- Server version	10.4.21-MariaDB

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
-- Table structure for table `guerreros`
--

DROP TABLE IF EXISTS `guerreros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `guerreros` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Usuario_Elegido` varchar(50) NOT NULL,
  `Nombre_del_guerrero` varchar(50) NOT NULL,
  `Elemento_del_guerrero` varchar(20) NOT NULL,
  `Habilidad_del_guerrero` varchar(20) NOT NULL,
  `Espiritu_bestia_del_guerrero` varchar(20) NOT NULL,
  `Genero` char(1) DEFAULT NULL,
  `ACTIVO` char(1) NOT NULL,
  `Creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `Modificado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guerreros`
--

LOCK TABLES `guerreros` WRITE;
/*!40000 ALTER TABLE `guerreros` DISABLE KEYS */;
INSERT INTO `guerreros` VALUES (1,'Takuya Kanbara','Agunimon','Fuego','Salamandra Ardiente','Burningreymon','M','S','2022-11-10 16:38:41','2022-11-10 16:38:41'),(2,'Koji Minamoto','Lobomon','Luz','Conquistador de Luz','Kendogarurumon','M','S','2022-11-10 16:43:22','2022-11-10 16:43:22'),(3,'Tommy Hinni','Komamon','Hielo','Golpe helado','Korikakumon','M','N','2022-11-11 16:25:28','2022-11-15 16:16:00'),(4,'Zoe Ayamoto','Kazemon','Viento','Volar','Zephyrmon','F','S','2022-11-12 19:39:22','2022-11-15 16:15:46'),(5,'J.P Shibayama','Beetlemon','Trueno','Golpe trueno','Metalkabuterimon','M','N','2022-11-15 16:15:18','2022-11-15 16:15:56');
/*!40000 ALTER TABLE `guerreros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Usuario` varchar(255) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Apellidos` varchar(255) NOT NULL,
  `Edad` int(3) NOT NULL,
  `Genero` char(1) DEFAULT NULL,
  `Contrasena` varchar(255) NOT NULL,
  `Fecha_Nacimiento` date DEFAULT NULL,
  `Activo` char(1) NOT NULL,
  `Creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `Modificado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (2,'Spooner','Jose Antonio','Rendon Cruz',20,'M','1234','1900-01-01','N','2022-10-11 20:44:27','2022-11-17 17:18:44'),(3,'hacker_boy','Javier','Olmos',25,'M','12345','0000-00-00','S','2022-10-11 20:46:22','2022-10-11 20:46:22'),(4,'Monaco','Jose Antonio ','Dominguez Cabrera',22,'M','123456','2001-08-29','S','2022-10-25 15:37:11','2022-10-26 16:01:28'),(5,'Hudini','Jose Antonio ','Perez Cain',23,'M','12345','2000-06-27','N','2022-10-25 15:45:01','2022-10-26 15:33:00'),(7,'Mary','Maria','Cruz',24,'','$2a$10$2OMonGT00YDYYVVBPMgR3uYvMi4kGnovIFCj3pc.WaH0sfwwOiECq','0000-00-00','S','2022-11-03 16:38:23','2022-11-03 16:38:23'),(8,'Daredevil','Matthew','Murdock',25,'M','1234','1900-01-01','S','2022-11-06 01:29:53','2022-11-07 23:11:08'),(9,'Shehulk','Jennifer','Walters',25,'','$2a$10$E.eafUvnWb0Dqc.Kll4WteswIo4vsyVy34qku/oAuijsJnFvFfDcq','1997-05-20','S','2022-11-07 23:17:13','2022-11-07 23:17:13');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-14 15:10:32
