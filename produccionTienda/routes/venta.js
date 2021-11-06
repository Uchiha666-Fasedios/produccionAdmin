'use strict'

var express = require('express'); //trabajar con express para poder crear las rutas 
var ventaController = require('../controllers/ventaController'); //cargo el cotrolador

var router = express.Router(); //cargo este servicio q tiene un monton de metodos para el tema de rutas
var auth=require('../middlewares/authenticate');

router.post('/registro_compra_cliente',auth.auth, ventaController.registro_compra_cliente);//parametros filtro seria opcional, auth.auth el parametro del token
router.get('/enviar_correo_compra_cliente/:id',auth.auth, ventaController.enviar_correo_compra_cliente);


module.exports = router; //para poder importarlo con un reqired