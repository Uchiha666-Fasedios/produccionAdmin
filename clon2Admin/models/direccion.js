'use strict'

var mongoose = require('mongoose'); //cargo este modulo esta libreria q es la q se encarga de trabajar con los modelos
var Schema = mongoose.Schema; //vamos a usar el metodo schema

var DireccionSchema = Schema({
    cliente: {type: Schema.ObjectId, ref:'cliente', required: true},
    nombres:{type: String, required: true},
    apellidos:{type: String, required: true},
    destinatario: {type: String, required: false},
    dni: {type: String, required: false},
    zip: {type: String, required: false},
    direccion: {type: String, required: true},
    pais: {type: String,default:'Argentina', required: false},
    region: {type: String, required: false},
    provincia: {type: String, required: false},
    distrito: {type: String, required: false},
    telefono: {type: String, required: true},
    principal: {type: Boolean, required: true},
    createdAt: {type:Date, default:Date.now, require:true}//por defecto Date.now la fecha del momento
});

module.exports = mongoose.model('direccion', DireccionSchema); ////para poder importarlo con un reqired
//mongoose.model para utilizarlo como modelo va tener dos parametros ..Project el numero de mi entidad el segundo ProjectSchema
// projects  --> mongoose guarda los documents en la coleccion