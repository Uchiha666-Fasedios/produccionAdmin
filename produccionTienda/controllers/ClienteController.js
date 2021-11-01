'use strict'

var cliente = require('../models/cliente'); //me traigo el modelo LOS REQIRED LOS PUEDO HACER PORQE SE AGREGO module.exports EN LOS ARCHIVOS de donde los llamo
var Direccion = require('../models/direccion');
var Contacto = require('../models/contacto');
var Venta = require('../models/venta');
var Dventa = require('../models/dventa');
var Review = require('../models/review');

var bcrypt=require('bcrypt-nodejs');//tomo el paqete de encriptacion
var jwt=require('../helpers/jwt');

const registro_cliente = async function(req, res){//async define una función asíncrona,

var data = req.body; //req lo q le puedo estar enviando desde el cliente o la peticion q yo haga req.body lo q llega del body de la peticion 
var clientes_arr = [];

//El operador await es usado para esperar a una Promise. Sólo puede ser usado dentro de una función async function.
//La expresión await provoca que la ejecución de una función async sea pausada hasta que una Promise sea terminada o rechazada, y regresa a la ejecución de la función async después del término
clientes_arr = await cliente.find({email:data.email})//aca lo q hago es buscar en el modelo cliente el email, va viendo si con data.email q es lo q me llega del post esta

if (clientes_arr.length == 0) {//si no existe entro para crearlo
   
if (data.password) {//si me llega un password
    bcrypt.hash(data.password,null,null,async function(req, hash){//la encripto
if (hash) {//si se encripto
    data.password=hash;//la seteo 
    //data.rol='user';
     //REGISTRO
  var reg  = await cliente.create(data);
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

const login_cliente = async function(req, res){//async define una función asíncrona,

 
var data = req.body; //req lo q le puedo estar enviando desde el cliente o la peticion q yo haga req.body lo q llega del body de la peticion 
var clientes_arr = [];

clientes_arr = await cliente.find({email:data.email})

if (clientes_arr.length == 0) {
res.status(200).send({ //status(200) q si es una respuesta exitosa send para enviar los datos
            message: 'No se encontro el correo',data:undefined
        });
}else{
//LOGIN
let user=clientes_arr[0];

 bcrypt.compare(data.password,user.password ,async function(error, check){
if (check) {
    res.status(200).send({ //status(200) q si es una respuesta exitosa send para enviar los datos
            data: user,
            token:jwt.createToken(user)
        });
}else{
    res.status(200).send({ //status(200) q si es una respuesta exitosa send para enviar los datos
            message: 'La contraseña no coincide',data:undefined
        });
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
                var reg  = await cliente.find();
                res.status(200).send({data:reg});  
                }else{
                    //FILTRO
                    if (tipo == 'apellidos') {
                    let reg = await cliente.find({apellidos:new RegExp(filtro,'i')});//RegExp permiten describir secuencias de caracteres
                        res.status(200).send({data:reg});
                    }else if(tipo == 'correo'){
                    let reg = await cliente.find({email:new RegExp(filtro,'i')});
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
  var reg  = await cliente.create(data);
    
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
    var reg  = await cliente.findById({_id:id});//findById busco por id
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
var reg  = await cliente.findByIdAndUpdate({_id:id},{//findByIdAndUpdate busco por id y actualiza
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
var reg  = await cliente.findByIdAndRemove({_id:id});//findByIdAndRemove busco por id y elimino
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
    var reg  = await cliente.findById({_id:id});//findById busco por id
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
 var reg  = await cliente.findByIdAndUpdate({_id:id},{//findByIdAndUpdate busco por id y actualiza
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
    var reg  = await cliente.findByIdAndUpdate({_id:id},{//findByIdAndUpdate busco por id y actualiza
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

 try {
     let venta = await Venta.findById({_id:id}).populate('direccion').populate('cliente');
     let detalles = await Dventa.find({venta:id}).populate('producto');
      res.status(200).send({data:venta,detalles:detalles});

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
    obtener_review_cliente
    }; //para poder importarlo con un reqired

    

   

