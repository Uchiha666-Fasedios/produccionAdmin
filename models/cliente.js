'use strict'

var mongoose = require('mongoose'); //cargo este modulo esta libreria q es la q se encarga de trabajar con los modelos
var Schema = mongoose.Schema; //vamos a usar el metodo schema

var ClienteSchema = Schema({
    nombres: {type: String, required: true},
    apellidos: {type: String, required: true},
    pais: {type: String, default:'Argentina', required: false},
    email: {type: String, required: true},
    password: {type: String, required: true},
    perfil: {type: String, default:'perfil.png', required: true},
    telefono: {type: String, default:'46622545', required: false},
    genero: {type: String, default:'humano', required: false},
    f_nacimiento: {type: String, default:'22/10/1981', required: false},
    dni: {type: String, default:'30115366', required: false},
    //rol: {type: String, required: true},
    createdAt: {type:Date, default:Date.now, require:true}//por defecto Date.now la fecha del momento
});

module.exports = mongoose.model('cliente', ClienteSchema); ////para poder importarlo con un reqired
//mongoose.model para utilizarlo como modelo va tener dos parametros ..Project el numero de mi entidad el segundo ProjectSchema
// projects  --> mongoose guarda los documents en la coleccion