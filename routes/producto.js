'use strict'

var express = require('express'); //trabajar con express para poder crear las rutas 
var productoController = require('../controllers/productoController'); //cargo el cotrolador

var router = express.Router(); //cargo este servicio q tiene un monton de metodos para el tema de rutas
var auth=require('../middlewares/authenticate');


var multipart = require('connect-multiparty'); //trabajo con esto 'connect-multiparty' es un paqete q instale igual q express para q me reconozca los archivos las imagenes ..
var path = multipart({ uploadDir: './uploads/productos' }); //aca llamo a la funcion y le indico donde se van a subir los archivos..uploadDir como propiedad y aca se guardan ./uploads

//PRODUCTOS
router.post('/registro_producto_admin',[auth.auth,path], productoController.registro_producto_admin);//parametros path viene con la instancia del formulario y los valores y el archivo, auth.auth el parametro del token
router.get('/listar_productos_admin/:filtro?',auth.auth, productoController.listar_productos_admin);//parametros filtro? seria opcional, auth.auth el parametro del token
router.get('/obtener_portada/:img', productoController.obtener_portada);
router.get('/obtener_producto_admin/:id',auth.auth, productoController.obtener_producto_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.put('/actualizar_producto_admin/:id',[auth.auth,path], productoController.actualizar_producto_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.delete('/eliminar_producto_admin/:id',auth.auth, productoController.eliminar_producto_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.put('/actualizar_producto_variedades_admin/:id',auth.auth, productoController.actualizar_producto_variedades_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.put('/agregar_imagen_galeria_admin/:id',[auth.auth,path], productoController.agregar_imagen_galeria_admin);//parametros path viene con la instancia del formulario y los valores y el archivo, auth.auth el parametro del token
router.put('/eliminar_imagen_galeria_admin/:id',auth.auth, productoController.eliminar_imagen_galeria_admin);//parametros filtro seria opcional, auth.auth el parametro del token


//INVENTARIO
router.get('/listar_inventario_producto_admin/:id',auth.auth, productoController.listar_inventario_producto_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.delete('/eliminar_inventario_producto_admin/:id',auth.auth, productoController.eliminar_inventario_producto_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.post('/registro_inventario_producto_admin',auth.auth, productoController.registro_inventario_producto_admin);//parametros filtro seria opcional, auth.auth el parametro del token

//PUBLICOS
router.get('/listar_productos_public/:filtro?', productoController.listar_productos_public);//parametros filtro? seria opcional, auth.auth el parametro del token
router.get('/obtener_productos_slug_public/:slug', productoController.obtener_productos_slug_public);//, auth.auth el parametro del token
router.get('/listar_productos_recomendados_public/:categoria', productoController.listar_productos_recomendados_public);// auth.auth el parametro del token
router.get('/listar_productos_nuevos_public', productoController.listar_productos_nuevos_public);
router.get('/listar_productos_masvendidos_public', productoController.listar_productos_masvendidos_public);
router.get('/obtener_reviews_producto_public/:id', productoController.obtener_reviews_producto_public);


module.exports = router; //para poder importarlo con un reqired