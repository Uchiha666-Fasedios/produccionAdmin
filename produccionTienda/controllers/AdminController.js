'use strict'

var admin = require('../models/admin'); //me traigo el modelo LOS REQIRED LOS PUEDO HACER PORQE SE AGREGO module.exports EN LOS ARCHIVOS de donde los llamo
var Contacto = require('../models/contacto');
var Venta = require('../models/venta');
var Dventa = require('../models/dventa');
//var fs = require('fs'); //libreria para archivos
//var path = require('path'); //modulo de nodejs para cargar rutas fisicas de nuestro sistema de archivo
var bcrypt=require('bcrypt-nodejs');//tomo el paqete de encriptacion
var jwt=require('../helpers/jwt');



const registro_admin = async function(req, res){//async define una función asíncrona,

var data = req.body; //req lo q le puedo estar enviando desde el cliente o la peticion q yo haga req.body lo q llega del body de la peticion 
var admin_arr = [];

//El operador await es usado para esperar a una Promise. Sólo puede ser usado dentro de una función async function.
//La expresión await provoca que la ejecución de una función async sea pausada hasta que una Promise sea terminada o rechazada, y regresa a la ejecución de la función async después del término
admin_arr = await admin.find({email:data.email})//aca lo q hago es buscar en el modelo cliente el email, va viendo si con data.email q es lo q me llega del post esta

if (admin_arr.length == 0) {//si no existe entro para crearlo
   
if (data.password) {//si me llega un password
    bcrypt.hash(data.password,null,null,async function(req, hash){//la encripto
if (hash) {//si se encripto
    data.password=hash;//la seteo 
     //REGISTRO
  var reg  = await admin.create(data);
    //req lo q le puedo estar enviando desde el cliente o la peticion q yo haga y res es la response q yo estoy enviando
    res.status(200).send({data:reg});//status(200) q si es una respuesta exitosa send para enviar los datos
}else{//si no se encripto
      res.status(200).send({ //status(200) q si es una respuesta exitosa send para enviar los datos
            message: 'ErrorServer',data:undefined
        });
}
    })
}else{//no me llega la password

    res.status(200).send({ //status(200) q si es una respuesta exitosa send para enviar los datos
            message: 'No hay una contraseña',data:undefined
        });
      
}

}else{//ya existe el email
    res.status(200).send({ //status(200) q si es una respuesta exitosa send para enviar los datos
            message: 'El correo ya existe en la base de datos',data:undefined
        });
}


}


//LOGIN

const login_admin = async function(req, res){//async define una función asíncrona,

 
var data = req.body; //req lo q le puedo estar enviando desde el cliente o la peticion q yo haga req.body lo q llega del body de la peticion 
var admin_arr = [];

admin_arr = await admin.find({email:data.email})

if (admin_arr.length == 0) {
res.status(200).send({ //status(200) q si es una respuesta exitosa send para enviar los datos
            message: 'No se encontro el correo',data:undefined
        });
}else{
//LOGIN
let user=admin_arr[0];

 bcrypt.compare(data.password,user.password ,async function(error, check){
if (check) {
    res.status(200).send({ //status(200) q si es una respuesta exitosa send para enviar los datos
            data: user,
            token:jwt.createToken(user)//llamo al helper con su metodo
        });
}else{
    res.status(200).send({ //status(200) q si es una respuesta exitosa send para enviar los datos
            message: 'La contraseña no coincide',data:undefined
        });
}

  });



}

}




const obtener_mensajes_admin = async function(req, res){//async define una función asíncrona,

//console.log(req.user);
if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
    if (req.user.role == 'admin') {//si es admin paso

try {//si va todo bien y no hay errores porqe si se pone en la url otro id desconocido captura el error
    var reg  = await Contacto.find().sort({createdAt:-1});//busco todos los mensajes o sea lo q hay en contacto del mas actual al mas viejo
                res.status(200).send({data:reg});  
} catch (error) {//captura el error
    res.status(200).send({data:undefined});//manda la data undefined para poder validar en el fronten edit-component  
}
        
                
    }else{
res.status(500).send({message:'NoAccess'}); 
    }
}else{
res.status(500).send({message:'NoAccess'}); 
}


}


const cerrar_mensajes_admin = async function(req, res){//async define una función asíncrona,

//console.log(req.user);
if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
    if (req.user.role == 'admin') {//si es admin paso

    let id = req.params['id'];

try {//si va todo bien y no hay errores porqe si se pone en la url otro id desconocido captura el error
    var reg  = await Contacto.findByIdAndUpdate({_id:id},{estado:'Cerrado'});//busco todos los mensajes o sea lo q hay en contacto del mas actual al mas viejo
                res.status(200).send({data:reg});  
} catch (error) {//captura el error
    res.status(200).send({data:undefined});//manda la data undefined para poder validar en el fronten edit-component  
}
        
                
    }else{
res.status(500).send({message:'NoAccess'}); 
    }
}else{
res.status(500).send({message:'NoAccess'}); 
}


}


