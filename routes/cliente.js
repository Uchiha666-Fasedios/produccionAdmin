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
router.get('/listar_clientes_tienda',auth.auth,ClienteController.listar_clientes_tienda);

////////////////////////DIRECCION///////////////////////
router.post('/registro_direccion_cliente',auth.auth, ClienteController.registro_direccion_cliente);
router.get('/obtener_direccion_todos_cliente/:id',auth.auth, ClienteController.obtener_direccion_todos_cliente);
router.put('/cambiar_direccion_principal_cliente/:id/:cliente',auth.auth, ClienteController.cambiar_direccion_principal_cliente);
router.get('/obtener_direccion_principal_cliente/:id',auth.auth, ClienteController.obtener_direccion_principal_cliente);
router.delete('/eliminar_direccion_cliente/:id',auth.auth,ClienteController.eliminar_direccion_cliente);

/////////////////////////contacto///////////////////////
router.post('/enviar_mensaje_contacto', ClienteController.enviar_mensaje_contacto);

////////////////////////ordenes////////////////////////
router.get('/obtener_ordenes_cliente/:id',auth.auth, ClienteController.obtener_ordenes_cliente);
router.get('/obtener_detalles_ordenes_cliente/:id',auth.auth, ClienteController.obtener_detalles_ordenes_cliente);

///////////////////////review/////////////////////////
router.post('/emitir_review_producto_cliente',auth.auth, ClienteController.emitir_review_producto_cliente);
router.get('/obtener_review_producto_cliente/:id', ClienteController.obtener_review_producto_cliente);
router.get('/obtener_review_cliente/:id',auth.auth, ClienteController.obtener_review_cliente);

router.get('/listar_productos_destacados_publico',ClienteController.listar_productos_destacados_publico);
router.get('/listar_productos_nuevos_publico',ClienteController.listar_productos_nuevos_publico);
router.get('/listar_productos_publico',ClienteController.listar_productos_publico);
router.get('/obtener_productos_slug_publico/:slug',ClienteController.obtener_productos_slug_publico);
router.get('/listar_productos_recomendados_publico/:categoria',ClienteController.listar_productos_recomendados_publico);

router.post('/registro_cliente_tienda',ClienteController.registro_cliente_tienda);
router.get('/obtener_variedades_productos_cliente/:id',ClienteController.obtener_variedades_productos_cliente);
router.post('/agregar_carrito_cliente',auth.auth,ClienteController.agregar_carrito_cliente);
router.get('/obtener_carrito_cliente/:id',auth.auth,ClienteController.obtener_carrito_cliente);
router.delete('/eliminar_carrito_cliente/:id',auth.auth,ClienteController.eliminar_carrito_cliente);
router.get('/obtener_reviews_producto_publico/:id',ClienteController.obtener_reviews_producto_publico);
router.post('/comprobar_carrito_cliente',auth.auth,ClienteController.comprobar_carrito_cliente);
router.get('/consultarIDPago/:id',auth.auth,ClienteController.consultarIDPago);
router.post('/registro_compra_cliente',auth.auth,ClienteController.registro_compra_cliente);
router.get('/obtener_reviews_cliente/:id',auth.auth,ClienteController.obtener_reviews_cliente);

router.get('/obtener_tapa',ClienteController.obtener_tapa);//parametros filtro seria opcional, auth.auth el parametro del token
router.get('/obtener_parte1',ClienteController.obtener_parte1);//parametros filtro seria opcional, auth.auth el parametro del token
router.get('/obtener_parte2',ClienteController.obtener_parte2);//parametros filtro seria opcional, auth.auth el parametro del token
router.get('/obtener_parte3',ClienteController.obtener_parte3);//parametros filtro seria opcional, auth.auth el parametro del token

router.put('/update_carrito_cliente/:cantidad',auth.auth, ClienteController.update_carrito_cliente);

module.exports = router; //para poder importarlo con un reqired