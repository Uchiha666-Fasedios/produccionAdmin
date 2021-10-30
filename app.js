'use strict'
//express nos va permitir tener un sistema de rutas y hacer peticiones http
var express = require('express'); //cargo el modulo para poder tener el objeto y trabajar con el
var app = express();
var bodyParser = require('body-parser'); //cargo el modulo para tener esta libreria para combertir en json lo q me llega por post etc..
var mongoose = require('mongoose'); //cargo este modulo esta libreria
var port = process.env.PORT || 4201; //el puerto de mi local host va ser process.env.PORT si no por defecto le ponemos 4201
//mongoose.set('useFindAndModify', false);//para q no me tire error cuando use findByIdAndUpdate o 

//CONFIGURAR SOCKET se instalo un paqete para el uso de este socket clase 58 carrito de compras asincrono
var server = require('http').createServer(app);//creo un servidor
//creo una inicializacion de nuestro paqete socket.io
var io =require('socket.io')(server,{
    cors: {origin : '*'}//q las cabeceras sean de cualqier url
});

//uso del socket (acciones)
io.on('connection',function(socket){//conecto el paqete 
    socket.on('delete-carrito',function(data){//arranco el paqete donde le doy nombre de delete-carrito y obtengo la data de dicha accion
    io.emit('new-carrito',data);//la emicion de este metodo q lo llamo new-carrito para luego utilizarlo
    console.log(data);
    });


 socket.on('add-carrito',function(data){//arranco el paqete donde le doy nombre de add-carrito y obtengo la data de dicha accion
    io.emit('add-new-carrito',data);//la emicion de este metodo q lo llamo add-new-carrito para luego utilizarlo
    console.log(data);
    });

});

///////////////////////////////////////////////////////////////






// cargar archivos rutas
var cliente_route = require('./routes/cliente'); //llamo al archivo q tiene todas las rutas
var admin_route = require('./routes/admin'); //llamo al archivo q tiene todas las rutas
var producto_route = require('./routes/producto'); //llamo al archivo q tiene todas las rutas
var cupon_route = require('./routes/cupon'); //llamo al archivo q tiene todas las rutas
var config_route = require('./routes/config'); //llamo al archivo q tiene todas las rutas
var carrito_route = require('./routes/carrito'); //llamo al archivo q tiene todas las rutas
var venta_route = require('./routes/venta'); //llamo al archivo q tiene todas las rutas
var descuento_route = require('./routes/descuento'); //llamo al archivo q tiene todas las rutas

//mongoose.set('useFindAndModify', false);//para q no me tire error cuando use findByIdAndUpdate o 
mongoose.connect('mongodb://127.0.0.1:27017/tienda',{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err,res)=>{////127.0.0.1:27017 es el puerto por defecto de mongo


if (err) {
    console.log(err);
}else{
    
    server.listen(port,function(){//se usaba el app.listen antes de la instalacion del socket
console.log('Servidor corriendo' + port);

    });
}

}) 
    

// middlewares un metodo q se ejecuta antes de ejecutar la accion de un controlador de ejecutar el resultado de la peticion
app.use(bodyParser.urlencoded({ extended: true })); //app.use un objeto de express configuracion necesaria para bodyParser
app.use(bodyParser.json({limit: '50mb', extended: true })); //q todo lo q le llege lo convierta a json


// Configurar cabeceras y cors PARA PODER HACER PETICIONES AJAX AL BACKEND SI PROBLEMAS
//DE ESTA MANERA VAMOS A PERMITIR EL ACCESO CRUZADO ENTTRE DOMINIOS Y EVITAR FALLOS A LA HORA DE TRABAJAR CON FRONTEN A LA PARTE DEL BACKEND
//ESTO ES UN middlewares PARA CONfigurarnos las cabezeras 
//siempre se va a ejecutar esto antes de cada peticion
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //'*' esto se cambia si esta en produccion este proyecto
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// rutas
app.use('/', express.static('client', {redirect:false}));
app.use('/api', cliente_route); //app.use porque es un middlewares ...'/api' para q sea de esta manera http://localhost:3700/api/test puedo hacerlo sin el api y seria http://localhost:3700/test 
app.use('/api', admin_route); //app.use porque es un middlewares ...'/api' para q sea de esta manera http://localhost:3700/api/test puedo hacerlo sin el api y seria http://localhost:3700/test 
app.use('/api', producto_route); //app.use porque es un middlewares ...'/api' para q sea de esta manera http://localhost:3700/api/test puedo hacerlo sin el api y seria http://localhost:3700/test 
app.use('/api', cupon_route); //app.use porque es un middlewares ...'/api' para q sea de esta manera http://localhost:3700/api/test puedo hacerlo sin el api y seria http://localhost:3700/test 
app.use('/api', config_route); //app.use porque es un middlewares ...'/api' para q sea de esta manera http://localhost:3700/api/test puedo hacerlo sin el api y seria http://localhost:3700/test 
app.use('/api', carrito_route);
app.use('/api', venta_route);
app.use('/api', descuento_route);
app.get('*', function(req,res, next){
	res.sendFile(path.resolve('client/index.html'));
});



// exportar
module.exports = app; //exporto app q tiene todo para poder importar e usarlo en otro lado