'use strict'

var mongoose = require('mongoose'); //cargo este modulo esta libreria q es la q se encarga de trabajar con los modelos
var Schema = mongoose.Schema; //vamos a usar el metodo schema

var TerminosSchema = Schema({
    titulo1: {type: String, required: false},
    titulo2: {type: String, required: false},
    titulo3: {type: String, required: false},
    titulo4: {type: String, required: false},
    titulo5: {type: String, required: false},
    titulo6: {type: String, required: false},
    titulo7: {type: String, required: false},
    

    textoa: {type: String, required: false},
    textob: {type: String, required: false},
    textoc: {type: String, required: false},
    textod: {type: String, required: false},
    textoe: {type: String, required: false},
    textof: {type: String, required: false},
    textog: {type: String, required: false},
    textoh: {type: String, required: false},
    textoi: {type: String, required: false},
    textoj: {type: String, required: false},
    textok: {type: String, required: false},
    textol: {type: String, required: false}
  
});
      
module.exports = mongoose.model('terminos', TerminosSchema); ////para poder importarlo con un reqired
//mongoose.model para utilizarlo como modelo va tener dos parametros ..Project el numero de mi entidad el segundo ProjectSchema
// projects  --> mongoose guarda los documents en la coleccion