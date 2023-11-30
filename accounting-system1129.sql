-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: accviewd
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `AccountID` int NOT NULL AUTO_INCREMENT,
  `AccountTypeID` int NOT NULL,
  `SubTitleID` int DEFAULT NULL,
  `CompanyID` int NOT NULL,
  `AccountName` varchar(45) NOT NULL,
  `AccountNote` varchar(45) DEFAULT NULL,
  `TotalAmount` decimal(20,2) DEFAULT NULL,
  PRIMARY KEY (`AccountID`),
  UNIQUE KEY `AccountID_UNIQUE` (`AccountID`),
  KEY `fk_AccountTypeID_idx` (`AccountTypeID`),
  KEY `fk_SubTitleID_idx` (`SubTitleID`),
  KEY `fk_CompanyID_idx` (`CompanyID`),
  CONSTRAINT `fk_AccountTypeID` FOREIGN KEY (`AccountTypeID`) REFERENCES `accounttype` (`AccountTypeID`),
  CONSTRAINT `fk_CompanyID` FOREIGN KEY (`CompanyID`) REFERENCES `company` (`CompanyID`),
  CONSTRAINT `fk_SubTitleID` FOREIGN KEY (`SubTitleID`) REFERENCES `accountsubtitle` (`SubTitleID`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,1,1,3,'Cash',NULL,110.50),(2,2,2,3,'Account Payable',NULL,200.75),(3,1,2,3,'Car',NULL,150.30),(4,2,1,3,'Account4',NULL,250.60),(5,1,1,3,'Account Receivable',NULL,300.80),(6,2,2,3,'Account6',NULL,350.90),(7,1,2,3,'Account7',NULL,175.65),(8,2,1,3,'Account8',NULL,125.45),(9,1,1,3,'Account9',NULL,95.70),(10,2,2,3,'Account10',NULL,220.85),(11,3,1,3,'General Expense',NULL,5.00),(12,4,2,3,'a12',NULL,6.00),(13,3,1,3,'a13',NULL,7.00),(14,4,2,3,'Revenue from sale',NULL,8.00),(15,3,1,3,'a15',NULL,9.00),(16,4,2,3,'a16',NULL,2.00),(17,5,1,3,'Owner\'s Capital',NULL,100.00),(18,1,NULL,3,'Land','The land own by company',NULL),(21,1,NULL,3,'machine','machine own by company',NULL),(22,1,NULL,4,'Cash','test',NULL),(23,2,NULL,3,'bank loan','bank loan in TD bakn',NULL),(24,1,NULL,4,'Account Receivable','account receivable',NULL),(25,3,NULL,4,'General Expense','expense',NULL),(26,4,NULL,4,'Revenue from sale','revenue',NULL),(27,2,NULL,4,'Account Payable','payable',NULL),(28,5,NULL,4,'Owner\'s Capital','my capital',NULL),(29,1,NULL,4,'Car','car',NULL),(30,1,NULL,4,'Land','land',NULL),(31,2,NULL,4,'Bank Loan','bank loan',NULL),(32,2,NULL,4,'Other Liabilities','other liabilities',NULL),(33,4,NULL,4,'Other Revenue','other revenue',NULL),(34,3,NULL,4,'Wages','wages',NULL),(35,3,NULL,4,'Other Expenses','other expense',NULL);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `accountchart`
--

