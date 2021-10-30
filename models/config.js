'use strict'

var mongoose = require('mongoose'); //cargo este modulo esta libreria q es la q se encarga de trabajar con los modelos
var Schema = mongoose.Schema; //vamos a usar el metodo schema

var ConfigSchema = Schema({
    categorias: [{type: Object, required: true}],
    titulo: {type: String, required:true},//porcentaje | precio fijo
    logo: {type: String, required:true},
    serie: {type: String, required:true},
    correlativo: {type: String, required:true},
});

module.exports = mongoose.model('config', ConfigSchema); ////para poder importarlo con un reqired
//mongoose.model para utilizarlo como modelo va tener dos parametros ..Project el numero de mi entidad el segundo ProjectSchema
// projects  --> mongoose guarda los documents en la coleccion