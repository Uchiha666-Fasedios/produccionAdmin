'use strict'

var Carrito = require('../models/carrito');
var fs = require('fs');//modulo para archivos
var path = require('path');//modulo para manejar imagenes


const agregar_carrito_cliente = async function(req, res){//async define una función asíncrona,

//console.log(req.user);
if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js

  var data= req.body;//lo q viene de la vista del formulario del body
//valido q no se repita el mismo producto (q no se agrege el mismo varias veces)
let carrito_cliente = await Carrito.find({cliente:data.cliente,producto:data.producto});//find busco en carrito el id del cliente y el id del producto

if (carrito_cliente.length == 0) {
  //lo agrego
  var reg  = await Carrito.create(data);
  res.status(200).send({data:reg});//status(200) q si es una respuesta exitosa send para enviar los datos

}else if(carrito_cliente.length >= 1){
res.status(200).send({data:undefined});
}

  

}else{
res.status(500).send({message:'NoAccess'}); 
}





}



const obtener_carrito_cliente = async function(req, res){//async define una función asíncrona,

//console.log(req.user);
if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js

  let id=req.params['id'];
//valido q no se repita el mismo producto (q no se agrege el mismo varias veces)
let carrito_cliente = await Carrito.find({cliente:id}).populate('producto');//find busco en carrito el id del cliente y el id del producto..populate('producto') es lo q viene a ser en sql un iner join y su relacion es con producto(el id) 
res.status(200).send({data:carrito_cliente});


  

}else{
res.status(500).send({message:'NoAccess'}); 
}





}


const eliminar_producto_carrito_cliente = async function(req, res){

if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
   
var id=req.params['id'];
var reg  = await Carrito.findByIdAndRemove({_id:id});//findByIdAndRemove busco por id y elimino

res.status(200).send({data:reg});
                
   
}else{
res.status(500).send({message:'NoAccess'}); 
}

}






module.exports = { 
    agregar_carrito_cliente,
    obtener_carrito_cliente,
    eliminar_producto_carrito_cliente
    }; //para poder importarlo con un reqired