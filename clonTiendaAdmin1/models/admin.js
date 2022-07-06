'use strict'

var mongoose = require('mongoose'); //cargo este modulo esta libreria q es la q se encarga de trabajar con los modelos
var Schema = mongoose.Schema; //vamos a usar el metodo schema

var AdminSchema = Schema({
    nombres: {type: String,default:'nn', required: true},
    apellidos: {type: String,default:'nn', required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    telefono: {type: String,default:'4512452', required: true},
    city: {type: String,default:'ponedcity', required: true},
    pais: {type: String,default:'ponedpais', required: true},
    rol: {type: String,default:'admin', required: true},
    dni: {type: String,default:'29115222', required: true},
});

module.exports = mongoose.model('admin', AdminSchema); ////para poder importarlo con un reqired
//mongoose.model para utilizarlo como modelo va tener dos parametros ..Project el nombre de mi entidad el segundo ProjectSchema
// projects  --> mongoose guarda los documents en la coleccion