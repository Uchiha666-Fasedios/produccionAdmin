'use strict'

var Config = require('../models/config');
var Variedad = require('../models/Variedad');
var fs = require('fs');//modulo para archivos
var path = require('path');//modulo para manejar imagenes



/*const obtener_config_admin = async function(req, res){//async define una función asíncrona,

//console.log(req.user);
if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
    if (req.user.role == 'admin') {//si es admin paso

try {//si va todo bien y no hay errores porqe si se pone en la url otro id desconocido captura el error
    var reg  = await Config.findById({_id:"6133c21c909f8e22b8ec6adc"});//findById busco por id
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


}*/

const obtener_config_admin = async (req,res)=>{
    let config = await Config.find();
    if(config.length == 0){
        config.titulo='coloca titulo';
    }
        //console.log(config);
    res.status(200).send({data:config});
}




const actualiza_config_admin = async function(req, res){//async define una función asíncrona,

    let config = await Config.find();

if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
    if (req.user.role == 'admin') {//si es admin paso

var data = req.body; //req lo q le puedo estar enviando desde el cliente o la peticion q yo haga req.body lo q llega del body de la peticion 

    if (req.files) {//si hay imagen
    console.log('SI HAY IMAGEN');
   


var img_path = req.files.logo.path;//agarro la ruta junto con su nombre de la imagen
var name = img_path.split('/');
var logo_name = name[2];


var reg  = await Config.findByIdAndUpdate({_id:config[0]._id},{//findByIdAndUpdate busco por id y actualiza, 6133c21c909f8e22b8ec6adc es el id de robomongo en config el primero q cree por defecto con la serie 001 y correlativo 000001
categorias:JSON.parse(data.categorias),//lo convierto a array porqe venia como objeto json por el tema de la imagen
titulo:data.titulo,
//serie:data.serie,
logo:logo_name,
//correlativo:data.correlativo,
banco:data.banco,
cbu:data.cbu,
claveGmail:data.claveGmail,
dominio:data.dominio,

tokenMercadoPago:data.tokenMercadoPago,
clientIdPaypal:data.clientIdPaypal,
envio_activacion : data.envio_activacion,
lenguaje : data.lenguaje,
monto_min_soles: data.monto_min_soles,
monto_min_dolares : data.monto_min_dolares
});//EN REG QEDA LO ANTERIOR

//console.log('lo anteriror'+reg);

//obtener logo e iliminarla.. para eliminar las imagenes anteriores o sea q no voy a usar porqe se esta poniendo una nueva 
fs.stat('./uploads/configuraciones/'+reg.logo,function(err){//stat metodo del modulo..obtengo el logo o sea la imagen del backend donde esta uploads
if (!err) {//si no ay error o se si ay imagen
  fs.unlink('./uploads/configuraciones/'+reg.logo,(err)=>{//la elimino
      if(err) throw err;
  });  
}  
});



res.status(200).send({data:reg});

}else{//si no ay imagen
//var id=req.params['id'];
console.log('NO HAY IMAGEN');
var data=req.body;//lo q me viene del formulario del body
    var reg  = await Config.findByIdAndUpdate({_id:config[0]._id},{//findByIdAndUpdate busco por id y actualiza, 6133c21c909f8e22b8ec6adc es el id de robomongo en config el primero q cree por defecto con la serie 001 y correlativo 000001
categorias:data.categorias,
titulo:data.titulo,
//serie:data.serie,
//correlativo:data.correlativo,
banco:data.banco,
cbu:data.cbu,
claveGmail:data.claveGmail,
dominio:data.dominio,

tokenMercadoPago:data.tokenMercadoPago,
clientIdPaypal:data.clientIdPaypal,
lenguaje : data.lenguaje,
envio_activacion : data.envio_activacion,
monto_min_soles: data.monto_min_soles,
monto_min_dolares : data.monto_min_dolares
});

res.status(200).send({data:reg});
}

                
    }else{
res.status(500).send({message:'NoAccess'}); 
    }
}else{
res.status(500).send({message:'NoAccess'}); 
}


}


const obtener_logo = async function(req, res){//async define una función asíncrona,

var img=req.params['img'];
//console.log(img);
fs.stat('./uploads/configuraciones/'+img,function(err){
  if (!err) {
      let path_img='./uploads/configuraciones/'+img;
      res.status(200).sendFile(path.resolve(path_img));
  }else{
      let path_img='./uploads/default.jpg';
      res.status(200).sendFile(path.resolve(path_img));
  }  
})

}



const obtener_config_public = async function(req, res){//async define una función asíncrona,

    var reg  = await Config.findById({_id:'6133c21c909f8e22b8ec6adc'});//findById busco por id
                res.status(200).send({data:reg});  

}


const obtener_variedades_public = async function(req,res){
    let variedades = await Variedad.find();
    res.status(200).send({data:variedades});
}





module.exports = { 
    actualiza_config_admin,
    obtener_config_admin,
    obtener_logo,
    obtener_config_public,
    obtener_variedades_public
    }; //para poder importarlo con un reqired