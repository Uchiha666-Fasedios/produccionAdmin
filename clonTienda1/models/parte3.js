'use strict'

var mongoose = require('mongoose'); //cargo este modulo esta libreria q es la q se encarga de trabajar con los modelos
var Schema = mongoose.Schema; //vamos a usar el metodo schema

var Parte3Schema = Schema({
    titulo0: {type: String, required: true},
    titulo: {type: String, required: true},
    titulo2: {type: String, required: true},

    textoa: {type: String, required: true},
    textob: {type: String, required: true},
    textoc: {type: String, required: true},
    textod: {type: String, required: true},
    textoe: {type: String, required: true},
    textof: {type: String, required: true},
    textog: {type: String, required: true},
    textoh: {type: String, required: true},
    textoi: {type: String, required: true},
    textoj: {type: String, required: true},
   
    imagen1: {type: String, required: true},
    imagen2: {type: String, required: true},
    imagen3: {type: String, required: true},  
    imagen4: {type: String, required: true},
    imagen5: {type: String, required: true},
});
      
module.exports = mongoose.model('parte3', Parte3Schema); ////para poder importarlo con un reqired
//mongoose.model para utilizarlo como modelo va tener dos parametros ..Project el numero de mi entidad el segundo ProjectSchema
// projects  --> mongoose guarda los documents en la coleccion