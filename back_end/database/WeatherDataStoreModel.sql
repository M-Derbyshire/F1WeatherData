-- MySQL Script generated by MySQL Workbench
-- Sat Apr 24 19:10:38 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema WeatherDataStore
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `WeatherDataStore` ;

-- -----------------------------------------------------
-- Schema WeatherDataStore
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `WeatherDataStore` DEFAULT CHARACTER SET utf8 ;
USE `WeatherDataStore` ;

-- -----------------------------------------------------
-- Table `WeatherDataStore`.`Contributer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WeatherDataStore`.`Contributer` ;

CREATE TABLE IF NOT EXISTS `WeatherDataStore`.`Contributer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(250) NOT NULL,
  `active` BIT(1) NOT NULL DEFAULT 1,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WeatherDataStore`.`Country`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WeatherDataStore`.`Country` ;

CREATE TABLE IF NOT EXISTS `WeatherDataStore`.`Country` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(70) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WeatherDataStore`.`Circuit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WeatherDataStore`.`Circuit` ;

CREATE TABLE IF NOT EXISTS `WeatherDataStore`.`Circuit` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `API_id` VARCHAR(45) NULL,
  `name` VARCHAR(60) NOT NULL,
  `countryID` INT NOT NULL,
  `lat` DECIMAL(10,8) NOT NULL,
  `long` DECIMAL(11,8) NOT NULL,
  `Locality` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `country_idx` (`countryID` ASC) VISIBLE,
  CONSTRAINT `country`
    FOREIGN KEY (`countryID`)
    REFERENCES `WeatherDataStore`.`Country` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WeatherDataStore`.`Round`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WeatherDataStore`.`Round` ;

CREATE TABLE IF NOT EXISTS `WeatherDataStore`.`Round` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `number` INT NOT NULL,
  `circuitID` INT NOT NULL,
  `quarter` INT NOT NULL,
  `raceDate` DATE NOT NULL,
  `raceTimeUTC` TIME NULL,
  `raceName` VARCHAR(100) NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `creator_idx` (`createdBy` ASC) VISIBLE,
  INDEX `circuit_idx` (`circuitID` ASC) VISIBLE,
  CONSTRAINT `creator`
    FOREIGN KEY (`createdBy`)
    REFERENCES `WeatherDataStore`.`Contributer` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `circuit`
    FOREIGN KEY (`circuitID`)
    REFERENCES `WeatherDataStore`.`Circuit` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WeatherDataStore`.`Weather`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WeatherDataStore`.`Weather` ;

CREATE TABLE IF NOT EXISTS `WeatherDataStore`.`Weather` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `weatherStation` VARCHAR(20) NOT NULL,
  `roundID` INT NOT NULL,
  `time` DATETIME NULL,
  `airTemp` FLOAT NULL,
  `dewPoint` FLOAT NULL,
  `relativeHumidity` INT NULL,
  `hourTotalPrecipitation` FLOAT NULL,
  `snowDepth` INT NULL,
  `windDirection` INT NULL,
  `avgWindSpeed` FLOAT NULL,
  `peakWindGust` FLOAT NULL,
  `airPressure` FLOAT NULL,
  `hourTotalSunshine` INT NULL,
  `conditionCode` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `round_idx` (`roundID` ASC) VISIBLE,
  CONSTRAINT `round`
    FOREIGN KEY (`roundID`)
    REFERENCES `WeatherDataStore`.`Round` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;

USE `WeatherDataStore` ;

