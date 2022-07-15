'use strict'

var mongoose = require('mongoose'); //cargo este modulo esta libreria q es la q se encarga de trabajar con los modelos
var Schema = mongoose.Schema; //vamos a usar el metodo schema

var VentaSchema = Schema({
    cliente: {type: Schema.ObjectId, ref: 'cliente', required: true},
    subtotal: {type: Number, require: true},
    total_pagar: {type: Number, require: true},
    currency: {type: String, require: true},
    tracking: {type: String,default: '', require: true},
    envio_precio: {type: Number, require: true},
    transaccion: {type: String, require: true},
    cupon: {type: String, require: false},
    metodo_pago: {type: String, require: true},
    estado: {type: String, require: true},
    tipo_descuento: {type: String, require: false},
    valor_descuento: {type: String, require: false},
    direccion: {type: Schema.ObjectId, ref: 'direccion', require: true},
    nota: {type: String, require: false},
    createdAt: {type:Date, default: Date.now, require: true}
});

module.exports = mongoose.model('venta', VentaSchema); ////para poder importarlo con un reqired
//mongoose.model para utilizarlo como modelo va tener dos parametros ..Project el numero de mi entidad el segundo ProjectSchema
// projects  --> mongoose guarda los documents en la coleccion