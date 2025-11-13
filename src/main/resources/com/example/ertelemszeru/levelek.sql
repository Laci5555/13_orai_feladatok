-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Nov 08. 00:15
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
-- Adatbázis: `levelek`
--
CREATE DATABASE IF NOT EXISTS `levelek` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `levelek`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cimek`
--

CREATE TABLE `cimek` (
  `caz` int(11) NOT NULL,
  `cim` varchar(32) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `cimek`
--

INSERT INTO `cimek` (`caz`, `cim`) VALUES
(1, 'teke11@freemail.hu'),
(2, 'potyi75@gmail.com'),
(3, 'sanyi17@citromail.hu'),
(4, 'petrakis@citromail.hu'),
(5, 'szabo@freemail.hu'),
(6, 'nemen@freemail.hu'),
(7, 'rita03@freemail.hu'),
(8, 'regina09@citromail.hu'),
(9, 'pistanagy@gmail.com'),
(10, 'mateka2@citromail.hu'),
(11, 'krisz17@gmail.com'),
(12, 'tevehaz@citromail.hu'),
(13, 'valaki@gmail.com'),
(14, 'bond007@gmail.com'),
(15, 'bela06@gmail.com');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kuldott`
--

CREATE TABLE `kuldott` (
  `kaz` int(11) NOT NULL,
  `ki` int(11) NOT NULL,
  `kinek` int(11) NOT NULL,
  `mikor` time NOT NULL,
  `hossz` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `kuldott`
--

INSERT INTO `kuldott` (`kaz`, `ki`, `kinek`, `mikor`, `hossz`) VALUES
(1, 10, 9, '20:37:00', 1230),
(2, 14, 13, '19:50:00', 1735),
(3, 7, 5, '09:49:00', 1542),
(4, 3, 10, '15:36:00', 2180),
(5, 9, 8, '10:13:00', 1603),
(6, 3, 1, '07:15:00', 1092),
(7, 11, 2, '22:34:00', 1741),
(8, 12, 10, '10:25:00', 2215),
(9, 2, 1, '21:19:00', 2088),
(10, 15, 10, '21:20:00', 2240),
(11, 3, 6, '07:54:00', 1231),
(12, 13, 5, '15:51:00', 837),
(13, 15, 12, '19:28:00', 578),
(14, 14, 4, '10:31:00', 2282),
(15, 8, 6, '15:50:00', 1992),
(16, 2, 3, '10:34:00', 1508),
(17, 4, 7, '14:28:00', 1466),
(18, 4, 1, '16:59:00', 1870),
(19, 14, 15, '08:23:00', 1677),
(20, 6, 5, '14:53:00', 1710),
(21, 6, 10, '11:47:00', 527),
(22, 12, 5, '14:11:00', 767),
(23, 7, 9, '18:11:00', 1737),
(24, 3, 2, '12:34:00', 713),
(25, 9, 11, '12:58:00', 619),
(26, 9, 15, '07:30:00', 688),
(27, 6, 1, '11:19:00', 1117),
(28, 3, 5, '22:23:00', 862),
(29, 9, 10, '11:39:00', 2071),
(30, 2, 14, '20:37:00', 1003),
(31, 7, 8, '19:36:00', 1017),
(32, 3, 4, '13:27:00', 1823),
(33, 3, 13, '09:54:00', 1884),
(34, 10, 12, '10:43:00', 2213),
(35, 2, 11, '15:46:00', 1383),
(36, 1, 9, '08:36:00', 1424),
(37, 14, 15, '21:38:00', 1954),
(38, 9, 4, '20:58:00', 1685),
(39, 11, 9, '16:39:00', 1738),
(40, 12, 8, '12:15:00', 1727),
(41, 3, 13, '07:55:00', 1714),
(42, 14, 8, '12:10:00', 1257),
(43, 2, 10, '16:27:00', 1875),
(44, 12, 2, '09:34:00', 1616),
(45, 6, 2, '11:25:00', 1680),
(46, 7, 5, '08:31:00', 1010),
(47, 9, 1, '06:42:00', 1320),
(48, 15, 8, '10:12:00', 1853),
(49, 15, 8, '15:16:00', 2203),
(50, 15, 10, '17:26:00', 677);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `cimek`
--
ALTER TABLE `cimek`
  ADD PRIMARY KEY (`caz`);

--
-- A tábla indexei `kuldott`
--
ALTER TABLE `kuldott`
  ADD PRIMARY KEY (`kaz`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `cimek`
--
ALTER TABLE `cimek`
  MODIFY `caz` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT a táblához `kuldott`
--
ALTER TABLE `kuldott`
  MODIFY `kaz` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
