'use strict'

var express = require('express'); //trabajar con express para poder crear las rutas 
var cuponController = require('../controllers/cuponController'); //cargo el cotrolador

var router = express.Router(); //cargo este servicio q tiene un monton de metodos para el tema de rutas
var auth=require('../middlewares/authenticate')

router.post('/registro_cupon_admin',auth.auth, cuponController.registro_cupon_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.get('/listar_cupones_admin/:filtro?',auth.auth, cuponController.listar_cupones_admin);//parametros filtro? seria opcional,parametros filtro seria opcional, auth.auth el parametro del token
router.get('/obtener_cupon_admin/:id',auth.auth, cuponController.obtener_cupon_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.put('/actualizar_cupon_admin/:id',auth.auth, cuponController.actualizar_cupon_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.delete('/eliminar_cupon_admin/:id',auth.auth, cuponController.eliminar_cupon_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.get('/validar_cupon_admin/:cupon',auth.auth, cuponController.validar_cupon_admin);

module.exports = router; //para poder importarlo con un reqired