'use strict'

var Venta = require('../models/venta');
var Dventa = require('../models/dventa');
var Producto = require('../models/producto');
var Carrito = require('../models/carrito');

//para el uso de los emails
var fs = require('fs');
var handlebars = require('handlebars');
var ejs = require('ejs');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var path = require('path');
//////////////////////////

const registro_compra_cliente = async function(req, res){//async define una función asíncrona,

if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
 
var data = req.body;//esta data viene con venta.subtotal,venta.envio_precio,venta.envio_titulo,venta.transaccion,venta.cliente,venta.direccion y venta.detalles
var detalles = data.detalles;


var venta_last = await Venta.find().sort({createdAt: -1});//find busca todo lo q tiene venta desde mongodb atravez del modelo venta lo ordena al mas actual
var serie;
var correlativo;
var n_venta;

///////darle el nventa y el estado//////////////

if (venta_last.length == 0) {// si es el primer registro en mongodb o sea no hay nada creado entro
    serie = '001';
    correlativo='000001';

    n_venta = serie + '-' + correlativo;//le agrego esto 001-000001
}else{//es porqe hay creado al menos una venta
var last_nventa = venta_last[0].nventa;//le ingreso de la primer venta el nventa q esta en mongodb creado
var arr_nventa = last_nventa.split('-');// convierto a la cadena en array

if (arr_nventa[1] != '999999') {//si en la segunda posicion del array es diferente a 999999 significa q va ser menor
//zfill es un metodo q lo obtube de los recursos .. para q rellene de ceros una cadena lleva un parametro q es el total de numeros q tengo dependiendo 
    var new_correlativo = zfill(parseInt(arr_nventa[1])+1,6);//lo q hacemos en esa posicion de los 6 numeros sumamos uno. y de parametro le damos 6 q son los 6 numeros q tiene para q luego la funcion zfill se encarge 
    n_venta = arr_nventa[0] + '-' + new_correlativo;
}else if(arr_nventa[1] == '999999'){//si tiene 999999 la segunda posicion entonces es q hay q sumarle a la primera posicion del array 
   var new_serie = zfill(parseInt(arr_nventa[0])+1,3);
    n_venta = new_serie + '-' + '000001';
}

}

//le agregamos a la data estos dos
data.nventa = n_venta;//en data q se va a llamar nventa (siempre mirando los nombres del modelo) le agregamos n_venta
data.estado = 'Procesando';//en data q se va a llamar estado le agregamos procesando
////////////////////////////////////////////////

let venta = await Venta.create(data);//creamos la venta 

//recorremos los detalles q vienen con lo q necesita el modelo dventa para su creacion
detalles.forEach(async element => { //async define una función asíncrona, tengo q ponerlo en el foreach
    element.venta = venta._id;//antes de crear dventa en mongodb le agregamos un elemento mas llamado venta y le ingresamos el id de la venta anteriorment creada 
     await Dventa.create(element);//creamos la dventa en mongodb
let element_producto = await Producto.findById({_id:element.producto});
let new_stock = element_producto.stock - element.cantidad;
 await Producto.findByIdAndUpdate({_id:element.producto},{//findByIdAndUpdate busco por id y actualiza
stock:new_stock
});

//limpio carrito
await Carrito.deleteOne({cliente:data.cliente});

 });

    res.status(200).send({venta:venta});//status(200) q si es una respuesta exitosa send para enviar los datos como parametro venta                      
                           
    
  }else{
      res.status(500).send({message:'NoAccess'});
  }


}

//metodo q viene de los recursos es basicamente para rellenar de ceros una cadena
function zfill(number, width) {
    var numberOutput = Math.abs(number); 
    var length = number.toString().length;
    var zero = "0";
    
    if (width <= length) {
        if (number < 0) {
             return ("-" + numberOutput.toString()); 
        } else {
             return numberOutput.toString(); 
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString()); 
        }

    }
}

////////////////////////

const enviar_correo_compra_cliente = async function(req, res){

    var id = req.params['id'];
    var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
    };

    var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
    user: 'micuarzo1@gmail.com',
    pass: 'gaupriupfvhrvypd'
    }
    }));

    //cliente _id fecha data subtotal

    var venta = await Venta.findById({_id:id}).populate('cliente');
    var detalles = await Dventa.find({venta:id}).populate('producto');

    var cliente = venta.cliente.nombres+' '+venta.cliente.apellidos;
    var _id = venta._id;
    var fecha = new Date(venta.createdAt);
    var data = detalles;
    var subtotal = venta.subtotal;
    var precio_envio = venta.envio_precio;

    readHTMLFile(process.cwd() + '/mail.html', (err, html)=>{
                            
        let rest_html = ejs.render(html, {data: data,cliente:cliente,_id:_id,fecha:fecha,subtotal:subtotal,precio_envio:precio_envio});//rederiza la plantilla 

        var template = handlebars.compile(rest_html);
        var htmlToSend = template({op:true});

        var mailOptions = {
            from: 'micuarzo1@gmail.com',
            to: venta.cliente.email,
            subject: 'Gracias por tu compra, Mi Tienda',
            html: htmlToSend
        };
        res.status(200).send({data:true});
        transporter.sendMail(mailOptions, function(error, info){
            if (!error) {
                console.log('Email sent: ' + info.response);
            }
        });
  
    });

}



module.exports = { 
    registro_compra_cliente,
    enviar_correo_compra_cliente
  
    }; //para poder importarlo con un reqired