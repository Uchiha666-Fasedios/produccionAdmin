'use strict'

var express = require('express'); //trabajar con express para poder crear las rutas 
var ClienteController = require('../controllers/ClienteController'); //cargo el cotrolador

var router = express.Router(); //cargo este servicio q tiene un monton de metodos para el tema de rutas
var auth=require('../middlewares/authenticate')
//var multipart = require('connect-multiparty'); //trabajo con esto 'connect-multiparty' es un paqete q instale igual q express para q me reconozca los archivos las imagenes ..
//var multipartMiddleware = multipart({ uploadDir: './uploads' }); //aca llamo a la funcion y le indico donde se van a subir los archivos..uploadDir como propiedad y aca se guardan ./uploads

router.post('/registro_cliente', ClienteController.registro_cliente); //router.get una ruta por get /home es la direccion q se pone en la url y ProjectController.home q va a utilizar el objeto con su metodo q se creo en el controlador
router.post('/login_cliente', ClienteController.login_cliente); //router.get una ruta por get /home es la direccion q se pone en la url y ProjectController.home q va a utilizar el objeto con su metodo q se creo en el controlador
router.get('/listar_clientes_filtro_admin/:tipo/:filtro',auth.auth, ClienteController.listar_clientes_filtro_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.post('/registro_cliente_admin',auth.auth, ClienteController.registro_cliente_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.get('/obtener_cliente_admin/:id',auth.auth, ClienteController.obtener_cliente_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.put('/actualizar_cliente_admin/:id',auth.auth, ClienteController.actualizar_cliente_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.delete('/eliminar_cliente_admin/:id',auth.auth, ClienteController.eliminar_cliente_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.get('/obtener_cliente_guest/:id',auth.auth, ClienteController.obtener_cliente_guest);//parametros filtro seria opcional, auth.auth el parametro del token
router.put('/actualizar_perfil_cliente_guest/:id',auth.auth, ClienteController.actualizar_perfil_cliente_guest);//parametros filtro seria opcional, auth.auth el parametro del token

////////////////////////DIRECCION///////////////////////
router.post('/registro_direccion_cliente',auth.auth, ClienteController.registro_direccion_cliente);
router.get('/obtener_direccion_todos_cliente/:id',auth.auth, ClienteController.obtener_direccion_todos_cliente);
router.put('/cambiar_direccion_principal_cliente/:id/:cliente',auth.auth, ClienteController.cambiar_direccion_principal_cliente);
router.get('/obtener_direccion_principal_cliente/:id',auth.auth, ClienteController.obtener_direccion_principal_cliente);

/////////////////////////contacto///////////////////////
router.post('/enviar_mensaje_contacto', ClienteController.enviar_mensaje_contacto);

////////////////////////ordenes////////////////////////
router.get('/obtener_ordenes_cliente/:id',auth.auth, ClienteController.obtener_ordenes_cliente);
router.get('/obtener_detalles_ordenes_cliente/:id',auth.auth, ClienteController.obtener_detalles_ordenes_cliente);

///////////////////////review/////////////////////////
router.post('/emitir_review_producto_cliente',auth.auth, ClienteController.emitir_review_producto_cliente);
router.get('/obtener_review_producto_cliente/:id', ClienteController.obtener_review_producto_cliente);
router.get('/obtener_review_cliente/:id',auth.auth, ClienteController.obtener_review_cliente);


module.exports = router; //para poder importarlo con un reqired