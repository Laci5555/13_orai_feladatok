-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Okt 14. 19:46
-- Kiszolgáló verziója: 10.4.6-MariaDB
-- PHP verzió: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `konyvek`
--
CREATE DATABASE IF NOT EXISTS `konyvek` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `konyvek`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `irok`
--

CREATE TABLE `irok` (
  `az` int(11) NOT NULL,
  `nev` varchar(32) COLLATE utf8_hungarian_ci NOT NULL,
  `szuletett` int(11) NOT NULL,
  `meghalt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `irok`
--

INSERT INTO `irok` (`az`, `nev`, `szuletett`, `meghalt`) VALUES
(1, 'József Atila', 1905, 1937),
(2, 'Móricz Zsigmond', 1879, 1972),
(3, 'Kosztolányi Dezső', 1885, 1936),
(4, 'Petőfi Sándor', 1823, 1849),
(5, 'Nagy László', 1925, 1978);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `konyvek`
--

CREATE TABLE `konyvek` (
  `kaz` int(11) NOT NULL,
  `iro` int(11) NOT NULL,
  `cim` varchar(64) COLLATE utf8_hungarian_ci NOT NULL,
  `ev` int(11) NOT NULL,
  `oldal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `konyvek`
--

INSERT INTO `konyvek` (`kaz`, `iro`, `cim`, `ev`, `oldal`) VALUES
(1, 1, 'A Dunánál', 1933, 50),
(2, 4, 'A Hevesi Lány', 1846, 85),
(3, 5, 'A mindenség hídja', 1955, 80),
(4, 3, 'A Szív Éneke', 1932, 210),
(5, 5, 'A távoli tenger', 1968, 160),
(6, 4, 'Az Apostol', 1848, 240),
(7, 2, 'Az Isten Háta Mögött', 1931, 455),
(8, 5, 'Búcsú a csillagoktól', 1949, 120),
(9, 3, 'Édes Anna', 1926, 278),
(10, 4, 'János Vitéz', 1845, 200),
(11, 3, 'Kaláka', 1934, 156),
(12, 5, 'Kert a szélben', 1961, 130),
(13, 1, 'Különböző Személyek', 1939, 95),
(14, 2, 'Légy Jó Mindhalálig', 1921, 355),
(15, 1, 'Mivel Érdemlem', 1940, 70),
(16, 3, 'Napló', 1938, 650),
(17, 2, 'Rokonok', 1921, 290),
(18, 1, 'Szép Szó', 1935, 120),
(19, 3, 'Színes Füzetek', 1930, 220),
(20, 2, 'Tavaszi Zsongás', 1918, 330),
(21, 4, 'Téli Esték', 1847, 115),
(22, 1, 'Tiszta Szívvel', 1936, 180),
(23, 2, 'Történetek a Tengerből', 1928, 275),
(24, 5, 'Tűz és víz', 1945, 100),
(25, 4, 'Versek', 1844, 120);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `irok`
--
ALTER TABLE `irok`
  ADD PRIMARY KEY (`az`);

--
-- A tábla indexei `konyvek`
--
ALTER TABLE `konyvek`
  ADD PRIMARY KEY (`kaz`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `irok`
--
ALTER TABLE `irok`
  MODIFY `az` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `konyvek`
--
ALTER TABLE `konyvek`
  MODIFY `kaz` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
