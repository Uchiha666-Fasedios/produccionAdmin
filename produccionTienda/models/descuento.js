'use strict'

var mongoose = require('mongoose'); //cargo este modulo esta libreria q es la q se encarga de trabajar con los modelos
var Schema = mongoose.Schema; //vamos a usar el metodo schema

var DescuentoSchema = Schema({
    titulo: {type: String, required:true},
    banner: {type: String, required:true},
    descuento: {type: Number, required:true},
    fecha_inicio: {type: String, required:true},
    fecha_fin: {type: String, required:true},
    createdAt: {type:Date, default:Date.now, require:true}//por defecto Date.now la fecha del momento
});

module.exports = mongoose.model('descuento', DescuentoSchema); ////para poder importarlo con un reqired
//mongoose.model para utilizarlo como modelo va tener dos parametros ..Project el numero de mi entidad el segundo ProjectSchema
// projects  --> mongoose guarda los documents en la coleccion