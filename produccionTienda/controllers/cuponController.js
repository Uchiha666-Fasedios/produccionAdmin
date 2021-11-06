'use strict'

var Cupon = require('../models/cupon');

const registro_cupon_admin = async function(req, res){//async define una función asíncrona,

if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
    if (req.user.role == 'admin') {//si es admin paso
        var data = req.body; //req lo q le puedo estar enviando desde el cliente o la peticion q yo haga req.body lo q llega del body de la peticion 
   //REGISTRO_CUPON
  var reg  = await Cupon.create(data);
    //req lo q le puedo estar enviando desde el cliente o la peticion q yo haga y res es la response q yo estoy enviando
    res.status(200).send({data:reg});//status(200) q si es una respuesta exitosa send para enviar los datos                      
                               
    }else{
        res.status(500).send({message:'NoAccess'});
    }
  }else{
      res.status(500).send({message:'NoAccess'});
  }


}


const listar_cupones_admin = async function(req, res){//async define una función asíncrona,
//console.log(req.user);
if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
    if (req.user.role == 'admin') {//si es admin paso
                        //let tipo=req.params['tipo'];
                let filtro=req.params['filtro'];
                let reg = await Cupon.find({codigo:new RegExp(filtro,'i')}).sort({createdAt:-1});//find va buscar por codigo..RegExp permiten describir secuencias de caracteres
               //sort({createdAt:-1}) lo ordena del mas actual primero
               res.status(200).send({data:reg});
              
    }else{
        res.status(500).send({message:'NoAccess'}); 
    }
}else{
res.status(500).send({message:'NoAccess'}); 
}


}


const obtener_cupon_admin = async function(req, res){//async define una función asíncrona,
//console.log(req.user);
if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
    if (req.user.role == 'admin') {//si es admin paso
     var id=req.params['id'];
try {//si va todo bien y no hay errores porqe si se pone en la url otro id desconocido captura el error
    var reg  = await Cupon.findById({_id:id});//findById busco por id
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



const actualizar_cupon_admin = async function(req, res){

if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
    if (req.user.role == 'admin') {//si es admin paso
     var id=req.params['id'];
     var data=req.body;//lo q me viene del formulario del body
var reg  = await Cupon.findByIdAndUpdate({_id:id},{//findByIdAndUpdate busco por id y actualiza
codigo:data.codigo,
tipo:data.tipo,
valor:data.valor,
limite:data.limite
}) 

res.status(200).send({data:reg});
                
    }else{
res.status(500).send({message:'NoAccess'}); 
    }
}else{
res.status(500).send({message:'NoAccess'}); 
}


}


const eliminar_cupon_admin = async function(req, res){

if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
    if (req.user.role == 'admin') {//si es admin paso
var id=req.params['id'];
var reg  = await Cupon.findByIdAndRemove({_id:id});//findByIdAndRemove busco por id y elimino
res.status(200).send({data:reg});
                
    }else{
res.status(500).send({message:'NoAccess'}); 
    }
}else{
res.status(500).send({message:'NoAccess'}); 
}

}



const validar_cupon_admin = async function(req, res){//async define una función asíncrona,

if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
   var cupon = req.params['cupon'];
   var data  = await Cupon.findOne({codigo:cupon});//busca uno en Cupon donde el cupon q me llega coincida con el codigo en mongodb

if (data) {//si hay algun cupon
    if (data.limite == 0) {//si este cupon de mongodb tiene de limite igual a 0 
    res.status(200).send({data:undefined}); 
}else{
res.status(200).send({data:data}); //devuelvo la data
}
}else{
res.status(200).send({data:undefined}); 
}

  }else{
      res.status(500).send({message:'NoAccess'});
  }


}



module.exports = { 
   registro_cupon_admin,
   listar_cupones_admin,
   obtener_cupon_admin,
   actualizar_cupon_admin,
   eliminar_cupon_admin,
   validar_cupon_admin
    }; //para poder importarlo con un reqired