'use strict'

//var admin = require('../models/admin'); //me traigo el modelo LOS REQIRED LOS PUEDO HACER PORQE SE AGREGO module.exports EN LOS ARCHIVOS de donde los llamo
var Admin = require('../models/admin');
var Contacto = require('../models/contacto');
var Venta = require('../models/venta');
var Dventa = require('../models/dventa');
var Etiqueta = require('../models/Etiqueta');
var Producto_etiqueta = require('../models/Producto_etiqueta');
var Producto = require('../models/producto');
var Inicio = require('../models/inicio');
var Inicio1 = require('../models/inicio1');
var Slider = require('../models/slider');
var Parte2 = require('../models/parte2');
var Parte3 = require('../models/parte3');
var Politicas = require('../models/politicas');
var Terminos = require('../models/terminos');
var Variedad = require('../models/Variedad');
var Inventario = require('../models/inventario');
var Config = require('../models/config');
var Carrito = require('../models/carrito');
//var fs = require('fs'); //libreria para archivos
//var path = require('path'); //modulo de nodejs para cargar rutas fisicas de nuestro sistema de archivo
var bcrypt=require('bcrypt-nodejs');//tomo el paqete de encriptacion
var jwt=require('../helpers/jwt');

//para el uso de los emails
var fs = require('fs');
var handlebars = require('handlebars');
var ejs = require('ejs');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var path = require('path');
//////////////////////////



const registro_admin_secret = async function(req, res){//async define una función asíncrona,

    var data = req.body; //req lo q le puedo estar enviando desde el cliente o la peticion q yo haga req.body lo q llega del body de la peticion 
    var admin_arr = [];
    var email=req.params['email'];
    var password=req.params['password'];
    //El operador await es usado para esperar a una Promise. Sólo puede ser usado dentro de una función async function.
    //La expresión await provoca que la ejecución de una función async sea pausada hasta que una Promise sea terminada o rechazada, y regresa a la ejecución de la función async después del término
    admin_arr = await Admin.find({email:email})//aca lo q hago es buscar en el modelo cliente el email, va viendo si con data.email q es lo q me llega del post esta
    
    if (admin_arr.length == 0) {//si no existe entro para crearlo
       
    if (password) {//si me llega un password
        bcrypt.hash(password,null,null,async function(req, hash){//la encripto
    if (hash) {//si se encripto
        data.password=hash;//la seteo 
        data.email=email;//la seteo 
         //REGISTRO
      var reg  = await Admin.create(data);
        //req lo q le puedo estar enviando desde el cliente o la peticion q yo haga y res es la response q yo estoy enviando
        res.status(200).send({data:reg});//status(200) q si es una respuesta exitosa send para enviar los datos
    }else{//si no se encripto
          res.status(200).send({ //status(200) q si es una respuesta exitosa send para enviar los datos
                message: 'ErrorServer',data:undefined
            });
    }
        })
    }else{//no me llega la password
    
        res.status(200).send({ //status(200) q si es una respuesta exitosa send para enviar los datos
                message: 'No hay una contraseña',data:undefined
            });
          
    }
    
    }else{//ya existe el email
        res.status(200).send({ //status(200) q si es una respuesta exitosa send para enviar los datos
                message: 'El correo ya existe en la base de datos',data:undefined
            });
    }
    
    
    }









const registro_admin = async function(req, res){//async define una función asíncrona,

var data = req.body; //req lo q le puedo estar enviando desde el cliente o la peticion q yo haga req.body lo q llega del body de la peticion 
var admin_arr = [];

//El operador await es usado para esperar a una Promise. Sólo puede ser usado dentro de una función async function.
//La expresión await provoca que la ejecución de una función async sea pausada hasta que una Promise sea terminada o rechazada, y regresa a la ejecución de la función async después del término
admin_arr = await Admin.find({email:data.email})//aca lo q hago es buscar en el modelo cliente el email, va viendo si con data.email q es lo q me llega del post esta

if (admin_arr.length == 0) {//si no existe entro para crearlo
   
if (data.password) {//si me llega un password
    bcrypt.hash(data.password,null,null,async function(req, hash){//la encripto
if (hash) {//si se encripto
    data.password=hash;//la seteo 
     //REGISTRO
  var reg  = await Admin.create(data);
    //req lo q le puedo estar enviando desde el cliente o la peticion q yo haga y res es la response q yo estoy enviando
    res.status(200).send({data:reg});//status(200) q si es una respuesta exitosa send para enviar los datos
}else{//si no se encripto
      res.status(200).send({ //status(200) q si es una respuesta exitosa send para enviar los datos
            message: 'ErrorServer',data:undefined
        });
}
    })
}else{//no me llega la password

    res.status(200).send({ //status(200) q si es una respuesta exitosa send para enviar los datos
            message: 'No hay una contraseña',data:undefined
        });
      
}

}else{//ya existe el email
    res.status(200).send({ //status(200) q si es una respuesta exitosa send para enviar los datos
            message: 'El correo ya existe en la base de datos',data:undefined
        });
}


}


//LOGIN

const login_admin = async function(req, res){//async define una función asíncrona,

 
var data = req.body; //req lo q le puedo estar enviando desde el cliente o la peticion q yo haga req.body lo q llega del body de la peticion 
var admin_arr = [];

admin_arr = await Admin.find({email:data.email})

if (admin_arr.length == 0) {
res.status(200).send({ //status(200) q si es una respuesta exitosa send para enviar los datos
            message: 'No se encontro el correo',data:undefined
        });
}else{
//LOGIN
let user=admin_arr[0];

 bcrypt.compare(data.password,user.password ,async function(error, check){
if (check) {
    res.status(200).send({ //status(200) q si es una respuesta exitosa send para enviar los datos
            data: user,
            token:jwt.createToken(user)//llamo al helper con su metodo
        });
}else{
    res.status(200).send({ //status(200) q si es una respuesta exitosa send para enviar los datos
            message: 'La contraseña no coincide',data:undefined
        });
}

  });



}

}




const obtener_mensajes_admin = async function(req, res){//async define una función asíncrona,

//console.log(req.user);
if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
    if (req.user.role == 'admin') {//si es admin paso

try {//si va todo bien y no hay errores porqe si se pone en la url otro id desconocido captura el error
    var reg  = await Contacto.find().sort({createdAt:-1});//busco todos los mensajes o sea lo q hay en contacto del mas actual al mas viejo
                res.status(200).send({data:reg});  
} catch (error) {//captura el error
    res.status(200).send({data:undefined});//manda la data undefined para poder validar en el fronten edit-component  
}
        
                
    }else{
res.status(500).send({message:'NoAccess'}); 
    }
}else{
res.status(500).send({message:'NoAccess'}); 
}


}


const cerrar_mensajes_admin = async function(req, res){//async define una función asíncrona,

//console.log(req.user);
if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
    if (req.user.role == 'admin') {//si es admin paso

    let id = req.params['id'];

try {//si va todo bien y no hay errores porqe si se pone en la url otro id desconocido captura el error
    var reg  = await Contacto.findByIdAndUpdate({_id:id},{estado:'Cerrado'});//busco todos los mensajes o sea lo q hay en contacto del mas actual al mas viejo
                res.status(200).send({data:reg});  
} catch (error) {//captura el error
    res.status(200).send({data:undefined});//manda la data undefined para poder validar en el fronten edit-component  
}
        
                
    }else{
res.status(500).send({message:'NoAccess'}); 
    }
}else{
res.status(500).send({message:'NoAccess'}); 
}


}


const obtener_ventas_admin  = async function(req,res){
    if(req.user){
        let ventas = [];
            let desde = req.params['desde'];
            let hasta = req.params['hasta'];

            ventas = await Venta.find().populate('cliente').populate('direccion').sort({createdAt:-1});
            res.status(200).send({data:ventas});

            
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}




const kpi_ganancias_mensuales_admin = async function(req, res){//async define una función asíncrona,

//console.log(req.user);
if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
 if (req.user.role == 'admin') {
   
var enero=0;
var febrero=0;
var marzo=0;
var abril=0;
var mayo=0;
var junio=0;
var julio=0;
var agosto=0;
var septiembre=0;
var octubre=0;
var noviembre=0;
var diciembre=0;
  var total_ganancia=0;
  var total_mes=0;
  var count_ventas=0;
  var total_mes_anterior=0;

   var reg  = await Venta.find();//busco todos los mensajes o sea lo q hay en contacto del mas actual al mas viejo
                
        let current_date = new Date();//saco fecha actual
                let current_year = current_date.getFullYear();//saco el año
                let current_month = current_date.getMonth()+1;//saco el mes actual         
                
                for (const item of reg) {
                    let createdAt_date = new Date(item.createdAt);
                   let mes= createdAt_date.getMonth()+1;//me saca el mes le tengo q pooner el mas 1 para q agarre bien
               
                if (current_date.getFullYear() == current_year) {

                    total_ganancia = total_ganancia +item.subtotal;
                    if (mes == current_month) {
                       total_mes = total_mes + item.subtotal;//acumulador del mes
                       count_ventas=count_ventas+1;
                    }

                    if (mes == current_month -1) {
                      total_mes_anterior = total_mes_anterior + item.subtotal;//acumulador del mes 
                    }


                    if (mes == 1) {
                    enero = enero + item.subtotal;//voy sumando lo q va vendiendo tal mes
                }else if(mes == 2){
                    febrero = febrero + item.subtotal;//acumulador..voy sumando lo q va vendiendo tal mes
                }else if(mes == 3){
                    marzo = marzo + item.subtotal;//acumulador..voy sumando lo q va vendiendo tal mes
                }else if(mes == 4){
                    abril = abril + item.subtotal;//acumulador..voy sumando lo q va vendiendo tal mes
                }else if(mes == 5){
                    mayo = mayo + item.subtotal;//acumulador..voy sumando lo q va vendiendo tal mes
                }else if(mes == 6){
                    junio = junio + item.subtotal;//acumulador..voy sumando lo q va vendiendo tal mes
                }else if(mes == 7){
                    julio = julio + item.subtotal;//acumulador..voy sumando lo q va vendiendo tal mes
                }else if(mes == 8){
                    agosto = agosto + item.subtotal;//acumulador..voy sumando lo q va vendiendo tal mes
                }else if(mes == 9){
                    septiembre = septiembre + item.subtotal;//acumulador..voy sumando lo q va vendiendo tal mes
                }else if(mes == 10){
                    octubre = octubre + item.subtotal;//acumulador..voy sumando lo q va vendiendo tal mes
                }else if(mes == 11){
                    noviembre = noviembre + item.subtotal;//acumulador..voy sumando lo q va vendiendo tal mes
                }else if(mes == 12){
                    diciembre = diciembre + item.subtotal;//acumulador..voy sumando lo q va vendiendo tal mes
                } 
                }
                
                
                }

               
                res.status(200).send({
                    enero:enero,
                    febrero:febrero,
                    marzo:marzo,
                    abril:abril,
                    mayo:mayo,
                    junio:junio,
                    julio:julio,
                    agosto:agosto,
                    septiembre:septiembre,
                    octubre:octubre,
                    noviembre:noviembre,
                    diciembre:diciembre,
                    total_ganancia:total_ganancia,
                    total_mes:total_mes,
                    count_ventas:count_ventas,
                    total_mes_anterior
                    });

 }else{
    res.status(500).send({message:'NoAccess'});  
 }

}else{
res.status(500).send({message:'NoAccess'}); 
}


}


