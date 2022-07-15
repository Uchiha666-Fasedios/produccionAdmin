'use strict'

var mongoose = require('mongoose'); //cargo este modulo esta libreria q es la q se encarga de trabajar con los modelos
var Schema = mongoose.Schema; //vamos a usar el metodo schema

var Parte2Schema = Schema({
    titulo0:{type: String, required: true},
    texto1: {type: String, required: true},
    texto2: {type: String, required: true},
    texto3: {type: String, required: true},
    texto4: {type: String, required: true},
   
    imagen1: {type: String, required: true},
    imagen2: {type: String, required: true},
    imagen3: {type: String, required: true},  
});


module.exports = mongoose.model('parte2', Parte2Schema); ////para poder importarlo con un reqired
//mongoose.model para utilizarlo como modelo va tener dos parametros ..Project el numero de mi entidad el segundo ProjectSchema
// projects  --> mongoose guarda los documents en la coleccion