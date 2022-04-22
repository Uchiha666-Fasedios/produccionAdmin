'use strict'

var Cliente = require('../models/cliente'); //me traigo el modelo LOS REQIRED LOS PUEDO HACER PORQE SE AGREGO module.exports EN LOS ARCHIVOS de donde los llamo
var Direccion = require('../models/direccion');
var Contacto = require('../models/contacto');
var Venta = require('../models/venta');
var Dventa = require('../models/dventa');
var Review = require('../models/review');
var Producto_etiqueta = require('../models/Producto_etiqueta');
var Producto = require('../models/producto');
var Variedad = require('../models/Variedad');
var Config = require('../models/config');
//var Cliente = require('../models/Cliente');
var Inicio1 = require('../models/inicio1');
var Carrito = require('../models/carrito');
var Slider = require('../models/slider');
var Parte2 = require('../models/parte2');
var Parte3 = require('../models/parte3');
var Admin = require('../models/admin');

var bcrypt=require('bcrypt-nodejs');//tomo el paqete de encriptacion
var jwt=require('../helpers/jwt');
var fs = require('fs');
var handlebars = require('handlebars');
var ejs = require('ejs');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var path = require('path');










const registro_cliente = async function(req, res){//async define una función asíncrona,

var data = req.body; //req lo q le puedo estar enviando desde el cliente o la peticion q yo haga req.body lo q llega del body de la peticion 
var clientes_arr = [];

//El operador await es usado para esperar a una Promise. Sólo puede ser usado dentro de una función async function.
//La expresión await provoca que la ejecución de una función async sea pausada hasta que una Promise sea terminada o rechazada, y regresa a la ejecución de la función async después del término
clientes_arr = await Cliente.find({email:data.email})//aca lo q hago es buscar en el modelo cliente el email, va viendo si con data.email q es lo q me llega del post esta

if (clientes_arr.length == 0) {//si no existe entro para crearlo
   
if (data.password) {//si me llega un password
    bcrypt.hash(data.password,null,null,async function(req, hash){//la encripto
if (hash) {//si se encripto
    data.password=hash;//la seteo 
    //data.rol='user';
     //REGISTRO
  var reg  = await Cliente.create(data);
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

const login_cliente = async function(req,res){
    var data = req.body;
    var cliente_arr = [];

    cliente_arr = await Cliente.find({email:data.email});

    if(cliente_arr.length == 0){
        res.status(200).send({message: 'No se encontro el correo', data: undefined});
    }else{
        //LOGIN
        let user = cliente_arr[0];
        bcrypt.compare(data.password, user.password, async function(error,check){
            if(check){

                if(data.carrito.length >= 1){
                    for(var item of data.carrito){
                        await Carrito.create({
                            cantidad:item.cantidad,
                            producto:item.producto._id,
                            variedad:item.variedad.id,
                            cliente:user._id
                        });
                    }
                }

                res.status(200).send({
                    data:user,
                    token: jwt.createToken(user)
                });
            }else{
                res.status(200).send({message: 'La contraseña no coincide', data: undefined}); 
            }
        });
 
    } 
}



const listar_clientes_filtro_admin = async function(req, res){//async define una función asíncrona,
//console.log(req.user);
if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
    if (req.user.role == 'admin') {//si es admin paso
                        let tipo=req.params['tipo'];
                let filtro=req.params['filtro'];

                //console.log(tipo);
                if (tipo == null || tipo == 'null') {
                var reg  = await Cliente.find();
                res.status(200).send({data:reg});  
                }else{
                    //FILTRO
                    if (tipo == 'apellidos') {
                    let reg = await Cliente.find({apellidos:new RegExp(filtro,'i')});//RegExp permiten describir secuencias de caracteres
                        res.status(200).send({data:reg});
                    }else if(tipo == 'correo'){
                    let reg = await Cliente.find({email:new RegExp(filtro,'i')});
                        res.status(200).send({data:reg});
                    }
                }
    }else{
        res.status(500).send({message:'NoAccess'}); 
    }
}else{
res.status(500).send({message:'NoAccess'}); 
}


}




const registro_cliente_admin = async function(req, res){//async define una función asíncrona,
//console.log(req.user);
if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
    if (req.user.role == 'admin') {//si es admin paso
               var data= req.body;//lo q viene de la vista del formulario del body

               //coloco PASSWORD
  bcrypt.hash(9876543210,null,null,async function(err, hash){//123456789 le doy una contraseña por defecto la encripto
if (hash) {//si se encripto
    data.password=hash;//la seteo 
     //REGISTRO
  var reg  = await Cliente.create(data);
    
    res.status(200).send({data:reg});//status(200) q si es una respuesta exitosa send para enviar los datos
}else{//si no se encripto
      res.status(200).send({ //status(200) q si es una respuesta exitosa send para enviar los datos
            message: 'Hubo un error en el servidor',data:undefined
        });
}
    });

                
    }else{
res.status(500).send({message:'NoAccess'}); 
}
}else{
res.status(500).send({message:'NoAccess'}); 
}


}


const obtener_cliente_admin = async function(req, res){//async define una función asíncrona,
//console.log(req.user);
if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
    if (req.user.role == 'admin') {//si es admin paso
     var id=req.params['id'];
try {//si va todo bien y no hay errores porqe si se pone en la url otro id desconocido captura el error
    var reg  = await Cliente.findById({_id:id});//findById busco por id
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


const actualizar_cliente_admin = async function(req, res){

if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
    if (req.user.role == 'admin') {//si es admin paso
     var id=req.params['id'];
     var data=req.body;//lo q me viene del formulario del body
var reg  = await Cliente.findByIdAndUpdate({_id:id},{//findByIdAndUpdate busco por id y actualiza
nombres:data.nombres,
apellidos:data.apellidos,
email:data.email,
telefono:data.telefono,
f_nacimiento:data.f_nacimiento,
dni:data.dni,
genero:data.genero
}) 

res.status(200).send({data:reg});
                
    }else{
res.status(500).send({message:'NoAccess'}); 
    }
}else{
res.status(500).send({message:'NoAccess'}); 
}


}


const eliminar_cliente_admin = async function(req, res){

if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
    if (req.user.role == 'admin') {//si es admin paso
var id=req.params['id'];
var reg  = await Cliente.findByIdAndRemove({_id:id});//findByIdAndRemove busco por id y elimino
res.status(200).send({data:reg});
                
    }else{
res.status(500).send({message:'NoAccess'}); 
    }
}else{
res.status(500).send({message:'NoAccess'}); 
}

}




const obtener_cliente_guest = async function(req, res){//async define una función asíncrona,
//console.log(req.user);
if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js

     var id=req.params['id'];
try {//si va todo bien y no hay errores porqe si se pone en la url otro id desconocido captura el error
    var reg  = await Cliente.findById({_id:id});//findById busco por id
                res.status(200).send({data:reg});  
} catch (error) {//captura el error
    res.status(200).send({data:undefined});//manda la data undefined para poder validar en el fronten edit-component  
}               
   
}else{
res.status(500).send({message:'NoAccess'}); 
}


}



const actualizar_perfil_cliente_guest = async function(req, res){//async define una función asíncrona,
//console.log(req.user);
if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js

     var id=req.params['id'];
     var data=req.body;//lo q me viene del formulario del body


if (data.password) {
    console.log('con contraseña');
      bcrypt.hash(data.password,null,null,async function(err, hash){//data.password le doy una contraseña y la encripto
 var reg  = await Cliente.findByIdAndUpdate({_id:id},{//findByIdAndUpdate busco por id y actualiza
nombres:data.nombres,
apellidos:data.apellidos,
telefono:data.telefono,
f_nacimiento:data.f_nacimiento,
dni:data.dni,
genero:data.genero,
pais:data.pais,
password:hash
}); 

 res.status(200).send({data:reg}); 
    });

   
    
}else{
    console.log('sin contraseña');
    var reg  = await Cliente.findByIdAndUpdate({_id:id},{//findByIdAndUpdate busco por id y actualiza
nombres:data.nombres,
apellidos:data.apellidos,
telefono:data.telefono,
f_nacimiento:data.f_nacimiento,
dni:data.dni,
genero:data.genero,
pais:data.pais
}) 

res.status(200).send({data:reg}); 

}
  
   
}else{
res.status(500).send({message:'NoAccess'}); 
}


}

////////////////////ORDENES//////////////////////////
const obtener_ordenes_cliente = async function(req, res){//async define una función asíncrona,

if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
        var id = req.params['id'];

  let reg  = await Venta.find({cliente:id}).sort({createdAt:-1});


  if (reg.length >= 1) {
   res.status(200).send({data:reg});
}else if(reg.length == 0){
 res.status(200).send({data:undefined});   
             
}             
    
  }else{
      res.status(500).send({message:'NoAccess'});
  }

}


const obtener_detalles_ordenes_cliente = async function(req, res){//async define una función asíncrona,

if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
        var id = req.params['id'];
        var variedades_arr = [];

 try {
     let venta = await Venta.findById({_id:id}).populate('direccion').populate('cliente');
     let detalles = await Dventa.find({venta:id}).populate('producto');

     for(var item of detalles){
        let variedades = await Variedad.findById({_id:item.variedad});
        variedades_arr.push({
            variedades: variedades.valor
        });
    }

    
      res.status(200).send({data:venta,detalles:detalles,variedades:variedades_arr});

 } catch (error) {
     res.status(200).send({data:undefined});
 }
    
  }else{
      res.status(500).send({message:'NoAccess'});
  }

}

///////////////////////////////DIRECCIONES////////////////////////////////////
const registro_direccion_cliente = async function(req, res){//async define una función asíncrona,

if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
        var data = req.body; //req lo q le puedo estar enviando desde el cliente o la peticion q yo haga req.body lo q llega del body de la peticion 
 
 if (data.principal) {//si elijo principal a esta direccion
    let direcciones  = await Direccion.find({cliente:data.cliente});//agarro todas las direcciones del usuario
 direcciones.forEach(async element => { //async define una función asíncrona, tengo q ponerlo en el foreach
     await Direccion.findByIdAndUpdate({_id:element._id},{principal:false});//findByIdAndUpdate busco por id y actualiza pongo a todas las direcciones principal en false 
 });
 
 }
 
   //REGISTRO_direccion
  var reg  = await Direccion.create(data);//creo la nueva direccion
    //req lo q le puedo estar enviando desde el cliente o la peticion q yo haga y res es la response q yo estoy enviando
    res.status(200).send({data:reg});//status(200) q si es una respuesta exitosa send para enviar los datos                      
                               
    
  }else{
      res.status(500).send({message:'NoAccess'});
  }


}




