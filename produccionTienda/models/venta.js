'use strict'

var mongoose = require('mongoose'); //cargo este modulo esta libreria q es la q se encarga de trabajar con los modelos
var Schema = mongoose.Schema; //vamos a usar el metodo schema

var VentaSchema = Schema({
    cliente: {type: Schema.ObjectId, ref:'cliente', required: true},//Aca se esta vinculando el campo producto a la coleccion producto o sea al modelo producto..ref:'producto' qiere decir q hace referencia a esta coleccion
    nventa: {type: String, required: true},
    subtotal: {type: Number, required: true},
    envio_titulo: {type: String, required: true},
    envio_precio: {type: Number, required: true},
    transaccion: {type: String, required: true},
    cupon: {type: String, required: false},
    estado: {type: String, required: true},
    direccion: {type: Schema.ObjectId, ref:'direccion', required: true},
    nota: {type: String, required: false},
    createdAt: {type:Date, default:Date.now, require:true}
});

module.exports = mongoose.model('venta', VentaSchema); ////para poder importarlo con un reqired
//mongoose.model para utilizarlo como modelo va tener dos parametros ..Project el numero de mi entidad el segundo ProjectSchema
// projects  --> mongoose guarda los documents en la coleccion