'use strict'

var mongoose = require('mongoose'); //cargo este modulo esta libreria q es la q se encarga de trabajar con los modelos
var Schema = mongoose.Schema; //vamos a usar el metodo schema

var Inicio1Schema = Schema({
    titulo0: {type: String, required: true},
    titulo1: {type: String, required: true},
    titulo2: {type: String, required: true},
    titulo3: {type: String, required: true},
    titulo4: {type: String, required: true},
    texto1a: {type: String, required: true},
    texto1b: {type: String, required: true},
    texto2a: {type: String, required: true},
    texto2b: {type: String, required: true},
    texto2c: {type: String, required: true},
    texto3a: {type: String, required: true},
    texto3b: {type: String, required: true},
    texto4a: {type: String, required: true},
    texto4b: {type: String, required: true},
    imagen1: {type: String, required: false},
    imagen2: {type: String, required: false},
    imagen3: {type: String, required: false},
    imagen4: {type: String, required: false},
    
});


module.exports = mongoose.model('inicio1', Inicio1Schema); ////para poder importarlo con un reqired
//mongoose.model para utilizarlo como modelo va tener dos parametros ..Project el numero de mi entidad el segundo ProjectSchema
// projects  --> mongoose guarda los documents en la coleccion