const obtener_direccion_todos_cliente = async function(req, res){//async define una función asíncrona,

if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
        var id = req.params['id']; //req lo q le puedo estar enviando desde el cliente o la peticion q yo haga req.body lo q llega del body de la peticion 
 
            let direcciones  = await Direccion.find({cliente:id}).populate('cliente').sort({createdAt:-1});  //busca las direcciones del usuario..populate es como un inerjoin y buscatabla cliente, sort({createdAt:-1} ordena de ultimo creado

            res.status(200).send({data:direcciones});//status(200) q si es una respuesta exitosa send para enviar los datos                      
                  
    
  }else{
      res.status(500).send({message:'NoAccess'});
  }


}




const cambiar_direccion_principal_cliente = async function(req, res){//async define una función asíncrona,

if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
        var id = req.params['id'];// el id de la direccion a cambiar
 var cliente = req.params['cliente'];//el cliente es el id del usuario

  let direcciones  = await Direccion.find({cliente:cliente});//agarro todas las direcciones del usuario
 direcciones.forEach(async element => { //async define una función asíncrona, tengo q ponerlo en el foreach
     await Direccion.findByIdAndUpdate({_id:element._id},{principal:false});//findByIdAndUpdate busco por id y actualiza pongo a todas las direcciones principal en false 
 });
   
   await Direccion.findByIdAndUpdate({_id:id},{principal:true});//findByIdAndUpdate busco por id y actualiza

    res.status(200).send({data:true});//status(200) q si es una respuesta exitosa send para enviar los datos                      
                               
    
  }else{
      res.status(500).send({message:'NoAccess'});
  }


}