DROP TABLE IF EXISTS `accountchart`;
/*!50001 DROP VIEW IF EXISTS `accountchart`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `accountchart` AS SELECT 
 1 AS `CompanyID`,
 1 AS `CompanyName`,
 1 AS `AccountTypeID`,
 1 AS `AccountTypeName`,
 1 AS `AccountID`,
 1 AS `AccountName`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `accountsubtitle`
--

DROP TABLE IF EXISTS `accountsubtitle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accountsubtitle` (
  `SubTitleID` int NOT NULL AUTO_INCREMENT,
  `SubTitleName` varchar(45) NOT NULL,
  PRIMARY KEY (`SubTitleID`),
  UNIQUE KEY `SubTitleID_UNIQUE` (`SubTitleID`),
  UNIQUE KEY `SubTitleName_UNIQUE` (`SubTitleName`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accountsubtitle`
--

LOCK TABLES `accountsubtitle` WRITE;
/*!40000 ALTER TABLE `accountsubtitle` DISABLE KEYS */;
INSERT INTO `accountsubtitle` VALUES (1,'Subtitle1'),(2,'Subtitle2');
/*!40000 ALTER TABLE `accountsubtitle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounttype`
--

DROP TABLE IF EXISTS `accounttype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounttype` (
  `AccountTypeID` int NOT NULL AUTO_INCREMENT,
  `AccountTypeName` varchar(45) NOT NULL,
  PRIMARY KEY (`AccountTypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounttype`
--

LOCK TABLES `accounttype` WRITE;
/*!40000 ALTER TABLE `accounttype` DISABLE KEYS */;
INSERT INTO `accounttype` VALUES (1,'Asset'),(2,'Liability'),(3,'Expense'),(4,'Revenue'),(5,'Equity');
/*!40000 ALTER TABLE `accounttype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `AddressID` int NOT NULL AUTO_INCREMENT,
  `Country` varchar(45) NOT NULL,
  `Province` varchar(45) NOT NULL,
  `City` varchar(45) NOT NULL,
  PRIMARY KEY (`AddressID`),
  UNIQUE KEY `AddressID_UNIQUE` (`AddressID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'US','California','Los Angeles'),(2,'Canada','Ontario','Toronto'),(3,'Canadaaaa','Ontario','Windsor'),(4,'Canadaaaa','Ontario','Windsor'),(5,'Canadaaaa','Ontario','Windsor'),(6,'Canadaaaa','Ontario','Windsor'),(7,'Canadaaaa','Ontario','Windsor');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `balancesheetc`
--

DROP TABLE IF EXISTS `balancesheetc`;
/*!50001 DROP VIEW IF EXISTS `balancesheetc`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `balancesheetc` AS SELECT 
 1 AS `CompanyID`,
 1 AS `CompanyName`,
 1 AS `AccountTypeID`,
 1 AS `AccountTypeName`,
 1 AS `AccountID`,
 1 AS `AccountName`,
 1 AS `acctotalamount`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `bill`
--

DROP TABLE IF EXISTS `bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill` (
  `BillID` int NOT NULL AUTO_INCREMENT,
  `TransactionID` int NOT NULL,
  `SupplierID` int NOT NULL,
  `BillItem` varchar(45) DEFAULT NULL,
  `DueDate` date NOT NULL,
  `PaymentStatus` varchar(45) NOT NULL,
  PRIMARY KEY (`BillID`),
  UNIQUE KEY `BillID_UNIQUE` (`BillID`),
  KEY `fk_bill_transactionID_idx` (`TransactionID`),
  KEY `fk_bill_SupplierID_idx` (`SupplierID`),
  CONSTRAINT `fk_bill_SupplierID` FOREIGN KEY (`SupplierID`) REFERENCES `supplier` (`SupplierID`),
  CONSTRAINT `fk_bill_transactionID` FOREIGN KEY (`TransactionID`) REFERENCES `transaction` (`TransactionID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill`
--

LOCK TABLES `bill` WRITE;
/*!40000 ALTER TABLE `bill` DISABLE KEYS */;
INSERT INTO `bill` VALUES (1,19,1,'TypeC','2023-11-15','Paid'),(2,21,2,'TypeD','2023-11-16','Unpaid'),(3,104,1,'buy 100 oranges','3333-03-03','Unpaid'),(4,106,2,'water bill','4444-05-05','Unpaid'),(5,108,2,'gas bill','2222-03-03','Unpaid'),(6,124,4,'bought 1000 bananas from Burns','3333-03-03','Unpaid'),(7,130,5,'bought 100 apples from Lisa','3333-03-03','Unpaid'),(8,132,5,'buy 200 oranges from Lisa','3333-04-04','Unpaid'),(9,134,5,'buy 1000 coconuts from Lisa','2222-02-02','Unpaid');
/*!40000 ALTER TABLE `bill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `bills`
--

DROP TABLE IF EXISTS `bills`;
/*!50001 DROP VIEW IF EXISTS `bills`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `bills` AS SELECT 
 1 AS `CompanyID`,
 1 AS `CompanyName`,
 1 AS `AccountTypeID`,
 1 AS `AccountTypeName`,
 1 AS `AccountID_from_Account`,
 1 AS `AccountID_from_Transaction`,
 1 AS `AccountName`,
 1 AS `TransactionID`,
 1 AS `Date`,
 1 AS `Amount`,
 1 AS `Description`,
 1 AS `TransactionID_bill`,
 1 AS `BillID`,
 1 AS `SupplierID`,
 1 AS `BillItem`,
 1 AS `DueDate`,
 1 AS `PaymentStatus`,
 1 AS `SupplierName`,
 1 AS `SupplierEmail`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `CompanyID` int NOT NULL AUTO_INCREMENT,
  `UserID` int NOT NULL,
  `AddressID` int DEFAULT NULL,
  `CompanyCreatedDate` date DEFAULT NULL,
  `CompanyName` varchar(45) NOT NULL,
  `CompanyEmail` varchar(45) DEFAULT NULL,
  `CompanyStamp` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`CompanyID`),
  UNIQUE KEY `CompanyID_UNIQUE` (`CompanyID`),
  UNIQUE KEY `CompanyStamp_UNIQUE` (`CompanyStamp`),
  KEY `UserID_idx` (`UserID`),
  KEY `AddresID_idx` (`AddressID`),
  CONSTRAINT `fk_AddressID` FOREIGN KEY (`AddressID`) REFERENCES `address` (`AddressID`),
  CONSTRAINT `fk_UserID` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (3,3,2,'2023-11-27','Yiheng Inc.','yiheng@gm.com','stamp3'),(4,11,NULL,NULL,'Jerry Inc.',NULL,NULL);
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `CustomerID` int NOT NULL AUTO_INCREMENT,
  `AddressID` int DEFAULT NULL,
  `CustomerName` varchar(45) NOT NULL,
  `CustomerEmail` varchar(45) NOT NULL,
  `CustomerType` varchar(45) DEFAULT NULL,
  `CompanyID` int NOT NULL,
  PRIMARY KEY (`CustomerID`),
  UNIQUE KEY `CustomerID_UNIQUE` (`CustomerID`),
  KEY `fk_customer_AddressID_idx` (`AddressID`),
  CONSTRAINT `fk_customer_AddressID` FOREIGN KEY (`AddressID`) REFERENCES `address` (`AddressID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,1,'Customer1','customer1@mail.com','TypeA',3),(2,2,'Customer2','customer2@mail.com','TypeB',3),(3,NULL,'Mr. Mark','mark@gmail.com',NULL,3),(4,NULL,'Bart','bart@gmail.com',NULL,3),(5,NULL,'Meg','meg@mmail.com',NULL,3),(6,NULL,'Marge','marge@mail.com',NULL,3),(7,NULL,'Milhouse','mil@mail.com',NULL,4),(8,NULL,'Bart Simpsom','bart@mail.com',NULL,4);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `InvoiceID` int NOT NULL AUTO_INCREMENT,
  `TransactionID` int NOT NULL,
  `CustomerID` int NOT NULL,
  `InvoiceItem` varchar(45) DEFAULT NULL,
  `DueDate` date NOT NULL,
  `PaymentStatus` varchar(45) NOT NULL,
  PRIMARY KEY (`InvoiceID`),
  UNIQUE KEY `InvoiceID_UNIQUE` (`InvoiceID`),
  KEY `fk_invoice_TransactionID_idx` (`TransactionID`),
  KEY `fk_invoice_CustomerID_idx` (`CustomerID`),
  CONSTRAINT `fk_invoice_CustomerID` FOREIGN KEY (`CustomerID`) REFERENCES `customer` (`CustomerID`),
  CONSTRAINT `fk_invoice_TransactionID` FOREIGN KEY (`TransactionID`) REFERENCES `transaction` (`TransactionID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
INSERT INTO `invoice` VALUES (1,20,1,'TypeE','2023-11-15','Paid'),(2,22,2,'TypeF','2023-11-16','Unpaid'),(3,84,1,'asdf','3333-03-03','Unpaid'),(4,86,1,'income from sale','6666-07-07','Unpaid'),(5,88,1,'sale of banana','2323-07-07','Unpaid'),(6,102,1,'income from sale','3333-03-03','Unpaid'),(7,110,1,'sale of banana','2222-02-02','Unpaid'),(8,122,3,'sold 1000 oranges to Mark','4444-04-04','Unpaid'),(9,136,7,'sell 1000 toys to milhouse','3333-03-03','Unpaid');
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!50001 DROP VIEW IF EXISTS `invoices`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `invoices` AS SELECT 
 1 AS `CompanyID`,
 1 AS `CompanyName`,
 1 AS `AccountTypeID`,
 1 AS `AccountTypeName`,
 1 AS `AccountID_from_Account`,
 1 AS `AccountID_from_Transaction`,
 1 AS `AccountName`,
 1 AS `TransactionID`,
 1 AS `Date`,
 1 AS `Amount`,
 1 AS `Description`,
 1 AS `TransactionID_invoice`,
 1 AS `InvoiceID`,
 1 AS `CustomerID`,
 1 AS `InvoiceItem`,
 1 AS `DueDate`,
 1 AS `PaymentStatus`,
 1 AS `CustomerName`,
 1 AS `CustomerEmail`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier` (
  `SupplierID` int NOT NULL AUTO_INCREMENT,
  `AddressID` int DEFAULT NULL,
  `SupplierName` varchar(45) NOT NULL,
  `SupplierEmail` varchar(45) NOT NULL,
  `SupplierType` varchar(45) DEFAULT NULL,
  `CompanyID` int NOT NULL,
  PRIMARY KEY (`SupplierID`),
  UNIQUE KEY `SupplierID_UNIQUE` (`SupplierID`),
  KEY `fk_supplier_AddressID_idx` (`AddressID`),
  CONSTRAINT `fk_supplier_AddressID` FOREIGN KEY (`AddressID`) REFERENCES `address` (`AddressID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES (1,1,'Supplier1','supplier1@mail.com','TypeX',3),(2,2,'Supplier2','supplier2@mail.com','TypeY',3),(3,NULL,'Homer','homer@gmail.com',NULL,3),(4,NULL,'Mr. Burns','burns@mail.com',NULL,3),(5,NULL,'Lisa','lisa@mail.com',NULL,4);
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `TransactionID` int NOT NULL AUTO_INCREMENT,
  `AccountID` int NOT NULL,
  `Date` date NOT NULL,
  `Amount` decimal(20,2) NOT NULL,
  `Description` varchar(1000) DEFAULT NULL,
  `TransactionType` int DEFAULT '1',
  PRIMARY KEY (`TransactionID`),
  UNIQUE KEY `Transaction_UNIQUE` (`TransactionID`),
  KEY `AccountID_idx` (`AccountID`),
  CONSTRAINT `fk_transaction_AccountID` FOREIGN KEY (`AccountID`) REFERENCES `account` (`AccountID`)
) ENGINE=InnoDB AUTO_INCREMENT=158 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (1,1,'2023-11-24',50.25,'Description1',2),(2,2,'2023-11-24',75.50,'Description2',2),(3,3,'2023-11-24',80.35,'Description3',3),(4,4,'2023-11-24',105.40,'Description4',3),(5,5,'2023-11-24',60.15,'Description5',NULL),(6,6,'2023-11-24',120.50,'Description6',NULL),(7,7,'2023-11-24',90.65,'Description7',NULL),(8,8,'2023-11-24',110.75,'Description8',NULL),(9,9,'2023-11-24',50.80,'Description9',NULL),(10,10,'2023-10-24',135.90,'Description10',NULL),(11,3,'2023-11-24',125.00,'Description3',NULL),(12,4,'2023-11-24',60.00,'Description4',NULL),(13,5,'2023-11-24',150.00,'Description5',NULL),(14,6,'2023-11-24',80.00,'Description6',NULL),(15,7,'2023-11-24',95.00,'Description7',NULL),(16,8,'2023-11-24',110.00,'Description8',NULL),(17,9,'2023-11-24',140.00,'Description9',NULL),(18,10,'2023-11-24',170.00,'Description10',NULL),(19,11,'2023-11-24',5.00,NULL,NULL),(20,12,'2023-11-24',6.00,NULL,NULL),(21,13,'2023-11-24',7.00,NULL,NULL),(22,14,'2023-11-24',8.00,NULL,NULL),(23,15,'2023-11-24',2.00,NULL,NULL),(24,16,'2023-11-24',3.00,NULL,NULL),(25,11,'2023-11-24',4.00,NULL,NULL),(26,12,'2023-11-24',5.00,NULL,NULL),(27,13,'2023-11-24',6.00,NULL,NULL),(28,17,'2023-11-24',-123.85,NULL,NULL),(30,3,'2023-11-24',1111.00,'first journal',1),(31,17,'2023-11-24',-1111.00,'first journal',1),(33,3,'2023-11-24',222.00,'second j',1),(34,17,'2023-11-24',-222.00,'second j',1),(35,3,'2023-11-24',0.00,'33333',1),(36,17,'2023-11-24',0.00,'33333',1),(37,3,'2023-11-24',0.00,'111111',1),(38,17,'2023-11-24',0.00,'111111',1),(39,1,'2023-11-24',0.00,'journal1043',1),(40,17,'2023-11-24',0.00,'journal1043',1),(41,1,'2023-11-24',0.00,'journal1043',1),(42,17,'2023-11-24',0.00,'journal1043',1),(43,1,'2023-11-24',0.00,'journal1111',1),(44,17,'2023-11-24',0.00,'journal1111',1),(45,1,'2023-11-24',0.00,'j1131',1),(46,17,'2023-11-24',0.00,'j1131',1),(47,1,'2023-11-24',999.00,'j1131',1),(48,17,'2023-11-24',999.00,'j1131',1),(49,1,'2023-11-24',-123.00,'1149',1),(50,3,'2023-11-24',123.00,'1149',1),(51,11,'2023-11-24',456.00,'j1251',1),(52,1,'2023-11-24',-400.00,'j1251',1),(53,3,'2023-11-24',-56.00,'j1251',1),(54,1,'2023-11-24',10.00,'1255',1),(55,5,'2023-11-24',30.00,'1255',1),(56,10,'2023-11-24',20.00,'1255',1),(57,2,'2023-11-24',20.00,'1255',1),(58,17,'2023-11-24',2666.00,'adjust',1),(59,1,'2023-11-24',249.85,'revenue',1),(60,12,'2023-11-24',249.85,'revenue',1),(61,1,'2023-11-24',500.00,'income',1),(62,12,'2023-11-24',500.00,'income',1),(63,1,'2023-11-24',-100.00,'expense',1),(64,15,'2023-11-24',100.00,'expense',1),(65,1,'2023-11-24',900.00,'invest',1),(66,17,'2023-11-24',900.00,'invest',1),(67,5,'2023-11-24',700.00,'invest2',1),(68,17,'2023-11-24',700.00,'invest2',1),(69,3,'2023-11-24',-500.00,'lose',1),(70,11,'2023-11-24',500.00,'lose',1),(71,5,'2023-11-24',-500.00,'sale asset',1),(72,1,'2023-11-24',500.00,'sale asset',1),(73,3,'2023-11-24',-150.30,'lost the car',1),(74,11,'2023-11-24',150.30,'lost the car',1),(75,3,'2023-11-24',-955.05,'lost the car',1),(76,11,'2023-11-24',955.05,'lost the car',1),(77,3,'2023-11-24',500.00,'bought a car',1),(78,1,'2023-11-24',-500.00,'bought a car',1),(79,1,'2023-11-24',605.35,'invest3',1),(80,17,'2023-11-24',605.35,'invest3',1),(81,1,'2023-11-24',-1000.00,'buy car',1),(82,3,'2023-11-24',1000.00,'buy car',1),(83,5,'2023-11-24',100.00,'asdf',2),(84,14,'2023-11-24',100.00,'asdf',2),(85,5,'2023-11-24',2000.00,'income from sale',2),(86,14,'2023-11-24',2000.00,'income from sale',2),(87,5,'2023-11-24',2000.00,'sale of banana',2),(88,14,'2023-11-24',2000.00,'sale of banana',2),(101,5,'2023-11-24',1000.00,'income from sale',2),(102,14,'2023-11-24',1000.00,'income from sale',2),(103,2,'2023-11-24',1000.00,'buy 100 oranges',3),(104,11,'2023-11-24',1000.00,'buy 100 oranges',3),(105,2,'2023-11-24',1000.00,'water bill',3),(106,11,'2023-11-24',1000.00,'water bill',3),(107,2,'2023-11-24',2000.00,'gas bill',3),(108,11,'2023-11-24',2000.00,'gas bill',3),(109,5,'2023-11-24',5000.00,'sale of banana',2),(110,14,'2023-11-24',5000.00,'sale of banana',2),(111,1,'2023-11-24',-1000.00,'buy land',1),(112,18,'2023-11-24',1000.00,'buy land',1),(113,1,'2023-11-24',10000.00,'add invest',1),(114,17,'2023-11-24',10000.00,'add invest',1),(115,21,'2023-11-24',1000.00,'buy machine',1),(116,1,'2023-11-24',-1000.00,'buy machine',1),(117,22,'2023-11-24',1000.00,'test cash1',1),(118,22,'2023-11-24',-1000.00,'test cash1',1),(119,1,'2023-11-24',1000.00,'more bank loan',1),(120,23,'2023-11-24',1000.00,'more bank loan',1),(121,5,'2023-11-24',1000.00,'sold 1000 oranges to Mark',2),(122,14,'2023-11-24',1000.00,'sold 1000 oranges to Mark',2),(123,2,'2023-11-24',1000.00,'bought 1000 bananas from Burns',3),(124,11,'2023-11-24',1000.00,'bought 1000 bananas from Burns',3),(125,22,'2023-11-24',10000.00,'jerry invest',1),(126,28,'2023-11-24',10000.00,'jerry invest',1),(127,24,'2023-11-24',100.00,'sell 100 toy cars to milhouse',2),(128,26,'2023-11-24',100.00,'sell 100 toy cars to milhouse',2),(129,27,'2023-11-24',100.00,'bought 100 apples from Lisa',3),(130,25,'2023-11-24',100.00,'bought 100 apples from Lisa',3),(131,27,'2023-11-24',200.00,'buy 200 oranges from Lisa',3),(132,25,'2023-11-24',200.00,'buy 200 oranges from Lisa',3),(133,27,'2023-11-24',1000.00,'buy 1000 coconuts from Lisa',3),(134,25,'2023-11-24',1000.00,'buy 1000 coconuts from Lisa',3),(135,24,'2023-11-24',1000.00,'sell 1000 toys to milhouse',2),(136,26,'2023-11-24',1000.00,'sell 1000 toys to milhouse',2),(138,22,'2023-11-24',-1000.00,'buy a car',1),(139,29,'2023-11-24',1000.00,'buy a car',1),(140,22,'2023-11-24',-1000.00,'buy 1000$ land',1),(141,30,'2023-11-24',1000.00,'buy 1000$ land',1),(142,22,'2023-11-24',500.00,'borrow 500 ',1),(143,31,'2023-11-24',500.00,'borrow 500 ',1),(144,22,'2023-11-24',500.00,'borrow 500 ',1),(145,32,'2023-11-24',500.00,'borrow 500 ',1),(146,22,'2023-11-24',5000.00,'revenue',1),(147,33,'2023-11-24',5000.00,'revenue',1),(156,22,'2023-11-30',-10000.00,'paid 10000 dollar wages by cash',1),(157,34,'2023-11-30',10000.00,'paid 10000 dollar wages by cash',1);
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `transactionsheet`
--

DROP TABLE IF EXISTS `transactionsheet`;
/*!50001 DROP VIEW IF EXISTS `transactionsheet`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `transactionsheet` AS SELECT 
 1 AS `CompanyID`,
 1 AS `CompanyName`,
 1 AS `CompanyStamp`,
 1 AS `AccountTypeID`,
 1 AS `AccountTypeName`,
 1 AS `AccountID_from_Account`,
 1 AS `AccountID_from_Transaction`,
 1 AS `AccountName`,
 1 AS `TransactionID`,
 1 AS `Date`,
 1 AS `Amount`,
 1 AS `Description`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `UserEmail` varchar(45) NOT NULL,
  `UserType` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `UserID_UNIQUE` (`UserID`),
  UNIQUE KEY `UserEmail_UNIQUE` (`UserEmail`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (3,'yiheng','$2b$10$ffgPE9ljJpXbApz.QGdu2OrzCH3EX7/jll8IjyizvG/p/OpsGYebG','gao43@uwindsor.ca','premium'),(4,'tom','$2b$10$IZVi62gPHR6A5IaxbwdqPuI6cwliHktIqGu7q7jysBeVL4JUC.fRu','tom@gmail.com','premium'),(11,'Jerry','$2b$10$tMlPINZ1v9x2X7n9J/uvOOpwUu2YDuEL/kx11RcaeqpJHLl2aCTky','jerry@mail.com','premium');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `accountchart`
--

/*!50001 DROP VIEW IF EXISTS `accountchart`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `accountchart` AS select `c`.`CompanyID` AS `CompanyID`,`c`.`CompanyName` AS `CompanyName`,`a`.`AccountTypeID` AS `AccountTypeID`,`act`.`AccountTypeName` AS `AccountTypeName`,`a`.`AccountID` AS `AccountID`,`a`.`AccountName` AS `AccountName` from ((`company` `c` join `account` `a` on((`c`.`CompanyID` = `a`.`CompanyID`))) join `accounttype` `act` on((`a`.`AccountTypeID` = `act`.`AccountTypeID`))) group by `a`.`AccountID` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `balancesheetc`
--

/*!50001 DROP VIEW IF EXISTS `balancesheetc`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `balancesheetc` AS select `c`.`CompanyID` AS `CompanyID`,`c`.`CompanyName` AS `CompanyName`,`a`.`AccountTypeID` AS `AccountTypeID`,`act`.`AccountTypeName` AS `AccountTypeName`,`a`.`AccountID` AS `AccountID`,`a`.`AccountName` AS `AccountName`,coalesce(sum(`t`.`Amount`),0) AS `acctotalamount` from (((`company` `c` join `account` `a` on((`c`.`CompanyID` = `a`.`CompanyID`))) join `accounttype` `act` on((`a`.`AccountTypeID` = `act`.`AccountTypeID`))) left join `transaction` `t` on((`a`.`AccountID` = `t`.`AccountID`))) group by `a`.`AccountID` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `bills`
--

/*!50001 DROP VIEW IF EXISTS `bills`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `bills` AS select `c`.`CompanyID` AS `CompanyID`,`c`.`CompanyName` AS `CompanyName`,`a`.`AccountTypeID` AS `AccountTypeID`,`act`.`AccountTypeName` AS `AccountTypeName`,`a`.`AccountID` AS `AccountID_from_Account`,`t`.`AccountID` AS `AccountID_from_Transaction`,`a`.`AccountName` AS `AccountName`,`t`.`TransactionID` AS `TransactionID`,`t`.`Date` AS `Date`,`t`.`Amount` AS `Amount`,`t`.`Description` AS `Description`,`bil`.`TransactionID` AS `TransactionID_bill`,`bil`.`BillID` AS `BillID`,`bil`.`SupplierID` AS `SupplierID`,`bil`.`BillItem` AS `BillItem`,`bil`.`DueDate` AS `DueDate`,`bil`.`PaymentStatus` AS `PaymentStatus`,`s`.`SupplierName` AS `SupplierName`,`s`.`SupplierEmail` AS `SupplierEmail` from (((((`company` `c` join `account` `a` on((`c`.`CompanyID` = `a`.`CompanyID`))) join `accounttype` `act` on((`a`.`AccountTypeID` = `act`.`AccountTypeID`))) join `transaction` `t` on((`a`.`AccountID` = `t`.`AccountID`))) join `bill` `bil` on((`t`.`TransactionID` = `bil`.`TransactionID`))) join `supplier` `s` on((`bil`.`SupplierID` = `s`.`SupplierID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `invoices`
--

/*!50001 DROP VIEW IF EXISTS `invoices`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `invoices` AS select `c`.`CompanyID` AS `CompanyID`,`c`.`CompanyName` AS `CompanyName`,`a`.`AccountTypeID` AS `AccountTypeID`,`act`.`AccountTypeName` AS `AccountTypeName`,`a`.`AccountID` AS `AccountID_from_Account`,`t`.`AccountID` AS `AccountID_from_Transaction`,`a`.`AccountName` AS `AccountName`,`t`.`TransactionID` AS `TransactionID`,`t`.`Date` AS `Date`,`t`.`Amount` AS `Amount`,`t`.`Description` AS `Description`,`inv`.`TransactionID` AS `TransactionID_invoice`,`inv`.`InvoiceID` AS `InvoiceID`,`inv`.`CustomerID` AS `CustomerID`,`inv`.`InvoiceItem` AS `InvoiceItem`,`inv`.`DueDate` AS `DueDate`,`inv`.`PaymentStatus` AS `PaymentStatus`,`cust`.`CustomerName` AS `CustomerName`,`cust`.`CustomerEmail` AS `CustomerEmail` from (((((`company` `c` join `account` `a` on((`c`.`CompanyID` = `a`.`CompanyID`))) join `accounttype` `act` on((`a`.`AccountTypeID` = `act`.`AccountTypeID`))) join `transaction` `t` on((`a`.`AccountID` = `t`.`AccountID`))) join `invoice` `inv` on((`t`.`TransactionID` = `inv`.`TransactionID`))) join `customer` `cust` on((`inv`.`CustomerID` = `cust`.`CustomerID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `transactionsheet`
--

/*!50001 DROP VIEW IF EXISTS `transactionsheet`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `transactionsheet` AS select `c`.`CompanyID` AS `CompanyID`,`c`.`CompanyName` AS `CompanyName`,`c`.`CompanyStamp` AS `CompanyStamp`,`a`.`AccountTypeID` AS `AccountTypeID`,`act`.`AccountTypeName` AS `AccountTypeName`,`a`.`AccountID` AS `AccountID_from_Account`,`t`.`AccountID` AS `AccountID_from_Transaction`,`a`.`AccountName` AS `AccountName`,`t`.`TransactionID` AS `TransactionID`,`t`.`Date` AS `Date`,`t`.`Amount` AS `Amount`,`t`.`Description` AS `Description` from (((`company` `c` join `account` `a` on((`c`.`CompanyID` = `a`.`CompanyID`))) join `accounttype` `act` on((`a`.`AccountTypeID` = `act`.`AccountTypeID`))) join `transaction` `t` on((`a`.`AccountID` = `t`.`AccountID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-29 19:55:12
