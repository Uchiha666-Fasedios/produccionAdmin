'use strict'

var express = require('express'); //trabajar con express para poder crear las rutas 
var AdminController = require('../controllers/AdminController'); //cargo el cotrolador

var router = express.Router(); //cargo este servicio q tiene un monton de metodos para el tema de rutas
var auth=require('../middlewares/authenticate');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir: './uploads/productos'});
var path2 = multiparty({uploadDir: './uploads/configuraciones'});

router.post('/registro_admin', AdminController.registro_admin); //router.post una ruta por post /registro_cliente es la direccion q se pone en la url y AdminController.registro_admin q va a utilizar el objeto con su metodo q se creo en el controlador
router.post('/login_admin', AdminController.login_admin); //router.get una ruta por get /home es la direccion q se pone en la url y ProjectController.home q va a utilizar el objeto con su metodo q se creo en el controlador
router.get('/obtener_mensajes_admin',auth.auth, AdminController.obtener_mensajes_admin);
router.put('/cerrar_mensajes_admin/:id',auth.auth, AdminController.cerrar_mensajes_admin);

router.get('/obtener_ventas_admin/:desde?/:hasta?',auth.auth, AdminController.obtener_ventas_admin);
router.get('/kpi_ganancias_mensuales_admin',auth.auth, AdminController.kpi_ganancias_mensuales_admin);
router.post('/agregar_etiqueta_admin',auth.auth,AdminController.agregar_etiqueta_admin);
router.get('/listar_etiquetas_admin',auth.auth,AdminController.listar_etiquetas_admin);
router.delete('/eliminar_etiqueta_admin/:id',auth.auth,AdminController.eliminar_etiqueta_admin);
router.get('/listar_etiquetas_producto_admin/:id',auth.auth,AdminController.listar_etiquetas_producto_admin);
router.get('/listar_variedades_admin/:id',auth.auth,AdminController.listar_variedades_admin);
router.put('/actualizar_producto_variedades_admin/:id',auth.auth,AdminController.actualizar_producto_variedades_admin);
router.delete('/eliminar_variedad_admin/:id',auth.auth,AdminController.eliminar_variedad_admin);
router.post('/agregar_nueva_variedad_admin',auth.auth,AdminController.agregar_nueva_variedad_admin);
router.get('/obtener_producto_admin/:id',auth.auth, AdminController.obtener_producto_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.get('/listar_inventario_producto_admin/:id',auth.auth,AdminController.listar_inventario_producto_admin);
router.post('/registro_inventario_producto_admin',auth.auth,AdminController.registro_inventario_producto_admin);
router.get('/cambiar_vs_producto_admin/:id/:estado',auth.auth,AdminController.cambiar_vs_producto_admin);
router.get('/listar_variedades_productos_admin',auth.auth,AdminController.listar_variedades_productos_admin);
router.post('/registro_compra_manual_cliente',auth.auth,AdminController.registro_compra_manual_cliente);
router.put('/marcar_finalizado_orden/:id',auth.auth,AdminController.marcar_finalizado_orden);
router.delete('/eliminar_orden_admin/:id',auth.auth,AdminController.eliminar_orden_admin);
router.put('/marcar_envio_orden/:id',auth.auth,AdminController.marcar_envio_orden);
router.put('/confirmar_pago_orden/:id',auth.auth,AdminController.confirmar_pago_orden);
router.put('/agregar_imagen_galeria_admin/:id',[auth.auth,path],AdminController.agregar_imagen_galeria_admin);
router.put('/eliminar_imagen_galeria_admin/:id',auth.auth,AdminController.eliminar_imagen_galeria_admin);
router.get('/verificar_token',auth.auth,AdminController.verificar_token);
//router.get('/obtener_config_admin',auth.auth,AdminController.obtener_config_admin);
router.put('/actualizar_config_admin',auth.auth,AdminController.actualizar_config_admin);
router.post('/pedido_compra_cliente',auth.auth,AdminController.pedido_compra_cliente);
router.get('/obtener_imagen/:img',AdminController.obtener_imagen);
router.get('/obtener_detalles_ordenes_cliente/:id',auth.auth,AdminController.obtener_detalles_ordenes_cliente);
router.get('/obtener_tope_destacados',auth.auth,AdminController.obtener_tope_destacados);
router.put('/actualizar_inventario_producto_admin',auth.auth,AdminController.actualizar_inventario_producto_admin);
router.post('/registro_inicio_admin',[auth.auth,path2], AdminController.registro_inicio_admin);//parametros path viene con la instancia del formulario y los valores y el archivo, auth.auth el parametro del token
router.get('/listar_inicio_admin/:filtro?',auth.auth, AdminController.listar_inicio_admin);//parametros filtro? seria opcional, auth.auth el parametro del token
router.get('/obtener_inicio_admin/:id',auth.auth, AdminController.obtener_inicio_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.put('/actualizar_inicio_admin/:id',[auth.auth,path2], AdminController.actualizar_inicio_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.delete('/eliminar_inicio_admin/:id',auth.auth, AdminController.eliminar_inicio_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.get('/obtener_inicio', AdminController.obtener_inicio);
router.post('/registro_inicioa_admin',[auth.auth,path2], AdminController.registro_inicioa_admin);//parametros path viene con la instancia del formulario y los valores y el archivo, auth.auth el parametro del token
router.get('/obtener_inicio1_admin',auth.auth, AdminController.obtener_inicio1_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.put('/actualizar_parte1_admin/:id',[auth.auth,path2], AdminController.actualizar_parte1_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.delete('/eliminar_parte1_admin/:id',auth.auth, AdminController.eliminar_parte1_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.post('/registro_tapa_admin',[auth.auth,path2], AdminController.registro_tapa_admin);//parametros path viene con la instancia del formulario y los valores y el archivo, auth.auth el parametro del token
router.get('/obtener_tapa_admin',auth.auth, AdminController.obtener_tapa_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.delete('/eliminar_slider_admin/:id',auth.auth, AdminController.eliminar_slider_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.post('/registro_parte2_admin',[auth.auth,path2], AdminController.registro_parte2_admin);//parametros path viene con la instancia del formulario y los valores y el archivo, auth.auth el parametro del token
router.get('/obtener_parte2_admin',auth.auth, AdminController.obtener_parte2_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.put('/actualizar_parte2_admin/:id',[auth.auth,path2], AdminController.actualizar_parte2_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.delete('/eliminar_parte2_admin/:id',auth.auth, AdminController.eliminar_parte2_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.post('/registro_parte3_admin',[auth.auth,path2], AdminController.registro_parte3_admin);//parametros path viene con la instancia del formulario y los valores y el archivo, auth.auth el parametro del token

router.get('/obtener_parte3_admin',auth.auth, AdminController.obtener_parte3_admin);//parametros filtro seria opcional, auth.auth el parametro del token
//////////////////////////////
router.put('/actualizar_parte3_admin/:id',[auth.auth,path2], AdminController.actualizar_parte3_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.put('/actualizar_slider_admin/:id',[auth.auth,path2], AdminController.actualizar_slider_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.delete('/eliminar_parte3_admin/:id',auth.auth, AdminController.eliminar_parte3_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.get('/obtener_politicas_envio',AdminController.obtener_politicas_envio);//parametros filtro seria opcional, auth.auth el parametro del token
router.post('/registro_politicas_admin',auth.auth,AdminController.registro_politicas_admin);
router.put('/actualizar_politicas_admin/:id',auth.auth,AdminController.actualizar_politicas_admin);
router.delete('/eliminar_politicas_admin/:id',auth.auth, AdminController.eliminar_politicas_admin);//parametros filtro seria opcional, auth.auth el parametro del token
router.post('/registro_terminos_admin',auth.auth,AdminController.registro_terminos_admin);
router.get('/obtener_terminos',AdminController.obtener_terminos);
router.put('/actualizar_terminos_admin/:id',auth.auth,AdminController.actualizar_terminos_admin);
router.delete('/eliminar_terminos_admin/:id',auth.auth, AdminController.eliminar_terminos_admin);
router.get('/obtener_admin',AdminController.obtener_admin);


module.exports = router; //para poder importarlo con un reqired