const obtener_direccion_principal_cliente = async function(req, res){//async define una función asíncrona,

if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
        var id = req.params['id']; //req lo q le puedo estar enviando desde el cliente o la peticion q yo haga req.body lo q llega del body de la peticion 
        let direccion= undefined;
             direccion  = await Direccion.findOne({cliente:id,principal:true});//busca una direccion q tenga el id del usuario y q principal este en true  

if (direccion == undefined) {
    res.status(200).send({data:undefined});
}else{
res.status(200).send({data:direccion});//status(200) q si es una respuesta exitosa send para enviar los datos                      
             
}
                 
    
  }else{
      res.status(500).send({message:'NoAccess'});
  }


}

/////////////////////////////////////CONTACTO////////////////////////////////

const enviar_mensaje_contacto = async function(req, res){//async define una función asíncrona,

 var data = req.body;//lo q me llega del body en este caso del formulario
data.estado = 'Abierto';//a la data le agregamos una propiedad estado (q es la propiedad q tenemos en el modelo no tendria sentido ponerle cualqier nombre a esa propiedad o parametro) y Abierto se lo ponemos por defecto
 var reg  = await Contacto.create(data);
    
    res.status(200).send({data:reg});//status(200) q si es una respuesta exitosa send para enviar los datos                      
                            


}