const obtener_ventas_admin = async function(req, res){//async define una función asíncrona,

//console.log(req.user);
if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
 if (req.user.role == 'admin') {
    let ventas=[];
     let desde = req.params['desde'];
    let hasta = req.params['hasta'];
   
   if (desde == 'undefined' && hasta == 'undefined') {//no hay filtro o sea no se toco el boton de buscar las ventas por fecha
     ventas = await Venta.find().populate('cliente').populate('direccion').sort({createdAt:-1});

  res.status(200).send({data:ventas});
   }else{//hay filtro
let tt_desde = Date.parse(new Date(desde+'T00:00:00'))/1000;//lo convierto a un codigo para poder hacer validaciones con las fechas
let tt_hasta = Date.parse(new Date(hasta+'T00:00:00'))/1000;

let tem_ventas = await Venta.find().populate('cliente').populate('direccion').sort({createdAt:-1});

for (const item of tem_ventas) {
    var tt_created = Date.parse(new Date(item.createdAt))/1000;//lo convierto para poder hacer validaciones
    if (tt_created >= tt_desde && tt_created <= tt_hasta) {//si la fecha de creacion de la venta esta entre tal rango
        ventas.push(item);
    }
}


res.status(200).send({data:ventas});

   }

  

 }else{
    res.status(500).send({message:'NoAccess'});  
 }

}else{
res.status(500).send({message:'NoAccess'}); 
}


}




const kpi_ganancias_mensuales_admin = async function(req, res){//async define una función asíncrona,

//console.log(req.user);
if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
 if (req.user.role == 'admin') {
   
var enero=0;
var febrero=0;
var marzo=0;
var abril=0;
var mayo=0;
var junio=0;
var julio=0;
var agosto=0;
var septiembre=0;
var octubre=0;
var noviembre=0;
var diciembre=0;
  var total_ganancia=0;
  var total_mes=0;
  var count_ventas=0;
  var total_mes_anterior=0;

   var reg  = await Venta.find();//busco todos los mensajes o sea lo q hay en contacto del mas actual al mas viejo
                
        let current_date = new Date();//saco fecha actual
                let current_year = current_date.getFullYear();//saco el año
                let current_month = current_date.getMonth()+1;//saco el mes actual         
                
                for (const item of reg) {
                    let createdAt_date = new Date(item.createdAt);
                   let mes= createdAt_date.getMonth()+1;//me saca el mes le tengo q pooner el mas 1 para q agarre bien
               
                if (current_date.getFullYear() == current_year) {

                    total_ganancia = total_ganancia +item.subtotal;
                    if (mes == current_month) {
                       total_mes = total_mes + item.subtotal;//acumulador del mes
                       count_ventas=count_ventas+1;
                    }

                    if (mes == current_month -1) {
                      total_mes_anterior = total_mes_anterior + item.subtotal;//acumulador del mes 
                    }


                    if (mes == 1) {
                    enero = enero + item.subtotal;//voy sumando lo q va vendiendo tal mes
                }else if(mes == 2){
                    febrero = febrero + item.subtotal;//acumulador..voy sumando lo q va vendiendo tal mes
                }else if(mes == 3){
                    marzo = marzo + item.subtotal;//acumulador..voy sumando lo q va vendiendo tal mes
                }else if(mes == 4){
                    abril = abril + item.subtotal;//acumulador..voy sumando lo q va vendiendo tal mes
                }else if(mes == 5){
                    mayo = mayo + item.subtotal;//acumulador..voy sumando lo q va vendiendo tal mes
                }else if(mes == 6){
                    junio = junio + item.subtotal;//acumulador..voy sumando lo q va vendiendo tal mes
                }else if(mes == 7){
                    julio = julio + item.subtotal;//acumulador..voy sumando lo q va vendiendo tal mes
                }else if(mes == 8){
                    agosto = agosto + item.subtotal;//acumulador..voy sumando lo q va vendiendo tal mes
                }else if(mes == 9){
                    septiembre = septiembre + item.subtotal;//acumulador..voy sumando lo q va vendiendo tal mes
                }else if(mes == 10){
                    octubre = octubre + item.subtotal;//acumulador..voy sumando lo q va vendiendo tal mes
                }else if(mes == 11){
                    noviembre = noviembre + item.subtotal;//acumulador..voy sumando lo q va vendiendo tal mes
                }else if(mes == 12){
                    diciembre = diciembre + item.subtotal;//acumulador..voy sumando lo q va vendiendo tal mes
                } 
                }
                
                
                }

               
                res.status(200).send({
                    enero:enero,
                    febrero:febrero,
                    marzo:marzo,
                    abril:abril,
                    mayo:mayo,
                    junio:junio,
                    julio:julio,
                    agosto:agosto,
                    septiembre:septiembre,
                    octubre:octubre,
                    noviembre:noviembre,
                    diciembre:diciembre,
                    total_ganancia:total_ganancia,
                    total_mes:total_mes,
                    count_ventas:count_ventas,
                    total_mes_anterior
                    });

 }else{
    res.status(500).send({message:'NoAccess'});  
 }

}else{
res.status(500).send({message:'NoAccess'}); 
}


}





module.exports = { 
    registro_admin,
    login_admin,
    obtener_mensajes_admin,
    cerrar_mensajes_admin,
    obtener_ventas_admin,
    kpi_ganancias_mensuales_admin  
    }; //para poder importarlo con un reqired

    

   

