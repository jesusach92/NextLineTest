-- MySQL Script generated by MySQL Workbench
-- Mon May 22 22:33:48 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema tasks
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `tasks` ;

-- -----------------------------------------------------
-- Schema tasks
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tasks` DEFAULT CHARACTER SET utf8mb3 ;
USE `tasks` ;

-- -----------------------------------------------------
-- Table `tasks`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tasks`.`users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(40) NOT NULL,
  `email` VARCHAR(30) NOT NULL,
  `password` VARCHAR(70) NOT NULL,
  `userType` ENUM('Admin', 'User') NOT NULL DEFAULT 'User',
  `uuid` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 15
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `tasks`.`tasks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tasks`.`tasks` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(36) NOT NULL,
  `title` VARCHAR(50) NOT NULL,
  `description` VARCHAR(100) NOT NULL,
  `status` ENUM('PENDING', 'IN PROGRESS', 'DONE') NULL DEFAULT NULL,
  `dueDate` TIMESTAMP(3) NULL DEFAULT NULL,
  `isPublic` TINYINT(1) NULL DEFAULT NULL,
  `createdBy` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fkUser` (`createdBy` ASC) VISIBLE,
  CONSTRAINT `fkUser`
    FOREIGN KEY (`createdBy`)
    REFERENCES `tasks`.`users` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `tasks`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tasks`.`comments` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(36) NOT NULL,
  `taskID` INT UNSIGNED NOT NULL,
  `uuidTask` VARCHAR(36) NOT NULL,
  `userID` INT UNSIGNED NOT NULL,
  `uuidUser` VARCHAR(36) NOT NULL,
  `comment` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fkComentTask` (`taskID` ASC) VISIBLE,
  INDEX `fkComentUser` (`userID` ASC) VISIBLE,
  CONSTRAINT `fkComentTask`
    FOREIGN KEY (`taskID`)
    REFERENCES `tasks`.`tasks` (`id`),
  CONSTRAINT `fkComentUser`
    FOREIGN KEY (`userID`)
    REFERENCES `tasks`.`users` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `tasks`.`files`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tasks`.`files` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(36) NOT NULL,
  `name` VARCHAR(10) NOT NULL,
  `format` ENUM('Documento', 'Imagen') NULL DEFAULT NULL,
  `url` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `url` (`url` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `tasks`.`tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tasks`.`tags` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(36) NOT NULL,
  `tag` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `tag` (`tag` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `tasks`.`taskfiles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tasks`.`taskfiles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(36) NOT NULL,
  `taskID` INT UNSIGNED NOT NULL,
  `taskUUID` VARCHAR(36) NOT NULL,
  `fileID` INT UNSIGNED NOT NULL,
  `fileUUID` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `taskID` (`taskID` ASC, `fileID` ASC) VISIBLE,
  INDEX `fkFileTask` (`fileID` ASC) VISIBLE,
  CONSTRAINT `fkFileTask`
    FOREIGN KEY (`fileID`)
    REFERENCES `tasks`.`files` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `fkTaskFile`
    FOREIGN KEY (`taskID`)
    REFERENCES `tasks`.`tasks` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `tasks`.`taskshared`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tasks`.`taskshared` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `UserID` INT UNSIGNED NOT NULL,
  `taskID` INT UNSIGNED NOT NULL,
  `responsible` TINYINT(1) NULL DEFAULT '0',
  `uuid` VARCHAR(36) NOT NULL,
  `taskUUID` VARCHAR(36) NOT NULL,
  `userUUID` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `taskID` (`taskID` ASC, `UserID` ASC) VISIBLE,
  INDEX `fkUserTask` (`UserID` ASC) VISIBLE,
  CONSTRAINT `fkTaskUser`
    FOREIGN KEY (`taskID`)
    REFERENCES `tasks`.`tasks` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `fkUserTask`
    FOREIGN KEY (`UserID`)
    REFERENCES `tasks`.`users` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `tasks`.`tasktags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tasks`.`tasktags` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(36) NOT NULL,
  `taskID` INT UNSIGNED NOT NULL,
  `taskUUID` VARCHAR(36) NOT NULL,
  `tagID` INT UNSIGNED NOT NULL,
  `tagUUID` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `taskID` (`taskID` ASC, `tagID` ASC) VISIBLE,
  INDEX `fkTagTask` (`tagID` ASC) VISIBLE,
  CONSTRAINT `fkTagTask`
    FOREIGN KEY (`tagID`)
    REFERENCES `tasks`.`tags` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `fkTaskTag`
    FOREIGN KEY (`taskID`)
    REFERENCES `tasks`.`tasks` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `tasks`.`tokensvalid`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tasks`.`tokensvalid` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `token` VARCHAR(225) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb3;

USE `tasks` ;

-- -----------------------------------------------------
-- Placeholder table for view `tasks`.`tasksharedview`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tasks`.`tasksharedview` (`id` INT, `taskID` INT, `uuidTask` INT, `uuidRelation` INT, `title` INT, `description` INT, `status` INT, `dueDate` INT, `isPublic` INT, `creatorUserID` INT, `uuidCreatorUser` INT, `sharedUserID` INT, `uuidUserShared` INT, `responsible` INT);

-- -----------------------------------------------------
-- View `tasks`.`tasksharedview`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tasks`.`tasksharedview`;
USE `tasks`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `tasks`.`tasksharedview` AS select `tasks`.`taskshared`.`id` AS `id`,`tasks`.`tasks`.`id` AS `taskID`,`tasks`.`tasks`.`uuid` AS `uuidTask`,`tasks`.`taskshared`.`uuid` AS `uuidRelation`,`tasks`.`tasks`.`title` AS `title`,`tasks`.`tasks`.`description` AS `description`,`tasks`.`tasks`.`status` AS `status`,`tasks`.`tasks`.`dueDate` AS `dueDate`,`tasks`.`tasks`.`isPublic` AS `isPublic`,`u2`.`id` AS `creatorUserID`,`u2`.`uuid` AS `uuidCreatorUser`,`u2`.`id` AS `sharedUserID`,`u1`.`uuid` AS `uuidUserShared`,`tasks`.`taskshared`.`responsible` AS `responsible` from (((`tasks`.`taskshared` join `tasks`.`tasks` on((`tasks`.`taskshared`.`taskID` = `tasks`.`tasks`.`id`))) join `tasks`.`users` `u1` on((`tasks`.`taskshared`.`UserID` = `u1`.`id`))) join `tasks`.`users` `u2` on((`tasks`.`tasks`.`createdBy` = `u2`.`id`)));

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
