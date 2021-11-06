'use strict'

var express = require('express'); //trabajar con express para poder crear las rutas 
var AdminController = require('../controllers/AdminController'); //cargo el cotrolador

var router = express.Router(); //cargo este servicio q tiene un monton de metodos para el tema de rutas
var auth=require('../middlewares/authenticate')

router.post('/registro_admin', AdminController.registro_admin); //router.post una ruta por post /registro_cliente es la direccion q se pone en la url y AdminController.registro_admin q va a utilizar el objeto con su metodo q se creo en el controlador
router.post('/login_admin', AdminController.login_admin); //router.get una ruta por get /home es la direccion q se pone en la url y ProjectController.home q va a utilizar el objeto con su metodo q se creo en el controlador
router.get('/obtener_mensajes_admin',auth.auth, AdminController.obtener_mensajes_admin);
router.put('/cerrar_mensajes_admin/:id',auth.auth, AdminController.cerrar_mensajes_admin);

router.get('/obtener_ventas_admin/:desde?/:hasta?',auth.auth, AdminController.obtener_ventas_admin);
router.get('/kpi_ganancias_mensuales_admin',auth.auth, AdminController.kpi_ganancias_mensuales_admin);

module.exports = router; //para poder importarlo con un reqired