-- -----------------------------------------------------
-- Placeholder table for view `WeatherDataStore`.`vwRoundWeatherData`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WeatherDataStore`.`vwRoundWeatherData` (`year` INT, `quarter` INT, `round` INT, `circuitId` INT, `circuitName` INT, `country` INT, `lat` INT, `long` INT, `locality` INT, `raceDate` INT, `raceTime` INT, `raceName` INT, `stationID` INT, `weather_time` INT, `weather_coco` INT, `weather_dwpt` INT, `weather_prcp` INT, `weather_pres` INT, `weather_rhum` INT, `weather_snow` INT, `weather_temp` INT, `weather_tsun` INT, `weather_wdir` INT, `weather_wpgt` INT, `weather_wspd` INT);

-- -----------------------------------------------------
-- procedure spAddWeatherData
-- -----------------------------------------------------

USE `WeatherDataStore`;
DROP procedure IF EXISTS `WeatherDataStore`.`spAddWeatherData`;

DELIMITER $$
USE `WeatherDataStore`$$
CREATE PROCEDURE `spAddWeatherData` (
	IN inCreatingUserID INT,
    IN inQuarter INT,
    IN inRound INT,
    IN inCircuitID VARCHAR(45),
    IN inCircuitName VARCHAR(60),
    IN inCountry VARCHAR(70),
    IN inLat DECIMAL(10, 8),
    IN inLong DECIMAL(11, 8),
    IN inLocality VARCHAR(45),
    IN inRaceDate DATE,
    IN inRaceTime TIME,
    IN inRaceName VARCHAR(100),
    IN inStationID VARCHAR(20),
    IN in_we_time DATETIME,
    IN in_we_coco INT,
    IN in_we_dwpt FLOAT,
    IN in_we_prcp FLOAT,
    IN in_we_pres FLOAT,
    IN in_we_rhum INT,
    IN in_we_snow INT,
    IN in_we_temp FLOAT,
    IN in_we_tsun INT,
    IN in_we_wdir INT,
    IN in_we_wpgt FLOAT,
    IN in_we_wspd FLOAT
)
BEGIN
	-- Error handling
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
        RESIGNAL;
	END;
    
    
    
    START TRANSACTION;
    
	-- If the round already exists, this shouldn't have been called.
    -- So we'll signal an error if that's the case.
    SET @roundPK = -1;
    SELECT id INTO @roundPK FROM Round WHERE raceDate = inRaceDate AND `quarter` = inQuarter LIMIT 1;
    IF(@roundPK <> -1) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This round\'s information already exists in the database.';
    ELSE
		
        
		-- Now, get/create a circuit and country.
        SET @circuitPK = -1;
        SELECT id INTO @circuitPK FROM Circuit WHERE API_ID = inCircuitID LIMIT 1;
        IF(@circuitPK = -1) THEN
			
			SET @countryPK = -1;
            SELECT id INTO @countryPK FROM Country WHERE `name` = inCountry LIMIT 1;
            IF(@countryPK = -1) THEN
				INSERT INTO Country (`name`) VALUES (inCountry);
                SELECT LAST_INSERT_ID() INTO @countryPK;
            END IF;
            
            INSERT INTO Circuit (API_ID, `name`, countryID, lat, `long`, locality) 
				VALUES (inCircuitID, inCircuitName, @countryPK, inLat, inLong, inLocality);
            SELECT LAST_INSERT_ID() INTO @circuitPK;
        END IF;
        
        
        
        -- Now we need to setup the round record (or throw an error if the user doesn't exist).
        SET @contributerPK = -1;
        SELECT id INTO @contributerPK FROM Contributer WHERE id = inCreatingUserID LIMIT 1;
        IF(@contributerPK = -1) THEN 
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The provided user ID does not exist in the database.';
		ELSE
			INSERT INTO Round (`number`, circuitID, `quarter`, raceDate, raceTimeUTC, raceName, createdBy) 
				VALUES (inRound, @circuitPK, inQuarter, inRaceDate, inRaceTime, inRaceName, @contributerPK);
			SELECT LAST_INSERT_ID() INTO @roundPK;
        END IF;
        
		
		
        
        -- Now we need to add the Weather record, if any weather data exists
        -- If there was no weather data available, we just don't create a Weather record at all
        IF(in_we_coco IS NOT NULL OR in_we_dwpt IS NOT NULL OR in_we_prcp IS NOT NULL OR in_we_pres IS NOT NULL OR
			in_we_rhum IS NOT NULL OR in_we_snow IS NOT NULL OR in_we_temp IS NOT NULL OR in_we_tsun IS NOT NULL OR
            in_we_wdir IS NOT NULL OR in_we_wpgt IS NOT NULL OR in_we_wspd IS NOT NULL) 
		THEN
			INSERT INTO Weather (roundID, `time`, weatherStation, airTemp, dewPoint, relativeHumidity, hourTotalPrecipitation, snowDepth, 
				windDirection, avgWindSpeed, peakWindGust, airPressure, hourTotalSunshine, conditionCode) 
			VALUES (@roundPK, in_we_time, inStationID, in_we_temp, in_we_dwpt, in_we_rhum, in_we_prcp, in_we_snow, 
                in_we_wdir, in_we_wspd, in_we_wpgt, in_we_pres, in_we_tsun, in_we_coco);
        END IF;
        
        
    END IF;
    
    COMMIT;
    
END$$

DELIMITER ;

-- -----------------------------------------------------
-- View `WeatherDataStore`.`vwRoundWeatherData`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `WeatherDataStore`.`vwRoundWeatherData`;
DROP VIEW IF EXISTS `WeatherDataStore`.`vwRoundWeatherData` ;
USE `WeatherDataStore`;
CREATE  OR REPLACE VIEW `vwRoundWeatherData` AS
SELECT
	YEAR(ro.raceDate) AS year,
    ro.quarter AS quarter,
    ro.number AS round,
	ci.API_ID AS circuitId,
    ci.name AS circuitName,
    co.name AS country,
    ci.lat AS lat,
    ci.long AS `long`,
    ci.locality AS locality,
    ro.raceDate AS raceDate,
    ro.raceTimeUTC AS raceTime,
    ro.raceName AS raceName,
    we.weatherStation AS stationID,
    we.time AS weather_time,
    we.conditionCode AS weather_coco,
    we.dewPoint AS weather_dwpt,
    we.hourTotalPrecipitation AS weather_prcp,
    we.airPressure AS weather_pres,
    we.relativeHumidity AS weather_rhum,
    we.snowDepth AS weather_snow,
    we.airTemp AS weather_temp,
    we.hourTotalSunshine AS weather_tsun,
    we.windDirection AS weather_wdir,
    we.peakWindGust AS weather_wpgt,
    we.avgWindSpeed AS weather_wspd
FROM
Round AS ro
JOIN Circuit AS ci ON ro.circuitID = ci.id
JOIN Country AS co ON ci.countryID = co.id
LEFT JOIN Weather AS we ON we.roundID = ro.id
ORDER BY ro.number;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
