'use strict'

var mongoose = require('mongoose'); //cargo este modulo esta libreria q es la q se encarga de trabajar con los modelos
var Schema = mongoose.Schema; //vamos a usar el metodo schema

var ContactoSchema = Schema({
    cliente: {type: String, required: true},
    mensaje: {type: String, required: true},
    asunto: {type: String, required: true},
    telefono: {type: String, required: true},
    correo: {type: String, required: true},
    estado: {type: String, required: true},
    createdAt: {type:Date, default:Date.now, require:true}//por defecto Date.now la fecha del momento
});

module.exports = mongoose.model('contacto', ContactoSchema); ////para poder importarlo con un reqired
//mongoose.model para utilizarlo como modelo va tener dos parametros ..Project el numero de mi entidad el segundo ProjectSchema
// projects  --> mongoose guarda los documents en la coleccion