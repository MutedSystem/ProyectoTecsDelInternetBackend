-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 02-05-2022 a las 01:19:28
-- Versión del servidor: 5.7.36
-- Versión de PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `crearte`
--
CREATE DATABASE IF NOT EXISTS `crearte` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `crearte`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra`
--

DROP TABLE IF EXISTS `compra`;
CREATE TABLE IF NOT EXISTS `compra` (
  `idCompra` varchar(255) NOT NULL,
  `fecha` datetime NOT NULL,
  `totalAComprar` int(11) NOT NULL,
  `idUsuario` varchar(255) NOT NULL,
  PRIMARY KEY (`idCompra`),
  KEY `fk_compra_idUsuario` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `compra`
--

INSERT INTO `compra` (`idCompra`, `fecha`, `totalAComprar`, `idUsuario`) VALUES
('', '2022-05-01 23:21:10', 123, '1'),
('1', '2022-05-01 23:14:48', 12, '1'),
('2', '2022-05-01 23:21:10', 123123, '1'),
('422088ad-e468-414f-a133-41bf8c24ff2f', '2022-05-01 23:14:48', 40000, '5c0b756a-5c59-4191-882e-f76a731663f5'),
('6511108e-61c8-4b60-937c-a5ea204cb528', '2022-05-01 23:14:48', 40000, '5c0b756a-5c59-4191-882e-f76a731663f5'),
('6c764c30-9872-4a11-8680-e43fd4abe7a9', '2022-05-01 23:14:48', 40000, '5c0b756a-5c59-4191-882e-f76a731663f5'),
('8af89853-fe1e-4595-a4bc-f17b3208bd87', '2022-05-01 23:14:48', 40000, '5c0b756a-5c59-4191-882e-f76a731663f5'),
('8e990df4-79aa-4282-8fc6-2788d6eb8860', '2022-05-01 23:14:48', 40000, '5c0b756a-5c59-4191-882e-f76a731663f5'),
('978260c5-0504-47b6-8fb8-5a98fb25e683', '2022-05-01 23:14:48', 40000, '5c0b756a-5c59-4191-882e-f76a731663f5'),
('ba03bf71-c046-4e50-834b-021dd2643aba', '2022-05-01 23:14:48', 40000, '5c0b756a-5c59-4191-882e-f76a731663f5'),
('bc4714fb-9540-4828-95df-56ae958060ef', '2022-05-01 23:14:48', 40000, '5c0b756a-5c59-4191-882e-f76a731663f5'),
('bdecb3dc-6010-483d-881b-ff7e85c02aed', '2022-05-01 23:14:48', 40000, '5c0b756a-5c59-4191-882e-f76a731663f5'),
('ec49f3a2-613f-432d-b65c-6551ae38dfed', '2022-05-01 23:14:48', 40000, '5c0b756a-5c59-4191-882e-f76a731663f5'),
('f4896c8c-069c-423c-9681-c4757800e5e1', '2022-05-01 23:14:48', 40000, '5c0b756a-5c59-4191-882e-f76a731663f5');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compraproducto`
--

DROP TABLE IF EXISTS `compraproducto`;
CREATE TABLE IF NOT EXISTS `compraproducto` (
  `idCompraProducto` int(11) NOT NULL AUTO_INCREMENT,
  `idCompra` varchar(255) NOT NULL,
  `idProducto` int(255) NOT NULL,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`idCompraProducto`),
  KEY `fk_CompraProducto_idCompra` (`idCompra`),
  KEY `fk_CompraProducto_idProducto` (`idProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `compraproducto`
--

INSERT INTO `compraproducto` (`idCompraProducto`, `idCompra`, `idProducto`, `cantidad`) VALUES
(1, '1', 2, 12),
(2, '1', 2, 12),
(3, '422088ad-e468-414f-a133-41bf8c24ff2f', 1, 2),
(4, '422088ad-e468-414f-a133-41bf8c24ff2f', 2, 2),
(5, 'bc4714fb-9540-4828-95df-56ae958060ef', 1, 2),
(6, 'bc4714fb-9540-4828-95df-56ae958060ef', 2, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

DROP TABLE IF EXISTS `producto`;
CREATE TABLE IF NOT EXISTS `producto` (
  `idProducto` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` text NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `precio` int(11) NOT NULL,
  `fotos` text NOT NULL,
  `estado` text NOT NULL,
  PRIMARY KEY (`idProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idProducto`, `descripcion`, `nombre`, `precio`, `fotos`) VALUES
(1, 'Primero ', 'Primero', 1000, 'asd'),
(2, '2', '2', 2, '2'),
(3, 'Primero ', 'Primero', 1000, 'asd'),
(4, '2', '2', 2, '2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `idUsuario` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `rango` varchar(255) NOT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `telefono`, `correo`, `contrasena`, `nombre`, `direccion`, `rango`) VALUES
('1', '123', 'hola', '123', '123', '123', '123'),
('5c0b756a-5c59-4191-882e-f76a731663f5', '123', 'dan', '$2a$10$v2PyPdKGdEyQ3L4fI5.Ytu.zWUTjyspAxLUPwLPHc2tepp.B8LFnm', 'dan', '2', 'user');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compra`
--
ALTER TABLE `compra`
  ADD CONSTRAINT `fk_compra_idUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`);

--
-- Filtros para la tabla `compraproducto`
--
ALTER TABLE `compraproducto`
  ADD CONSTRAINT `fk_CompraProducto_idCompra` FOREIGN KEY (`idCompra`) REFERENCES `compra` (`idCompra`),
  ADD CONSTRAINT `fk_CompraProducto_idProducto` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