///////////////////////////////REVIEW (reseña)////////////////////////////////////////

const emitir_review_producto_cliente = async function(req, res){//async define una función asíncrona,

if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
            var data = req.body;  
            var reg  = await Review.create(data);
    
    res.status(200).send({data:reg});        
    
  }else{
      res.status(500).send({message:'NoAccess'});
  }


}


const obtener_review_producto_cliente = async function(req, res){//async define una función asíncrona,
           
             var id = req.params['id']; //req lo q le puedo estar enviando desde el cliente o la peticion q yo haga req.body lo q llega del body de la peticion 
      
             let review  = await Review.find({producto:id}).sort({createdAt:-1});//busca una direccion q tenga el id del usuario y q principal este en true  
    
             res.status(200).send({data:review});        
    

}

const obtener_review_cliente = async function(req, res){//async define una función asíncrona,

if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
            var id = req.params['id']; 
            var reg  = await Review.find({cliente:id}).populate('cliente');
    
    res.status(200).send({data:reg});        
    
  }else{
      res.status(500).send({message:'NoAccess'});
  }


}


const listar_clientes_tienda = async function(req,res){
    if(req.user){
        var clientes = await Cliente.find();
        res.status(200).send({data:clientes});
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}

const listar_productos_destacados_publico = async function(req,res){
    let reg = await Producto_etiqueta.find({etiqueta:"61a390d39b40d02e0cb9d789"}).populate('producto');
    res.status(200).send({data: reg});
}

const listar_productos_admin = async function(req,res){
    if(req.user){
        var productos = await Producto.find({estado:'Publicado'});
        res.status(200).send({data:productos});
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}

const listar_productos_nuevos_publico = async function(req,res){
    let reg = await Producto.find({estado: 'Publicado'}).sort({createdAt:-1}).limit(8);
    res.status(200).send({data: reg});
}

const eliminar_direccion_cliente = async function(req,res){
    
    if(req.user){
        var id = req.params['id'];
        let direcciones = await Direccion.findByIdAndRemove({_id:id},{status:false});
        res.status(200).send({data:direcciones});
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const listar_productos_publico = async function(req,res){
    let arr_data = [];
    let reg = await Producto.find({estado:'Publicado'}).sort({createdAt:-1});

    for(var item of reg){
        let variedades = await Variedad.find({producto:item._id});
        arr_data.push({
            producto: item,
            variedades: variedades
        });
    }

    res.status(200).send({data: arr_data});
}

const obtener_productos_slug_publico = async function(req,res){
    var slug = req.params['slug'];
    try {
        let producto = await Producto.findOne({slug: slug,estado:'Publicado'});
        if(producto == undefined){
            res.status(200).send({data:undefined});
        }else{
            res.status(200).send({data:producto});
        }
    } catch (error) {
        res.status(200).send({data:undefined});
    }
}

const listar_productos_recomendados_publico = async function(req,res){
    var categoria = req.params['categoria'];
    let reg = await Producto.find({categoria: categoria,estado:'Publicado'}).sort({createdAt:-1}).limit(8);
    res.status(200).send({data: reg});
}

const obtener_reviews_cliente  = async function(req,res){
    if(req.user){
        let id = req.params['id'];
        let reg = await Review.find({cliente:id}).populate('cliente').populate('producto');
        res.status(200).send({data:reg});

    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const registro_compra_cliente = async function(req,res){
    if(req.user){

        var data = req.body;
        var detalles = data.detalles;

        data.estado = 'Procesando';

        let venta = await Venta.create(data);

        for(var element of detalles){
            element.venta = venta._id;
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

            //limpiar carrito
            await Carrito.deleteMany({cliente:data.cliente});
        }

        enviar_orden_compra(venta._id);

        res.status(200).send({data:venta});
    }else{
        res.status(500).send({message: 'NoAccess'});
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
    
        var transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: admin[0].email,
                pass: 'bblsujzfhkkbrhrs'
            }
        }));
    
     
        var orden = await Venta.findById({_id:venta}).populate('cliente').populate('direccion');
        var dventa = await Dventa.find({venta:venta}).populate('producto').populate('variedad');
        var config = await Config.find();
        var admin = await Admin.find();
    
        readHTMLFile(process.cwd() + '/mails/email_compra.html', (err, html)=>{
                                
            let rest_html = ejs.render(html, {orden: orden, dventa:dventa, config:config});
    
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

const consultarIDPago = async function(req,res){
    if(req.user){
        var id = req.params['id'];
        var ventas = await Venta.find({transaccion:id});
        res.status(200).send({data:ventas});
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const comprobar_carrito_cliente = async function(req,res){
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
                res.status(200).send({venta:true});
            }else{
                res.status(200).send({venta:false,message:'Stock insuficiente para ' + producto_sl});
            }
        } catch (error) {
            console.log(error);
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const obtener_reviews_producto_publico = async function(req,res){
    let id = req.params['id'];

    let reviews = await Review.find({producto:id}).populate('cliente').sort({createdAt:-1});
    res.status(200).send({data: reviews});
}

const eliminar_carrito_cliente = async function(req,res){
    if(req.user){
        let id = req.params['id'];
        let reg = await Carrito.findByIdAndRemove({_id:id});
        res.status(200).send({data:reg});
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const obtener_carrito_cliente = async function(req,res){
    if(req.user){
        let id = req.params['id'];

        let carrito_cliente = await Carrito.find({cliente:id}).populate('producto').populate('variedad');
        res.status(200).send({data:carrito_cliente});
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const agregar_carrito_cliente = async function(req,res){
    if(req.user){
        let data = req.body;

        let variedad = await Variedad.findById({_id:data.variedad});

        if(data.cantidad <= variedad.stock){
            let reg = await Carrito.create(data);
            res.status(200).send({data:reg});
        }else{
            res.status(200).send({data:undefined,message: 'Stock insuficiente, ingrese otra cantidad'});
        }

    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const obtener_variedades_productos_cliente = async function(req,res){
    let id = req.params['id'];
    let variedades = await Variedad.find({producto:id});
    res.status(200).send({data:variedades});
}



const registro_cliente_tienda = async function(req,res){
    let data = req.body;
    var clientes_arr = [];

    clientes_arr = await Cliente.find({email:data.email});

    if(clientes_arr.length == 0){
        if(data.password){
            bcrypt.hash(data.password,null,null, async function(err,hash){
                if(hash){
                    data.dni = '';
                    data.password = hash;
                    var reg = await Cliente.create(data);
                    res.status(200).send({data:reg});
                }else{
                    res.status(200).send({message:'ErrorServer',data:undefined});
                }
            })
        }else{
            res.status(200).send({message:'No hay una contraseña',data:undefined});
        }

        
    }else{
        res.status(200).send({message:'El correo ya existe, intente con otro.',data:undefined});
    }
}


const obtener_tapa = async function(req, res){//async define una función asíncrona,
        
    let slider = await Slider.find();
res.status(200).send({data:slider});
    }

    const obtener_parte1 = async function(req, res){//async define una función asíncrona,
        
        let inicio1 = await Inicio1.find();
        res.status(200).send({data:inicio1});
        }

        const obtener_parte2 = async function(req, res){//async define una función asíncrona,
        
            let parte2 = await Parte2.find();
            res.status(200).send({data:parte2});
            }

            const obtener_parte3 = async function(req, res){//async define una función asíncrona,
        
                let parte3 = await Parte3.find();
                res.status(200).send({data:parte3});
                }


                const update_carrito_cliente = async function(req, res){//async define una función asíncrona,

                      if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
                     var cant = req.params['cantidad'];//el cliente es el id del usuario
                     /*var producto = req.params['producto'];// el id de la direccion a cambiar
                     var variedad = req.params['variedad'];
                     var cant = req.params['cantidad'];*/
                     var data = req.body;
                     
                     let carritoUpdate = await Carrito.findOneAndUpdate({cliente:data.cliente,producto:data.producto,variedad:data.variedad},{
                        cantidad: cant
                    });
                       
                       
                    
                        res.status(200).send({data:carritoUpdate});//status(200) q si es una respuesta exitosa send para enviar los datos                      
                                                   
                        
                      }else{
                          res.status(500).send({message:'NoAccess'});
                      }
                    
                    
                    }

               

module.exports = { 
    eliminar_cliente_admin,
    registro_cliente,
    login_cliente,
    listar_clientes_filtro_admin ,
    registro_cliente_admin,
    obtener_cliente_admin,
    actualizar_cliente_admin,
    obtener_cliente_guest,
    actualizar_perfil_cliente_guest,
    registro_direccion_cliente,
    obtener_direccion_todos_cliente,
    cambiar_direccion_principal_cliente,
    obtener_direccion_principal_cliente,
    enviar_mensaje_contacto,
    obtener_ordenes_cliente,
    obtener_detalles_ordenes_cliente,
    emitir_review_producto_cliente,
    obtener_review_producto_cliente,
    obtener_review_cliente,
    listar_clientes_tienda,
    listar_productos_destacados_publico,
    listar_productos_nuevos_publico,
    eliminar_direccion_cliente,
    listar_productos_publico,
    obtener_productos_slug_publico,
    listar_productos_recomendados_publico,
    registro_cliente_tienda,
    obtener_variedades_productos_cliente,
    agregar_carrito_cliente,
    obtener_carrito_cliente,
    eliminar_carrito_cliente,
    obtener_reviews_producto_publico,
    comprobar_carrito_cliente,
    consultarIDPago,
    registro_compra_cliente,
    obtener_reviews_cliente,
    obtener_tapa,
    obtener_parte1,
    obtener_parte2,
    obtener_parte3,
    update_carrito_cliente
    
    }; //para poder importarlo con un reqired

    

   