const agregar_etiqueta_admin = async function(req,res){
    if(req.user){
        try {
            let data = req.body;

            data.slug = data.titulo.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');;
            var reg = await Etiqueta.create(data);
            res.status(200).send({data:reg});
        } catch (error) {
            res.status(200).send({data:undefined,message:'Etiqueta ya existente'});
            
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}


const listar_etiquetas_admin = async function(req,res){
    if(req.user){
        var reg = await Etiqueta.find();
        res.status(200).send({data:reg});
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const eliminar_etiqueta_admin = async function(req,res){
    if(req.user){
        var id = req.params['id'];

        let reg = await Etiqueta.findByIdAndRemove({_id:id});
        res.status(200).send({data:reg});
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}



const listar_etiquetas_producto_admin = async function(req,res){
    if(req.user){
        var id = req.params['id'];
        var etiquetas = await Producto_etiqueta.find({producto:id}).populate('etiqueta');
        res.status(200).send({data:etiquetas});
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}





const listar_variedades_admin = async function(req,res){
    if(req.user){
        var id = req.params['id'];
        let data = await Variedad.find({producto:id,});
        
        res.status(200).send({data:data});
        
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const actualizar_producto_variedades_admin = async function(req,res){
    if(req.user){
        let id = req.params['id'];
        let data = req.body;

        let reg = await Producto.findByIdAndUpdate({_id:id},{
            titulo_variedad: data.titulo_variedad,
        });
        res.status(200).send({data:reg});
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}


const actualizar_inventario_producto_admin = async function(req,res){
    if(req.user){
       // let id = req.params['id'];
        let data = req.body;
         
        
        let inventarioupdate = await Inventario.findOneAndUpdate({producto:data.producto,variedad:data.variedad},{
            cantidad: data.cantidad
        });

        let variedadupdate = await Variedad.findByIdAndUpdate({_id:data.variedad},{
            stock: data.cantidad
        });
    
      
        //OBTENER EL REGISTRO DE PRODUCTO
        let prod = await Producto.findById({_id:data.producto});
        let Inven = await Inventario.find({producto:data.producto});

        //CALCULAR EL NUEVO STOCK        
        //STOCK ACTUAL         
        //STOCK A AUMENTAR
        var nuevo_stock=0;
        for (const item of Inven) {
            nuevo_stock = parseInt(item.cantidad) + parseInt(nuevo_stock);
        }

        //ACTUALICACION DEL NUEVO STOCK AL PRODUCTO
        let producto = await Producto.findByIdAndUpdate({_id:data.producto},{
            stock: nuevo_stock
        });

        /*let variedad = await Variedad.findByIdAndUpdate({_id:reg.variedad},{
            stock: nuevo_stock_vari
        });*/

        res.status(200).send({data:producto});

        
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const eliminar_variedad_admin = async function(req,res){
    if(req.user){
        var id = req.params['id'];

        let reg2 = await Variedad.findByIdAndRemove({_id:id});
        let reg = await Inventario.findOneAndRemove({variedad:id});
        res.status(200).send({data:reg});
            
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const agregar_nueva_variedad_admin = async function(req,res){
    if(req.user){
        var data = req.body;

        let reg = await Variedad.create(data);

        res.status(200).send({data:reg});
        
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}


const obtener_producto_admin = async function(req,res){
    if(req.user){
        var id = req.params['id'];

        try {
            var reg = await Producto.findById({_id:id});
            res.status(200).send({data:reg});
        } catch (error) {
            res.status(200).send({data:undefined});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}


const listar_inventario_producto_admin = async function(req,res){
    if(req.user){
        var id = req.params['id'];

        var reg = await Inventario.find({producto: id}).populate('variedad').sort({createdAt:-1});
        res.status(200).send({data:reg});
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}


const registro_inventario_producto_admin = async function(req,res){
    if(req.user){
        let data = req.body;

        let reg = await Inventario.create(data);

        //OBTENER EL REGISTRO DE PRODUCTO
        let prod = await Producto.findById({_id:reg.producto});
        let varie = await Variedad.findById({_id:reg.variedad});

        //CALCULAR EL NUEVO STOCK        
        //STOCK ACTUAL         
        //STOCK A AUMENTAR
        let nuevo_stock = parseInt(prod.stock) + parseInt(reg.cantidad);

        let nuevo_stock_vari = parseInt(varie.stock) + parseInt(reg.cantidad);

        //ACTUALICACION DEL NUEVO STOCK AL PRODUCTO
        let producto = await Producto.findByIdAndUpdate({_id:reg.producto},{
            stock: nuevo_stock
        });

        let variedad = await Variedad.findByIdAndUpdate({_id:reg.variedad},{
            stock: nuevo_stock_vari
        });

        res.status(200).send({data:reg});
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}


const cambiar_vs_producto_admin = async function(req,res){
    if(req.user){
        var id = req.params['id'];
        var estado = req.params['estado'];

        try {
            if(estado == 'Edicion'){
                await Producto.findByIdAndUpdate({_id:id},{estado:'Publicado'});
                res.status(200).send({data:true});
            }else if(estado == 'Publicado'){
                await Producto.findByIdAndUpdate({_id:id},{estado:'Edicion'});
                res.status(200).send({data:true});
            }
        } catch (error) {
            res.status(200).send({data:undefined});
        }
        
     }else{
         res.status(500).send({message: 'NoAccess'});
     }
}


const listar_variedades_productos_admin = async function(req,res){
    if(req.user){
        var productos = await Variedad.find().populate('producto');

        res.status(200).send({data:productos});
        
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}

const registro_compra_manual_cliente = async function(req,res){
    if(req.user){

        var data = req.body;
        var detalles = data.detalles;

        data.estado = 'Procesando';

        let venta = await Venta.create(data);

        for(var element of detalles){
            element.venta = venta._id;
            element.cliente = venta.cliente;
            await Dventa.create(element);

            let element_producto = await Producto.findById({_id:element.producto});
            
            let new_stock = element_producto.stock - element.cantidad;
            let new_ventas = element_producto.nventas + 1;

            let element_variedad = await Variedad.findById({_id:element.variedad});
            let new_stock_variedad = element_variedad.stock - element.cantidad;

            await Producto.findByIdAndUpdate({_id: element.producto},{
                stock: new_stock,
                nventas: new_ventas
            });

            await Variedad.findByIdAndUpdate({_id: element.variedad},{
                stock: new_stock_variedad,
            });
        }

        enviar_orden_compra(venta._id);

        res.status(200).send({venta:venta});
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}





const marcar_finalizado_orden = async function(req,res){
    if(req.user){

        var id = req.params['id'];
        let data = req.body;

        var venta = await Venta.findByIdAndUpdate({_id:id},{
            estado: 'Finalizado'
        });

        res.status(200).send({data:venta});
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const eliminar_orden_admin = async function(req,res){
    if(req.user){

        var id = req.params['id'];

        var venta = await Venta.findOneAndRemove({_id:id});
        await Dventa.remove({venta:id});

        res.status(200).send({data:venta});
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const marcar_envio_orden = async function(req,res){
    if(req.user){

        var id = req.params['id'];
        let data = req.body;

        var venta = await Venta.findByIdAndUpdate({_id:id},{
            tracking: data.tracking,
            estado: 'Enviado'
        });

        mail_confirmar_envio(id);

        res.status(200).send({data:venta});
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const confirmar_pago_orden = async function(req,res){
    if(req.user){

        var id = req.params['id'];
        let data = req.body;

        var venta = await Venta.findByIdAndUpdate({_id:id},{
            estado: 'Procesando'
        });

        var detalles = await Dventa.find({venta:id});
        for(var element of detalles){
            let element_producto = await Producto.findById({_id:element.producto});
            let new_stock = element_producto.stock - element.cantidad;
            let new_ventas = element_producto.nventas + 1;

            let element_variedad = await Variedad.findById({_id:element.variedad});
            let new_stock_variedad = element_variedad.stock - element.cantidad;

            await Producto.findByIdAndUpdate({_id: element.producto},{
                stock: new_stock,
                nventas: new_ventas
            });

            await Variedad.findByIdAndUpdate({_id: element.variedad},{
                stock: new_stock_variedad,
            });
        }

        res.status(200).send({data:venta});
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}


const mail_confirmar_envio = async function(venta){
    try {
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

        var admin = await Admin.find();
        var config = await Config.find();

        var transporter = nodemailer.createTransport(smtpTransport({
           service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
            user: admin[0].email,
            pass: config[0].claveGmail  
            }
        }));
    
     
        var orden = await Venta.findById({_id:venta}).populate('cliente').populate('direccion');
        var dventa = await Dventa.find({venta:venta}).populate('producto').populate('variedad');
        var config = await Config.find();
        var admin = await Admin.find();
    
        readHTMLFile(process.cwd() + '/mails/email_enviado.html', (err, html)=>{
                                
            let rest_html = ejs.render(html, {orden: orden, dventa:dventa, config:config});
    
            var template = handlebars.compile(rest_html);
            var htmlToSend = template({op:true});
    
            var mailOptions = {
                from: admin[0].email,
                to: orden.cliente.email,
                subject: 'Tu pedido ' + orden._id + ' fué enviado',
                html: htmlToSend
            };
          
            transporter.sendMail(mailOptions, function(error, info){
                if (!error) {
                    console.log('Email sent: ' + info.response);
                }
            });
        
        });
    } catch (error) {
        console.log(error);
    }
}


const enviar_orden_compra = async function(venta){
    try {
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

        var admin = await Admin.find();
        var config = await Config.find();
        var transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
            user: admin[0].email,
            pass: config[0].claveGmail 
            }
        }));
    
     
        var orden = await Venta.findById({_id:venta}).populate('cliente').populate('direccion');
        var dventa = await Dventa.find({venta:venta}).populate('producto').populate('variedad');
        var config = await Config.find();
        var admin = await Admin.find();
    
        readHTMLFile(process.cwd() + '/mails/email_compra.html', (err, html)=>{
                                
            let rest_html = ejs.render(html, {orden: orden, dventa:dventa,config:config});//rederiza la plantilla
    
            var template = handlebars.compile(rest_html);
            var htmlToSend = template({op:true});
    
            var mailOptions = {
                from: admin[0].email,
                to: orden.cliente.email,
                subject: 'Confirmación de compra ' + orden._id,
                html: htmlToSend
            };
          
            transporter.sendMail(mailOptions, function(error, info){
                if (!error) {
                    console.log('Email sent: ' + info.response);
                }
            });
        
        });
    } catch (error) {
        console.log(error);
    }
}

const registro_producto_admin = async function(req,res){
    if(req.user){
        let data = req.body;
  
        let productos = await Producto.find({titulo:data.titulo});
        
        let arr_etiquetas = JSON.parse(data.etiquetas);

        if(productos.length == 0){
            var img_path = req.files.portada.path;
            var name = img_path.split('/');
            var portada_name = name[2];

            data.slug = data.titulo.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
            data.portada = portada_name;
            let reg = await Producto.create(data);

            if(arr_etiquetas.length >= 1){
                for(var item of arr_etiquetas){
                    await Producto_etiqueta.create({
                        etiqueta: item.etiqueta,
                        producto: reg._id,
                    });
                }
            }

            res.status(200).send({data:reg});
        }else{
            res.status(200).send({data:undefined, message: 'El título del producto ya existe'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const listar_productos_admin = async function(req,res){
    if(req.user){
        var productos = await Producto.find({estado:'Publicado'});
     
        res.status(200).send({data:productos});
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}

const eliminar_etiqueta_producto_admin = async function(req,res){
    if(req.user){
        var id = req.params['id'];
        
        let reg = await Producto_etiqueta.findByIdAndRemove({_id:id});
        res.status(200).send({data:reg});
        
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const agregar_etiqueta_producto_admin = async function(req,res){
    if(req.user){
        let data = req.body;

        var reg = await Producto_etiqueta.create(data);
        res.status(200).send({data:reg});
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const obtener_imagen = async function(req,res){
    var img = req.params['img'];


    fs.stat('./uploads/configuraciones/'+img, function(err){
        if(!err){
            let path_img = './uploads/configuraciones/'+img;
            res.status(200).sendFile(path.resolve(path_img));
        }else{
            let path_img = './uploads/default.jpg';
            res.status(200).sendFile(path.resolve(path_img));
        }
    })
}

const actualizar_producto_admin = async function(req,res){
    if(req.user){
        let id = req.params['id'];
        let data = req.body;

        if(req.files){
               let reg2 = await Producto_etiqueta.find({producto:id});
               
            if (!reg2) {
                 if(data.etiquetas.length >= 1){
                for(var item of data.etiquetas){
                    await Producto_etiqueta.create({
                        etiqueta: item.etiqueta,
                        producto: reg._id,
                    });
                }
            }
            }
            //SI HAY IMAGEN
            var img_path = req.files.portada.path;
            var name = img_path.split('/');
            var portada_name = name[2];
            data.slug = data.titulo.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
            let reg = await Producto.findByIdAndUpdate({_id:id},{
                titulo: data.titulo,
                stock: data.stock,
                precio_antes_soles: data.precio_antes_soles,
                precio_antes_dolares: data.precio_antes_dolares,
                precio: data.precio,
                precio_dolar: data.precio_dolar,
                peso: data.peso,
                sku: data.sku,
                categoria: data.categoria,
                visibilidad: data.visibilidad,
                descripcion: data.descripcion,
                contenido:data.contenido,
                portada: portada_name,
                slug: data.slug
            });

            fs.stat('./uploads/productos/'+reg.portada, function(err){
                if(!err){
                    fs.unlink('./uploads/productos/'+reg.portada, (err)=>{
                        if(err) throw err;
                    });
                }
            })

            res.status(200).send({data:reg});
        }else{
            let reg2 = await Producto_etiqueta.find({producto:id});
            
            if (!reg2) {
                 if(data.etiquetas.length >= 1){
                for(var item of data.etiquetas){
                    await Producto_etiqueta.create({
                        etiqueta: item.etiqueta,
                        producto: reg._id,
                    });
                }
            }
            }
           
            //NO HAY IMAGEN
           let reg = await Producto.findByIdAndUpdate({_id:id},{
               titulo: data.titulo,
               stock: data.stock,
               precio_antes_soles: data.precio_antes_soles,
                precio_antes_dolares: data.precio_antes_dolares,
               precio: data.precio,
               precio_dolar: data.precio_dolar,
                peso: data.peso,
                sku: data.sku,
               categoria: data.categoria,
               visibilidad: data.visibilidad,
               descripcion: data.descripcion,
               contenido:data.contenido,
           });
           res.status(200).send({data:reg});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const agregar_imagen_galeria_admin = async function(req,res){
    if(req.user){
        let id = req.params['id'];
            let data = req.body;

            var img_path = req.files.imagen.path;
            var name = img_path.split('/');
            var imagen_name = name[2];

            let reg =await Producto.findByIdAndUpdate({_id:id},{ $push: {galeria:{
                imagen: imagen_name,
                _id: data._id
            }}});

            res.status(200).send({data:reg});
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const eliminar_imagen_galeria_admin = async function(req,res){
    if(req.user){
        let id = req.params['id'];
        let data = req.body;


        let reg =await Producto.findByIdAndUpdate({_id:id},{$pull: {galeria: {_id:data._id}}});
        res.status(200).send({data:reg});
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const verificar_token = async function(req,res){
   
    if(req.user){
        res.status(200).send({data:req.user});
    }else{
        console.log(2);
        res.status(500).send({message: 'NoAccess'});
    } 
}

const obtener_config_admin = async (req,res)=>{
    let config = await Config.find();
    res.status(200).send({data:config});
}

const actualizar_config_admin = async (req,res)=>{
    if(req.user){
        let data = req.body;
        let config = await Config.findByIdAndUpdate({_id:'61abe55d2dce63583086f108'},{
            banco : data.banco,
            cbu : data.cbu,
            envio_activacion : data.envio_activacion,
            monto_min_soles: data.monto_min_soles,
            monto_min_dolares : data.monto_min_dolares
        });
        res.status(200).send({data:config});
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
    
}

const pedido_compra_cliente = async function(req,res){
    if(req.user){
        try {
            var data = req.body;
            var detalles = data.detalles;
            let access = false;
            let producto_sl = '';

            for(var item of detalles){
                let variedad = await Variedad.findById({_id:item.variedad}).populate('producto');
                if(variedad.stock < item.cantidad){
                    access = true;
                    producto_sl = variedad.producto.titulo;
                }
            }

            if(!access){
                data.estado = 'En espera';
                let venta = await Venta.create(data);
        
                for(var element of detalles){
                    element.venta = venta._id;
                    await Dventa.create(element);
                    await Carrito.remove({cliente:data.cliente});
                }
                enviar_email_pedido_compra(venta._id);
                res.status(200).send({venta:venta});
            }else{
                res.status(200).send({venta:undefined,message:'Stock insuficiente para ' + producto_sl});
            }
        } catch (error) {
            console.log(error);
        }

        
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}


const enviar_email_pedido_compra = async function(venta){
    try {
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

        var admin = await Admin.find();
        var config = await Config.find();
        
        var transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: admin[0].email,
                pass: config[0].claveGmail 
            }
        }));
    
     
        var orden = await Venta.findById({_id:venta}).populate('cliente').populate('direccion');
        var dventa = await Dventa.find({venta:venta}).populate('producto').populate('variedad');
        var config = await Config.find();
        var admin = await Admin.find();

        readHTMLFile(process.cwd() + '/mails/email_pedido.html', (err, html)=>{
                                
            let rest_html = ejs.render(html, {orden: orden, dventa:dventa,config:config});
    
            var template = handlebars.compile(rest_html);
            var htmlToSend = template({op:true});
    
            var mailOptions = {
                from: admin[0].email,
                to: orden.cliente.email,
                subject: 'Gracias por tu orden, ' + config.titulo,
                html: htmlToSend
            };
          
            transporter.sendMail(mailOptions, function(error, info){
                if (!error) {
                    console.log('Email sent: ' + info.response);
                }
            });
        
        });
    } catch (error) {
        console.log(error);
    }
} 

const obtener_detalles_ordenes_cliente  = async function(req,res){
    if(req.user){
        var id = req.params['id'];

        try {
            let venta = await Venta.findById({_id:id}).populate('direccion').populate('cliente');
            let detalles = await Dventa.find({venta:venta._id}).populate('producto').populate('variedad');
            res.status(200).send({data:venta,detalles:detalles});

        } catch (error) {
            console.log(error);
            res.status(200).send({data:undefined});
        }
        
        
        
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}


const obtener_tope_destacados  = async function(req,res){
   var tope = [];

         tope = await Producto_etiqueta.find({etiqueta:"61a390d39b40d02e0cb9d789"});
        /*if(tope.length >= 4){

        }*/
        res.status(200).send({data:tope});
}


const registro_inicio_admin = async function(req,res){
    if(req.user){
        let data = req.body;

        let inicios = await Inicio.find({categoria:data.categoria});
        
        

        if(inicios.length == 0){
            var img_path = req.files.imagen.path;
            var name = img_path.split('/');
            var imagen_name = name[2];
            data.imagen = imagen_name;
            let reg = await Inicio.create(data);

           

            res.status(200).send({data:reg});
        }else{
            res.status(200).send({data:undefined, message: 'No se puede esa categoria en el inicio ya existe'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}







const listar_inicio_admin = async function(req, res){//async define una función asíncrona,
        //console.log(req.user);
        if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
            if (req.user.role == 'admin') {//si es admin paso
                                //let tipo=req.params['tipo'];
                        let filtro=req.params['filtro'];
                        let reg = await Inicio.find({categoria:new RegExp(filtro,'i')});//RegExp permiten describir secuencias de caracteres
                    res.status(200).send({data:reg});
                    
            }else{
                res.status(500).send({message:'NoAccess'}); 
            }
        }else{
        res.status(500).send({message:'NoAccess'}); 
        }


}

const obtener_inicio_admin = async function(req, res){//async define una función asíncrona,
    //console.log(req.user);
    if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
        if (req.user.role == 'admin') {//si es admin paso
        var id=req.params['id'];
    try {//si va todo bien y no hay errores porqe si se pone en la url otro id desconocido captura el error
        var reg  = await Inicio.findById({_id:id});//findById busco por id
                    res.status(200).send({data:reg});  
    } catch (error) {//captura el error
        res.status(200).send({data:undefined});//manda la data undefined para poder validar en el fronten edit-component  
    }
            
                    
        }else{
    res.status(500).send({message:'NoAccess'}); 
        }
    }else{
    res.status(500).send({message:'NoAccess'}); 
    }


}


const actualizar_inicio_admin = async function(req, res){//async define una función asíncrona,

    if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
        if (req.user.role == 'admin') {//si es admin paso
        var id=req.params['id'];
        var data=req.body;//lo q me viene del formulario del body
 
    if (req.files) {//si hay imagen

    var img_path = req.files.imagen.path;//agarro la ruta junto con su nombre de la imagen
    var name = img_path.split('/');
    var imagen_name = name[2];

    let reg = await Inicio.findByIdAndUpdate({_id:id},{
              
             
               categoria: data.categoria,
               
                imagen: imagen_name
            });//EN REG QEDA LO ANTERIOR

    //console.log('lo anteriror'+reg);

    //obtener portada e iliminarla
    fs.stat('./uploads/configuraciones/'+reg.imagen,function(err){//stat metodo del modulo..obtengo la portada o sea la imagen del backend donde esta uploads
    if (!err) {//si no ay error o se si ay imagen
    fs.unlink('./uploads/configuraciones/'+reg.imagen,(err)=>{//la elimino
        if(err) throw err;
    });  
    }  
    });


    res.status(200).send({data:reg});

    }else{//si no ay imagen
    
    res.status(500).send({data:undefined,message:'NoAccess'});


    }


                    
        }else{
    res.status(500).send({data:undefined,message:'NoAccess'}); 
        }
    }else{
    res.status(500).send({data:undefined,message:'NoAccess'}); 
    }




}


const eliminar_inicio_admin = async function(req, res){

        if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
            if (req.user.role == 'admin') {//si es admin paso
        var id=req.params['id'];
        var reg  = await Inicio.findByIdAndRemove({_id:id});//findByIdAndRemove busco por id y elimino

        //EN REG QEDA LO ANTERIOR
        //console.log('lo anteriror'+reg);

        //obtener imagen e iliminarla
        fs.stat('./uploads/configuraciones/'+reg.imagen,function(err){//stat metodo del modulo..obtengo la portada o sea la imagen del backend donde esta uploads
        if (!err) {//si no ay error o se si ay imagen
        fs.unlink('./uploads/configuraciones/'+reg.imagen,(err)=>{//la elimino
            if(err) throw err;
        });  
        }  
        });



        res.status(200).send({data:reg});
                        
            }else{
        res.status(500).send({message:'NoAccess'}); 
            }
        }else{
        res.status(500).send({message:'NoAccess'}); 
        }

}



const obtener_inicio = async function(req, res){//async define una función asíncrona,

    var reg  = await Inicio.find().sort({createdAt:-1});//busco todos los mensajes o sea lo q hay en contacto del mas actual al mas viejo
                
            if(reg.length != 0){
                res.status(200).send({data:reg}); 
            }else{
 res.status(200).send({data:undefined});//manda la data undefined para poder validar en el fronten edit-component  

            }    
                 
}


const registro_inicioa_admin = async function(req,res){
    if(req.user){
        let data = req.body;

      
        

            var img_path = req.files.imagen1.path;
            var name = img_path.split('/');
            var imagen_name = name[2];
            data.imagen1 = imagen_name;
            
             img_path = req.files.imagen2.path;
             name = img_path.split('/');
             imagen_name = name[2];
            data.imagen2 = imagen_name

            img_path = req.files.imagen3.path;
             name = img_path.split('/');
             imagen_name = name[2];
            data.imagen3 = imagen_name

            img_path = req.files.imagen4.path;
             name = img_path.split('/');
             imagen_name = name[2];
            data.imagen4 = imagen_name


            

            let reg = await Inicio1.create(data);

           

            res.status(200).send({data:reg});
       
            
        
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}


const registro_parte2_admin = async function(req,res){
    
    if(req.user){
        let data = req.body;
       
            var img_path = req.files.imagen1.path;
            var name = img_path.split('/');
            var imagen_name = name[2];
            data.imagen1 = imagen_name;
            
             img_path = req.files.imagen2.path;
             name = img_path.split('/');
             imagen_name = name[2];
            data.imagen2 = imagen_name

            img_path = req.files.imagen3.path;
             name = img_path.split('/');
             imagen_name = name[2];
            data.imagen3 = imagen_name
   

            let reg = await Parte2.create(data);

           

            res.status(200).send({data:reg});
       
            
        
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}


const registro_parte3_admin = async function(req,res){
    if(req.user){
        let data = req.body;

      
        

            var img_path = req.files.imagen1.path;
            var name = img_path.split('/');
            var imagen_name = name[2];
            data.imagen1 = imagen_name;
            
             img_path = req.files.imagen2.path;
             name = img_path.split('/');
             imagen_name = name[2];
            data.imagen2 = imagen_name

            img_path = req.files.imagen3.path;
             name = img_path.split('/');
             imagen_name = name[2];
            data.imagen3 = imagen_name

            img_path = req.files.imagen4.path;
            name = img_path.split('/');
            imagen_name = name[2];
           data.imagen4 = imagen_name

           img_path = req.files.imagen5.path;
           name = img_path.split('/');
           imagen_name = name[2];
          data.imagen5 = imagen_name
   

            let reg = await Parte3.create(data);

           

            res.status(200).send({data:reg});
       
            
        
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const registro_tapa_admin = async function(req,res){
    if(req.user){
        let data = req.body;

      
        

            var img_path = req.files.imagen1.path;
            var name = img_path.split('/');
            var imagen_name = name[2];
            data.imagen1 = imagen_name;    

            let reg = await Slider.create(data);

           

            res.status(200).send({data:reg});
       
            
        
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}



const obtener_inicio1_admin = async (req,res)=>{
    let inicio1 = await Inicio1.find();
    res.status(200).send({data:inicio1});
}

const obtener_parte2_admin = async (req,res)=>{
    let parte2 = await Parte2.find();
    res.status(200).send({data:parte2});
}

const obtener_parte3_admin = async (req,res)=>{
    let parte3 = await Parte3.find();
    res.status(200).send({data:parte3});
}

/*const obtener_parte1_admin = async function(req, res){//async define una función asíncrona,
    //console.log(req.user);
    if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
        if (req.user.role == 'admin') {//si es admin paso
         var id=req.params['id'];
    try {//si va todo bien y no hay errores porqe si se pone en la url otro id desconocido captura el error
        var reg  = await Inicio1.findById({_id:id});//findById busco por id
                    res.status(200).send({data:reg});  
    } catch (error) {//captura el error
        res.status(200).send({data:undefined});//manda la data undefined para poder validar en el fronten edit-component  
    }
            
                    
        }else{
    res.status(500).send({message:'NoAccess'}); 
        }
    }else{
    res.status(500).send({message:'NoAccess'}); 
    }
    
    
    }*/

    const obtener_tapa_admin = async function(req, res){//async define una función asíncrona,
        
        let slider = await Slider.find();
    res.status(200).send({data:slider});
        }



    const actualizar_parte1_admin = async function(req, res){//async define una función asíncrona,

        if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
            if (req.user.role == 'admin') {//si es admin paso
            var id=req.params['id'];
            var data=req.body;//lo q me viene del formulario del body
     
        if (req.files) {//si hay imagen
    
            if (req.files.imagen1 && req.files.imagen1 != undefined) {
                var img_path = req.files.imagen1.path;
                var name = img_path.split('/');
                var imagen_name1 = name[2];
                data.imagen1 = imagen_name1; 
            }

            if (req.files.imagen2 && req.files.imagen2 != undefined) {
                img_path = req.files.imagen2.path;
                name = img_path.split('/');
                var imagen_name2 = name[2];
               data.imagen2 = imagen_name2;
            }
            
            if (req.files.imagen3 && req.files.imagen3 != undefined) {
                img_path = req.files.imagen3.path;
                name = img_path.split('/');
                var imagen_name3 = name[2];
               data.imagen3 = imagen_name3;
            }
            
            if (req.files.imagen4 && req.files.imagen4 != undefined) {
                img_path = req.files.imagen4.path;
             name = img_path.split('/');
             var imagen_name4 = name[2];
            data.imagen4 = imagen_name4;
            }
           

                       let reg = await Inicio1.findByIdAndUpdate({_id:id},{
                  
                    imagen1: data.imagen1,
                    imagen2: data.imagen2,
                    imagen3: data.imagen3,
                    imagen4: data.imagen4,
                    titulo0: data.titulo0,
                    titulo1: data.titulo1,
                    titulo2: data.titulo2,
                    titulo3: data.titulo3,
                    titulo4: data.titulo4,
                    texto1a: data.texto1a,
                    texto1b: data.texto1b,
                    texto2a: data.texto2a,
                    texto2b: data.texto2b,
                    texto2c: data.texto2c,
                    texto3a: data.texto3a,
                    texto3b: data.texto3b,
                    texto4a: data.texto4a,
                    texto4b: data.texto4b

                });//EN REG QEDA LO ANTERIOR
    
        //console.log('lo anteriror'+reg);
    
        //obtener portada e iliminarla
        if (req.files.imagen1 && req.files.imagen1 != undefined) {
        fs.stat('./uploads/configuraciones/'+req.files.imagen1,function(err){//stat metodo del modulo..obtengo la portada o sea la imagen del backend donde esta uploads
        if (!err) {//si no ay error o se si ay imagen
        fs.unlink('./uploads/configuraciones/'+req.files.imagen1,(err)=>{//la elimino
            if(err) throw err;
        });  
        }  
        });
    }

    if (req.files.imagen2 && req.files.imagen2 != undefined) {
        fs.stat('./uploads/configuraciones/'+req.files.imagen2,function(err){//stat metodo del modulo..obtengo la portada o sea la imagen del backend donde esta uploads
            if (!err) {//si no ay error o se si ay imagen
            fs.unlink('./uploads/configuraciones/'+req.files.imagen2,(err)=>{//la elimino
                if(err) throw err;
            });  
            }  
            });
        }


     if (req.files.imagen3 && req.files.imagen3 != undefined) {
            fs.stat('./uploads/configuraciones/'+req.files.imagen3,function(err){//stat metodo del modulo..obtengo la portada o sea la imagen del backend donde esta uploads
                if (!err) {//si no ay error o se si ay imagen
                fs.unlink('./uploads/configuraciones/'+req.files.imagen3,(err)=>{//la elimino
                    if(err) throw err;
                });  
                }  
                });
            }

            if (req.files.imagen4 && req.files.imagen4 != undefined) {

                fs.stat('./uploads/configuraciones/'+req.files.imagen4,function(err){//stat metodo del modulo..obtengo la portada o sea la imagen del backend donde esta uploads
                    if (!err) {//si no ay error o se si ay imagen
                    fs.unlink('./uploads/configuraciones/'+req.files.imagen4,(err)=>{//la elimino
                        if(err) throw err;
                    });  
                    }  
                    });

                }
    
    
        res.status(200).send({data:reg});
    
        }else{
            var data=req.body;
            //console.log(data[0].titulo1);
            let reg2 = await Inicio1.findByIdAndUpdate({_id:id},{
                titulo0: data[0].titulo0,
                titulo1: data[0].titulo1,
                titulo2: data[0].titulo2,
                titulo3: data[0].titulo3,
                titulo4: data[0].titulo4,
                texto1a: data[0].texto1a,
                texto1b: data[0].texto1b,
                texto2a: data[0].texto2a,
                texto2b: data[0].texto2b,
                texto2c: data[0].texto2c,
                texto3a: data[0].texto3a,
                texto3b: data[0].texto3b,
                texto4a: data[0].texto4a,
                texto4b: data[0].texto4b,
                imagen1: data[0].imagen1,
                imagen2: data[0].imagen2,
                imagen3: data[0].imagen3,
                imagen4: data[0].imagen4

            });//EN REG QEDA LO ANTERIOR

            res.status(200).send({data:reg2});
        }
    
    
                        
            }else{
        res.status(500).send({data:undefined,message:'NoAccess'}); 
            }
        }else{
        res.status(500).send({data:undefined,message:'NoAccess'}); 
        }
    
    
    
    
    }



    const actualizar_parte2_admin = async function(req, res){//async define una función asíncrona,

        if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
            if (req.user.role == 'admin') {//si es admin paso
            var id=req.params['id'];
            var data=req.body;//lo q me viene del formulario del body
     
        if (req.files) {//si hay imagen
    
            if (req.files.imagen1 && req.files.imagen1 != undefined) {
                var img_path = req.files.imagen1.path;
                var name = img_path.split('/');
                var imagen_name1 = name[2];
                data.imagen1 = imagen_name1; 
            }

            if (req.files.imagen2 && req.files.imagen2 != undefined) {
                img_path = req.files.imagen2.path;
                name = img_path.split('/');
                var imagen_name2 = name[2];
               data.imagen2 = imagen_name2;
            }
            
            if (req.files.imagen3 && req.files.imagen3 != undefined) {
                img_path = req.files.imagen3.path;
                name = img_path.split('/');
                var imagen_name3 = name[2];
               data.imagen3 = imagen_name3;
            }
            
           
           

                       let reg = await Parte2.findByIdAndUpdate({_id:id},{
                  
                    imagen1: data.imagen1,
                    imagen2: data.imagen2,
                    imagen3: data.imagen3,
                    titulo0: data.titulo0,
                    texto1: data.texto1,
                    texto2: data.texto2,
                    texto3: data.texto3,
                    texto4: data.texto4
                   

                });//EN REG QEDA LO ANTERIOR
    
        //console.log('lo anteriror'+reg);
    
        //obtener portada e iliminarla
        if (req.files.imagen1 && req.files.imagen1 != undefined) {
        fs.stat('./uploads/configuraciones/'+req.files.imagen1,function(err){//stat metodo del modulo..obtengo la portada o sea la imagen del backend donde esta uploads
        if (!err) {//si no ay error o se si ay imagen
        fs.unlink('./uploads/configuraciones/'+req.files.imagen1,(err)=>{//la elimino
            if(err) throw err;
        });  
        }  
        });
    }

    if (req.files.imagen2 && req.files.imagen2 != undefined) {
        fs.stat('./uploads/configuraciones/'+req.files.imagen2,function(err){//stat metodo del modulo..obtengo la portada o sea la imagen del backend donde esta uploads
            if (!err) {//si no ay error o se si ay imagen
            fs.unlink('./uploads/configuraciones/'+req.files.imagen2,(err)=>{//la elimino
                if(err) throw err;
            });  
            }  
            });
        }


     if (req.files.imagen3 && req.files.imagen3 != undefined) {
            fs.stat('./uploads/configuraciones/'+req.files.imagen3,function(err){//stat metodo del modulo..obtengo la portada o sea la imagen del backend donde esta uploads
                if (!err) {//si no ay error o se si ay imagen
                fs.unlink('./uploads/configuraciones/'+req.files.imagen3,(err)=>{//la elimino
                    if(err) throw err;
                });  
                }  
                });
            }

    
        res.status(200).send({data:reg});
    
        }else{
            var data=req.body;
           // console.log(data[0].titulo1);
            let reg2 = await Parte2.findByIdAndUpdate({_id:id},{
                  
                imagen1: data[0].imagen1,
                imagen2: data[0].imagen2,
                imagen3: data[0].imagen3,
                titulo0: data[0].titulo0,
                texto1: data[0].texto1,
                texto2: data[0].texto2,
                texto3: data[0].texto3,
                texto4: data[0].texto4

            });//EN REG QEDA LO ANTERIOR

            res.status(200).send({data:reg2});
        }
    
    
                        
            }else{
        res.status(500).send({data:undefined,message:'NoAccess'}); 
            }
        }else{
        res.status(500).send({data:undefined,message:'NoAccess'}); 
        }
    
    
    
    
    }


    const actualizar_parte3_admin = async function(req, res){//async define una función asíncrona,

        if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
            if (req.user.role == 'admin') {//si es admin paso
            var id=req.params['id'];
            var data=req.body;//lo q me viene del formulario del body
     
        if (req.files) {//si hay imagen
    
            if (req.files.imagen1 && req.files.imagen1 != undefined) {
                var img_path = req.files.imagen1.path;
                var name = img_path.split('/');
                var imagen_name1 = name[2];
                data.imagen1 = imagen_name1; 
            }

            if (req.files.imagen2 && req.files.imagen2 != undefined) {
                img_path = req.files.imagen2.path;
                name = img_path.split('/');
                var imagen_name2 = name[2];
               data.imagen2 = imagen_name2;
            }
            
            if (req.files.imagen3 && req.files.imagen3 != undefined) {
                img_path = req.files.imagen3.path;
                name = img_path.split('/');
                var imagen_name3 = name[2];
               data.imagen3 = imagen_name3;
            }

            if (req.files.imagen4 && req.files.imagen4 != undefined) {
                img_path = req.files.imagen4.path;
                name = img_path.split('/');
                var imagen_name4 = name[2];
               data.imagen4 = imagen_name4;
            }

            if (req.files.imagen5 && req.files.imagen5 != undefined) {
                img_path = req.files.imagen5.path;
                name = img_path.split('/');
                var imagen_name5 = name[2];
               data.imagen5 = imagen_name5;
            }
            
           
           

                       let reg = await Parte3.findByIdAndUpdate({_id:id},{
                  
                    titulo0: data.titulo0,
                    titulo: data.titulo,
                    titulo2: data.titulo2,
                    imagen1: data.imagen1,
                    imagen2: data.imagen2,
                    imagen3: data.imagen3,
                    imagen4: data.imagen4,
                    imagen5: data.imagen5,
                    textoa: data.textoa,
                    textob: data.textob,
                    textoc: data.textoc,
                    textod: data.textod,
                    textoe: data.textoe,
                    textof: data.textof,
                    textog: data.textog,
                    textoh: data.textoh,
                    textoi: data.textoi,
                    textoj: data.textoj


                  
                   

                });//EN REG QEDA LO ANTERIOR
    
        //console.log('lo anteriror'+reg);
    
        //obtener portada e iliminarla
        if (req.files.imagen1 && req.files.imagen1 != undefined) {
        fs.stat('./uploads/configuraciones/'+req.files.imagen1,function(err){//stat metodo del modulo..obtengo la portada o sea la imagen del backend donde esta uploads
        if (!err) {//si no ay error o se si ay imagen
        fs.unlink('./uploads/configuraciones/'+req.files.imagen1,(err)=>{//la elimino
            if(err) throw err;
        });  
        }  
        });
    }

    if (req.files.imagen2 && req.files.imagen2 != undefined) {
        fs.stat('./uploads/configuraciones/'+req.files.imagen2,function(err){//stat metodo del modulo..obtengo la portada o sea la imagen del backend donde esta uploads
            if (!err) {//si no ay error o se si ay imagen
            fs.unlink('./uploads/configuraciones/'+req.files.imagen2,(err)=>{//la elimino
                if(err) throw err;
            });  
            }  
            });
        }


     if (req.files.imagen3 && req.files.imagen3 != undefined) {
            fs.stat('./uploads/configuraciones/'+req.files.imagen3,function(err){//stat metodo del modulo..obtengo la portada o sea la imagen del backend donde esta uploads
                if (!err) {//si no ay error o se si ay imagen
                fs.unlink('./uploads/configuraciones/'+req.files.imagen3,(err)=>{//la elimino
                    if(err) throw err;
                });  
                }  
                });
            }

            if (req.files.imagen4 && req.files.imagen4 != undefined) {
                fs.stat('./uploads/configuraciones/'+req.files.imagen4,function(err){//stat metodo del modulo..obtengo la portada o sea la imagen del backend donde esta uploads
                    if (!err) {//si no ay error o se si ay imagen
                    fs.unlink('./uploads/configuraciones/'+req.files.imagen4,(err)=>{//la elimino
                        if(err) throw err;
                    });  
                    }  
                    });
                }

                if (req.files.imagen5 && req.files.imagen5 != undefined) {
                    fs.stat('./uploads/configuraciones/'+req.files.imagen5,function(err){//stat metodo del modulo..obtengo la portada o sea la imagen del backend donde esta uploads
                        if (!err) {//si no ay error o se si ay imagen
                        fs.unlink('./uploads/configuraciones/'+req.files.imagen5,(err)=>{//la elimino
                            if(err) throw err;
                        });  
                        }  
                        });
                    }

    
        res.status(200).send({data:reg});
    
        }else{
            var data=req.body;
          
            let reg2 = await Parte3.findByIdAndUpdate({_id:id},{
                  
                titulo0: data[0].titulo0,
                titulo: data[0].titulo,
                titulo2: data[0].titulo2,
                imagen1: data[0].imagen1,
                imagen2: data[0].imagen2,
                imagen3: data[0].imagen3,
                imagen4: data[0].imagen4,
                imagen5: data[0].imagen5,
                textoa: data[0].textoa,
                textob: data[0].textob,
                textoc: data[0].textoc,
                textod: data[0].textod,
                textoe: data[0].textoe,
                textof: data[0].textof,
                textog: data[0].textog,
                textoh: data[0].textoh,
                textoi: data[0].textoi,
                textoj: data[0].textoj,

            });//EN REG QEDA LO ANTERIOR

            res.status(200).send({data:reg2});
        }
    
    
                        
            }else{
        res.status(500).send({data:undefined,message:'NoAccess'}); 
            }
        }else{
        res.status(500).send({data:undefined,message:'NoAccess'}); 
        }
    
    
    
    
    }


    const actualizar_slider_admin = async function(req, res){//async define una función asíncrona,

        if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
            if (req.user.role == 'admin') {//si es admin paso
            var id=req.params['id'];
            var data=req.body;//lo q me viene del formulario del body
     
        if (req.files) {//si hay imagen
    
            if (req.files.imagen1 && req.files.imagen1 != undefined) {
                var img_path = req.files.imagen1.path;
                var name = img_path.split('/');
                var imagen_name1 = name[2];
                data.imagen1 = imagen_name1; 
            }
     

                       let reg = await Slider.findByIdAndUpdate({_id:id},{
                  
                    imagen1: data.imagen1,
                    texto1: data.texto1,
                    texto2: data.texto2

                });//EN REG QEDA LO ANTERIOR
    
        //console.log('lo anteriror'+reg);
    
        //obtener portada e iliminarla
        if (req.files.imagen1 && req.files.imagen1 != undefined) {
        fs.stat('./uploads/configuraciones/'+req.files.imagen1,function(err){//stat metodo del modulo..obtengo la portada o sea la imagen del backend donde esta uploads
        if (!err) {//si no ay error o se si ay imagen
        fs.unlink('./uploads/configuraciones/'+req.files.imagen1,(err)=>{//la elimino
            if(err) throw err;
        });  
        }  
        });
    }

    
        res.status(200).send({data:reg});
    
        }else{
            var data=req.body;
        
            let reg2 = await Slider.findByIdAndUpdate({_id:id},{
                  
                imagen1: data[0].imagen1,
                texto1: data[0].texto1,
                texto2: data[0].texto2

            });//EN REG QEDA LO ANTERIOR

            res.status(200).send({data:reg2});
        }
    
    
                        
            }else{
        res.status(500).send({data:undefined,message:'NoAccess'}); 
            }
        }else{
        res.status(500).send({data:undefined,message:'NoAccess'}); 
        }
    
    
    }



    const eliminar_parte1_admin = async function(req, res){

        if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
            if (req.user.role == 'admin') {//si es admin paso
        var id=req.params['id'];
        var reg2  = await Inicio1.findById({_id:id});
        if (reg2) {
            var reg  = await Inicio1.findByIdAndRemove({_id:id});//findByIdAndRemove busco por id y elimino
        
              //obtener portada e iliminarla
              if (reg2.imagen1 && reg2.imagen1 != undefined) {
                fs.stat('./uploads/configuraciones/'+reg2.imagen1,function(err){//stat metodo del modulo..obtengo la portada o sea la imagen del backend donde esta uploads
                if (!err) {//si no ay error o se si ay imagen
                fs.unlink('./uploads/configuraciones/'+reg2.imagen1,(err)=>{//la elimino
                    if(err) throw err;
                });  
                }  
                });
            }
        
            if (reg2.imagen2 && reg2.imagen2 != undefined) {
                fs.stat('./uploads/configuraciones/'+reg2.imagen2,function(err){//stat metodo del modulo..obtengo la portada o sea la imagen del backend donde esta uploads
                    if (!err) {//si no ay error o se si ay imagen
                    fs.unlink('./uploads/configuraciones/'+reg2.imagen2,(err)=>{//la elimino
                        if(err) throw err;
                    });  
                    }  
                    });
                }
        
        
             if (reg2.imagen3 && reg2.imagen3 != undefined) {
                    fs.stat('./uploads/configuraciones/'+reg2.imagen3,function(err){//stat metodo del modulo..obtengo la portada o sea la imagen del backend donde esta uploads
                        if (!err) {//si no ay error o se si ay imagen
                        fs.unlink('./uploads/configuraciones/'+reg2.imagen3,(err)=>{//la elimino
                            if(err) throw err;
                        });  
                        }  
                        });
                    }
        
                    if (reg2.imagen4 && reg2.imagen4 != undefined) {
        
                        fs.stat('./uploads/configuraciones/'+reg2.imagen4,function(err){//stat metodo del modulo..obtengo la portada o sea la imagen del backend donde esta uploads
                            if (!err) {//si no ay error o se si ay imagen
                            fs.unlink('./uploads/configuraciones/'+reg2.imagen4,(err)=>{//la elimino
                                if(err) throw err;
                            });  
                            }  
                            });
        
                        }
    
                        res.status(200).send({data:reg});
        }
            
        
       
                        
            }else{
        res.status(500).send({message:'NoAccess'}); 
            }
        }else{
        res.status(500).send({message:'NoAccess'}); 
        }
        
        }


        const eliminar_slider_admin = async function(req, res){

            if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
                if (req.user.role == 'admin') {//si es admin paso
            var id=req.params['id'];
            var reg2  = await Slider.findById({_id:id});
            if (reg2) {
                var reg  = await Slider.findByIdAndRemove({_id:id});//findByIdAndRemove busco por id y elimino
            
                  //obtener portada e iliminarla
                  if (reg2.imagen1 && reg2.imagen1 != undefined) {
                    fs.stat('./uploads/configuraciones/'+reg2.imagen1,function(err){//stat metodo del modulo..obtengo la portada o sea la imagen del backend donde esta uploads
                    if (!err) {//si no ay error o se si ay imagen
                    fs.unlink('./uploads/configuraciones/'+reg2.imagen1,(err)=>{//la elimino
                        if(err) throw err;
                    });  
                    }  
                    });
                }
                            res.status(200).send({data:reg});
            }
                
                            
                }else{
            res.status(500).send({message:'NoAccess'}); 
                }
            }else{
            res.status(500).send({message:'NoAccess'}); 
            }
            
            }


            const eliminar_parte2_admin = async function(req, res){

                if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
                    if (req.user.role == 'admin') {//si es admin paso
                var id=req.params['id'];
                var reg2  = await Parte2.findById({_id:id});
                if (reg2) {
                    var reg  = await Parte2.findByIdAndRemove({_id:id});//findByIdAndRemove busco por id y elimino
                
                      //obtener portada e iliminarla
                      if (reg2.imagen1 && reg2.imagen1 != undefined) {
                        fs.stat('./uploads/configuraciones/'+reg2.imagen1,function(err){//stat metodo del modulo..obtengo la portada o sea la imagen del backend donde esta uploads
                        if (!err) {//si no ay error o se si ay imagen
                        fs.unlink('./uploads/configuraciones/'+reg2.imagen1,(err)=>{//la elimino
                            if(err) throw err;
                        });  
                        }  
                        });
                    }

                      //obtener portada e iliminarla
                      if (reg2.imagen2 && reg2.imagen2 != undefined) {
                        fs.stat('./uploads/configuraciones/'+reg2.imagen2,function(err){//stat metodo del modulo..obtengo la portada o sea la imagen del backend donde esta uploads
                        if (!err) {//si no ay error o se si ay imagen
                        fs.unlink('./uploads/configuraciones/'+reg2.imagen2,(err)=>{//la elimino
                            if(err) throw err;
                        });  
                        }  
                        });
                    }

                      //obtener portada e iliminarla
                      if (reg2.imagen3 && reg2.imagen3 != undefined) {
                        fs.stat('./uploads/configuraciones/'+reg2.imagen3,function(err){//stat metodo del modulo..obtengo la portada o sea la imagen del backend donde esta uploads
                        if (!err) {//si no ay error o se si ay imagen
                        fs.unlink('./uploads/configuraciones/'+reg2.imagen3,(err)=>{//la elimino
                            if(err) throw err;
                        });  
                        }  
                        });
                    }
                                res.status(200).send({data:reg});
                }
                    
                                
                    }else{
                res.status(500).send({message:'NoAccess'}); 
                    }
                }else{
                res.status(500).send({message:'NoAccess'}); 
                }
                
                }

                const eliminar_parte3_admin = async function(req, res){

                    if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
                        if (req.user.role == 'admin') {//si es admin paso
                    var id=req.params['id'];
                    var reg2  = await Parte3.findById({_id:id});
                    if (reg2) {
                        var reg  = await Parte3.findByIdAndRemove({_id:id});//findByIdAndRemove busco por id y elimino
                    
                          //obtener portada e iliminarla
                          if (reg2.imagen1 && reg2.imagen1 != undefined) {
                            fs.stat('./uploads/configuraciones/'+reg2.imagen1,function(err){//stat metodo del modulo..obtengo la portada o sea la imagen del backend donde esta uploads
                            if (!err) {//si no ay error o se si ay imagen
                            fs.unlink('./uploads/configuraciones/'+reg2.imagen1,(err)=>{//la elimino
                                if(err) throw err;
                            });  
                            }  
                            });
                        }

                          //obtener portada e iliminarla
                      if (reg2.imagen2 && reg2.imagen2 != undefined) {
                        fs.stat('./uploads/configuraciones/'+reg2.imagen2,function(err){//stat metodo del modulo..obtengo la portada o sea la imagen del backend donde esta uploads
                        if (!err) {//si no ay error o se si ay imagen
                        fs.unlink('./uploads/configuraciones/'+reg2.imagen2,(err)=>{//la elimino
                            if(err) throw err;
                        });  
                        }  
                        });
                    }

                      //obtener portada e iliminarla
                      if (reg2.imagen3 && reg2.imagen3 != undefined) {
                        fs.stat('./uploads/configuraciones/'+reg2.imagen3,function(err){//stat metodo del modulo..obtengo la portada o sea la imagen del backend donde esta uploads
                        if (!err) {//si no ay error o se si ay imagen
                        fs.unlink('./uploads/configuraciones/'+reg2.imagen3,(err)=>{//la elimino
                            if(err) throw err;
                        });  
                        }  
                        });
                    }

                      //obtener portada e iliminarla
                      if (reg2.imagen4 && reg2.imagen4 != undefined) {
                        fs.stat('./uploads/configuraciones/'+reg2.imagen4,function(err){//stat metodo del modulo..obtengo la portada o sea la imagen del backend donde esta uploads
                        if (!err) {//si no ay error o se si ay imagen
                        fs.unlink('./uploads/configuraciones/'+reg2.imagen4,(err)=>{//la elimino
                            if(err) throw err;
                        });  
                        }  
                        });
                    }

                      //obtener portada e iliminarla
                      if (reg2.imagen5 && reg2.imagen5 != undefined) {
                        fs.stat('./uploads/configuraciones/'+reg2.imagen5,function(err){//stat metodo del modulo..obtengo la portada o sea la imagen del backend donde esta uploads
                        if (!err) {//si no ay error o se si ay imagen
                        fs.unlink('./uploads/configuraciones/'+reg2.imagen5,(err)=>{//la elimino
                            if(err) throw err;
                        });  
                        }  
                        });
                    }
                                    res.status(200).send({data:reg});
                    }
                        
                                    
                        }else{
                    res.status(500).send({message:'NoAccess'}); 
                        }
                    }else{
                    res.status(500).send({message:'NoAccess'}); 
                    }
                    
                    }

                    const obtener_politicas_envio = async (req,res)=>{
                        let politicas = await Politicas.find();
                        res.status(200).send({data:politicas});
                    }

                    const registro_politicas_admin = async function(req,res){
                        if(req.user){
                            var data = req.body;
                   
                            let reg = await Politicas.create(data);
                    
                            res.status(200).send({data:reg});
                            
                        }else{
                            res.status(500).send({message: 'NoAccess'});
                        }
                    }


                    const registro_terminos_admin = async function(req,res){
                        if(req.user){
                            var data = req.body;
                   
                            let reg = await Terminos.create(data);
                    
                            res.status(200).send({data:reg});
                            
                        }else{
                            res.status(500).send({message: 'NoAccess'});
                        }
                    }
                    

                    

                    const actualizar_politicas_admin = async (req,res)=>{
                        if(req.user){
                            let data = req.body;
                            let id = req.params['id'];
                            let reg = await Politicas.findByIdAndUpdate({_id:id},{
                            titulo1: data[0].titulo1,
                            titulo2: data[0].titulo2,
                            titulo3: data[0].titulo3,
                            titulo4: data[0].titulo4,
                            titulo5: data[0].titulo5,
                            titulo6: data[0].titulo6,
                            titulo7: data[0].titulo7,
                            titulo8: data[0].titulo8,
                            
                            textoa: data[0].textoa,
                            textob: data[0].textob,
                            textoc: data[0].textoc,
                            textod: data[0].textod,
                            textoe: data[0].textoe,
                            textof: data[0].textof,
                            textog: data[0].textog,
                            textoh: data[0].textoh,
                            textoi: data[0].textoi,
                            textoj: data[0].textoj,
                            textok: data[0].textok,
                            textol: data[0].textol,
                            textoll: data[0].textoll,
                            textom: data[0].textom,
                            texton: data[0].texton,
                            textoo: data[0].textoo,
                            textop: data[0].textop,
                            textoq: data[0].textoq
                            });
                            res.status(200).send({data:reg});
                        }else{
                            res.status(500).send({message: 'NoAccess'});
                        }
                        
                    }


                    const actualizar_terminos_admin = async (req,res)=>{
                        if(req.user){
                            let data = req.body;
                            let id = req.params['id'];
                            let reg = await Terminos.findByIdAndUpdate({_id:id},{
                            titulo1: data[0].titulo1,
                            titulo2: data[0].titulo2,
                            titulo3: data[0].titulo3,
                            titulo4: data[0].titulo4,
                            titulo5: data[0].titulo5,
                            titulo6: data[0].titulo6,
                            titulo7: data[0].titulo7,
                            
                            
                            textoa: data[0].textoa,
                            textob: data[0].textob,
                            textoc: data[0].textoc,
                            textod: data[0].textod,
                            textoe: data[0].textoe,
                            textof: data[0].textof,
                            textog: data[0].textog,
                            textoh: data[0].textoh,
                            textoi: data[0].textoi,
                            textoj: data[0].textoj,
                            textok: data[0].textok,
                            textol: data[0].textol
                           
                            });
                            res.status(200).send({data:reg});
                        }else{
                            res.status(500).send({message: 'NoAccess'});
                        }
                        
                    }



                    const eliminar_politicas_admin = async function(req,res){
                        if(req.user){
                            var id = req.params['id'];
                    
                            let reg = await Politicas.findByIdAndRemove({_id:id});
                            res.status(200).send({data:reg});
                        }else{
                            res.status(500).send({message: 'NoAccess'});
                        }
                    }

                    const eliminar_terminos_admin = async function(req,res){
                        if(req.user){
                            var id = req.params['id'];
                    
                            let reg = await Terminos.findByIdAndRemove({_id:id});
                            res.status(200).send({data:reg});
                        }else{
                            res.status(500).send({message: 'NoAccess'});
                        }
                    }


                    const obtener_terminos = async function(req,res){
                        let terminos = await Terminos.find();
                        res.status(200).send({data:terminos});
                    }

                   

                        const obtener_admin = async function(req, res){//async define una función asíncrona,
                            //console.log(req.user);
                           
                               
                                // var id=req.params['id'];
                            try {//si va todo bien y no hay errores porqe si se pone en la url otro id desconocido captura el error
                                var reg  = await Admin.find();//findById busco por id
                                            res.status(200).send({data:reg});  
                            } catch (error) {//captura el error
                                res.status(200).send({data:undefined});//manda la data undefined para poder validar en el fronten edit-component  
                            }
                                    
                                            
                               
                            
                            
                            
                            }


                        const pass_cambioAdmin = async function(req, res){//async define una función asíncrona,

                            var email=req.params['email'];
                            //var pass=req.params['pass'];
                                try {//si va todo bien y no hay errores porqe si se pone en la url otro id desconocido captura el error
                                    var reg  = await Admin.find({email:email});//findById busco por id
                                      if (reg) {
                                        //console.log(reg);
                                        enviar_email_de_cambio_pass(email);
                        
                                            
                                      }    
                                      
                                      res.status(200).send({data:reg});
                                      
                                } catch (error) {//captura el error
                                    res.status(200).send({data:undefined});//manda la data undefined para poder validar en el fronten edit-component  
                                }
                        
                        }


                        const enviar_email_de_cambio_pass = async function(email){
                            try {
                               
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
                        
                                var admin = await Admin.find();
                                var config = await Config.find();
                                
                                var transporter = nodemailer.createTransport(smtpTransport({
                                    service: 'gmail',
                                    host: 'smtp.gmail.com',
                                    auth: {
                                        user: admin[0].email,
                                        pass: config[0].claveGmail 
                                    }
                                }));
                            
                             
                                //var orden = await Venta.findById({_id:venta}).populate('cliente').populate('direccion');
                                //var dventa = await Dventa.find({venta:venta}).populate('producto').populate('variedad');
                                var config = await Config.find();
                                var admin = await Admin.find();
                                //var reg  = await Cliente.find({email:email});//findById busco por id
                        
                                readHTMLFile(process.cwd() + '/mails/email_cambioAdmin_pass.html', (err, html)=>{
                                                        
                                    let rest_html = ejs.render(html, {config:config,admin:admin});
                            
                                    var template = handlebars.compile(rest_html);
                                    var htmlToSend = template({op:true});
                            
                                    var mailOptions = {
                                        from: admin[0].email,
                                        to: email,
                                        subject: 'Solicitaste el cambio de contraseña, ' + config[0].titulo,
                                        html: htmlToSend
                                    };
                                  
                                    transporter.sendMail(mailOptions, function(error, info){
                                        if (!error) {
                                            console.log('Email sent: ' + info.response);
                                        }
                                    });
                                
                                });
                            } catch (error) {
                                console.log(error);
                            }
                        }


                        const update_Adminpass = async function(req, res){

                            var id=req.params['id'];
                            var pass=req.params['pass'];
                            try {
                            bcrypt.hash(pass,null,null,async function(err, hash){//data.password le doy una contraseña y la encripto
                                var reg  = await Admin.findByIdAndUpdate({_id:id},{//findByIdAndUpdate busco por id y actualiza
                               password:hash
                               }); 
                               
                                res.status(200).send({data:reg}); 
                                   });
                        
                                } catch (error) {//captura el error
                                    res.status(500).send({data:undefined});//manda la data undefined para poder validar en el fronten edit-component  
                                }
                            
                               /* try {//si va todo bien y no hay errores porqe si se pone en la url otro id desconocido captura el error
                                    var cliente  = await Cliente.findById({_id:id});//findById busco por id
                                      if (cliente) {
                                        var reg  = await Cliente.findByIdAndUpdate({_id:id},{//findByIdAndUpdate busco por id y actualiza
                                            password:pass
                                            });
                        
                                            res.status(200).send({data:reg});
                                      }          
                                      
                                } catch (error) {//captura el error
                                    res.status(500).send({data:undefined});//manda la data undefined para poder validar en el fronten edit-component  
                                }*/
                        
                        
                            }


                            const actualizar_perfil_admin = async function(req, res){

                                if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
                                    if (req.user.role == 'admin') {//si es admin paso
                                        
                                     var id=req.user.sub;
                                     var data=req.body;//lo q me viene del formulario del body
                                var reg  = await Admin.findByIdAndUpdate({_id:id},{//findByIdAndUpdate busco por id y actualiza
                                nombres:data[0].nombres,
                                apellidos:data[0].apellidos,
                                //email:data[0].email,
                                telefono:data[0].telefono,
                                city:data[0].city,
                                pais:data[0].pais,
                                dni:data[0].dni
                               
                                }) 
                                
                                res.status(200).send({data:reg});
                                                
                                    }else{
                                res.status(500).send({message:'NoAccess'}); 
                                    }
                                }else{
                                res.status(500).send({message:'NoAccess'}); 
                                }
                                
                                
                                }


module.exports = { 
    registro_admin,
    login_admin,
    obtener_mensajes_admin,
    cerrar_mensajes_admin,
    obtener_ventas_admin,
    kpi_ganancias_mensuales_admin,
    agregar_etiqueta_admin,
    listar_etiquetas_admin,
    eliminar_etiqueta_admin,
    listar_etiquetas_producto_admin,
    listar_variedades_admin,
    actualizar_producto_variedades_admin,
    eliminar_variedad_admin,
    agregar_nueva_variedad_admin,
    obtener_producto_admin,
    listar_inventario_producto_admin,
    registro_inventario_producto_admin,
    cambiar_vs_producto_admin,
    listar_variedades_productos_admin,
    registro_compra_manual_cliente,
    marcar_finalizado_orden,
    eliminar_orden_admin,
    marcar_envio_orden,
    confirmar_pago_orden,  
    registro_producto_admin,
    listar_productos_admin,
    eliminar_etiqueta_producto_admin,
    agregar_etiqueta_producto_admin,
    obtener_imagen,
    actualizar_producto_admin,
    agregar_imagen_galeria_admin,
    eliminar_imagen_galeria_admin,
    verificar_token,
    obtener_config_admin,
    actualizar_config_admin,
    pedido_compra_cliente,
    obtener_detalles_ordenes_cliente,
    obtener_tope_destacados,
    actualizar_inventario_producto_admin,
    registro_inicio_admin,
    listar_inicio_admin,
    obtener_inicio_admin,
    actualizar_inicio_admin,
    eliminar_inicio_admin,
    obtener_inicio,
    registro_inicioa_admin,
    obtener_inicio1_admin,
    actualizar_parte1_admin,
    eliminar_parte1_admin,
    registro_tapa_admin,
    //obtener_parte1_admin,
    obtener_tapa_admin,
    actualizar_slider_admin,
    eliminar_slider_admin,
    registro_parte2_admin,
    actualizar_parte2_admin,
    actualizar_parte3_admin,
    obtener_parte2_admin,
    eliminar_parte2_admin,
    registro_parte3_admin,
    obtener_parte3_admin,
    eliminar_parte3_admin,
    obtener_politicas_envio,
    registro_politicas_admin,
    actualizar_politicas_admin,
    eliminar_politicas_admin,
    registro_terminos_admin,
    obtener_terminos,
    actualizar_terminos_admin,
    eliminar_terminos_admin,
    obtener_admin,
    pass_cambioAdmin,
    update_Adminpass,
    actualizar_perfil_admin,
    registro_admin_secret
    
    }; //para poder importarlo con un reqired

    

   

