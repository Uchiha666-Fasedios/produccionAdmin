'use strict'

var express = require('express'); //trabajar con express para poder crear las rutas 
var configController = require('../controllers/configController'); //cargo el cotrolador

var router = express.Router(); //cargo este servicio q tiene un monton de metodos para el tema de rutas
var auth=require('../middlewares/authenticate');

var multipart = require('connect-multiparty'); //trabajo con esto 'connect-multiparty' es un paqete q instale igual q express para q me reconozca los archivos las imagenes ..
var path = multipart({ uploadDir: './uploads/configuraciones' }); //aca llamo a la funcion y le indico donde se van a subir los archivos..uploadDir como propiedad y aca se guardan ./uploads

//router.post('/actualiza_config_admin',auth.auth, configController.actualiza_config_admin);
router.put('/actualiza_config_admin/:id',[auth.auth,path], configController.actualiza_config_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.get('/obtener_config_admin',auth.auth, configController.obtener_config_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.get('/obtener_logo/:img', configController.obtener_logo);
router.get('/obtener_config_public',configController.obtener_config_public);//parametros filtro seria opcional, auth.auth el parametro del token


module.exports = router; //para poder importarlo con un reqired