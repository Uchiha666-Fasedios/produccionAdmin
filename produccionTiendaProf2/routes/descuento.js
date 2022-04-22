'use strict'

var express = require('express'); //trabajar con express para poder crear las rutas 
var descuentoController = require('../controllers/descuentoController'); //cargo el cotrolador

var router = express.Router(); //cargo este servicio q tiene un monton de metodos para el tema de rutas
var auth=require('../middlewares/authenticate');


var multipart = require('connect-multiparty'); //trabajo con esto 'connect-multiparty' es un paqete q instale igual q express para q me reconozca los archivos las imagenes ..
var path = multipart({ uploadDir: './uploads/descuentos' }); //aca llamo a la funcion y le indico donde se van a subir los archivos..uploadDir como propiedad y aca se guardan ./uploads


router.post('/registro_descuento_admin',[auth.auth,path], descuentoController.registro_descuento_admin);
router.get('/listar_descuentos_admin/:filtro?',auth.auth, descuentoController.listar_descuentos_admin);
router.get('/obtener_banner_descuento/:img', descuentoController.obtener_banner_descuento);
router.get('/obtener_descuento_admin/:id',auth.auth, descuentoController.obtener_descuento_admin);
router.put('/actualizar_descuento_admin/:id',[auth.auth,path], descuentoController.actualizar_descuento_admin);
router.delete('/eliminar_descuento_admin/:id',auth.auth, descuentoController.eliminar_descuento_admin);
router.get('/obtener_descuento_activo', descuentoController.obtener_descuento_activo);

module.exports = router; //para poder importarlo con un reqired