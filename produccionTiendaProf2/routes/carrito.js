'use strict'

var express = require('express'); //trabajar con express para poder crear las rutas 
var carritoController = require('../controllers/carritoController'); //cargo el cotrolador

var router = express.Router(); //cargo este servicio q tiene un monton de metodos para el tema de rutas
var auth=require('../middlewares/authenticate')


router.post('/agregar_carrito_cliente',auth.auth, carritoController.agregar_carrito_cliente); //router.get una ruta por get /home es la direccion q se pone en la url y ProjectController.home q va a utilizar el objeto con su metodo q se creo en el controlador
router.get('/obtener_carrito_cliente/:id',auth.auth, carritoController.obtener_carrito_cliente); //router.get una ruta por get /home es la direccion q se pone en la url y ProjectController.home q va a utilizar el objeto con su metodo q se creo en el controlador
router.delete('/eliminar_producto_carrito_cliente/:id',auth.auth, carritoController.eliminar_producto_carrito_cliente);//parametros filtro seria opcional, auth.auth el parametro del token

module.exports = router; //para poder importarlo con un reqired