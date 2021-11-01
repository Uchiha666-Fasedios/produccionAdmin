'use strict'

var Producto = require('../models/producto');
var Inventario = require('../models/inventario');
var Review = require('../models/review');
var fs = require('fs');//modulo para archivos
var path = require('path');//modulo para manejar imagenes


const registro_producto_admin = async function(req, res){//async define una función asíncrona,

    if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
        if (req.user.role == 'admin') {//si es admin paso
        
    var data = req.body; //req lo q le puedo estar enviando desde el cliente o la peticion q yo haga req.body lo q llega del body de la peticion 
    var img_path = req.files.portada.path;//agarro la ruta junto con su nombre de la imagen
    //console.log(req.files);
    //console.log(data);
    var name = img_path.split('/');
    var portada_name = name[2];
    data.slug = data.titulo.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');//convertimos nuestro titulo en un slug para ponerlo de slug porqe tiene q cargar alguno
    data.portada = portada_name;
    let reg = await Producto.create(data);//se crea el producto 

    //creo el inventario del producto registrado
    let inventario = await Inventario.create({//creo el inventario
        producto: reg._id,//coloco el id del producto q esta en reg
        admin: req.user.sub,//coloco el id del admin
        cantidad: data.stock,
        proveedor: 'Primer registro'
        
    });
    ////////////////////


    res.status(200).send({data:reg,inventario:inventario});

        }else{

                res.status(500).send({message:'NoAccess'}); 
        
        }

        }else{
                res.status(500).send({message:'NoAccess'}); 
        }




}



const listar_productos_admin = async function(req, res){//async define una función asíncrona,
        //console.log(req.user);
        if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
            if (req.user.role == 'admin') {//si es admin paso
                                //let tipo=req.params['tipo'];
                        let filtro=req.params['filtro'];
                        let reg = await Producto.find({titulo:new RegExp(filtro,'i')});//RegExp permiten describir secuencias de caracteres
                    res.status(200).send({data:reg});
                    
            }else{
                res.status(500).send({message:'NoAccess'}); 
            }
        }else{
        res.status(500).send({message:'NoAccess'}); 
        }


}



const obtener_portada = async function(req, res){//async define una función asíncrona,

var img=req.params['img'];
//console.log(img);
fs.stat('./uploads/productos/'+img,function(err){
  if (!err) {
      let path_img='./uploads/productos/'+img;
      res.status(200).sendFile(path.resolve(path_img));
  }else{
      let path_img='./uploads/default.jpg';
      res.status(200).sendFile(path.resolve(path_img));
  }  
})

}


const obtener_producto_admin = async function(req, res){//async define una función asíncrona,
    //console.log(req.user);
    if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
        if (req.user.role == 'admin') {//si es admin paso
        var id=req.params['id'];
    try {//si va todo bien y no hay errores porqe si se pone en la url otro id desconocido captura el error
        var reg  = await Producto.findById({_id:id});//findById busco por id
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



const actualizar_producto_admin = async function(req, res){//async define una función asíncrona,

    if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
        if (req.user.role == 'admin') {//si es admin paso
        var id=req.params['id'];
        var data=req.body;//lo q me viene del formulario del body

    if (req.files) {//si hay imagen
    var img_path = req.files.portada.path;//agarro la ruta junto con su nombre de la imagen

    var name = img_path.split('/');
    var portada_name = name[2];


    var reg  = await Producto.findByIdAndUpdate({_id:id},{//findByIdAndUpdate busco por id y lo guarda en reg luego actualiza lo q esta en la llaves
    titulo:data.titulo,
    stock:data.stock,
    precio:data.precio,
    categoria:data.categoria,
    descripcion:data.descripcion,
    contenido:data.contenido,
    portada:portada_name
    })//EN REG QEDA LO ANTERIOR

    //console.log('lo anteriror'+reg);

    //obtener portada e iliminarla
    fs.stat('./uploads/productos/'+reg.portada,function(err){//stat metodo del modulo..obtengo la portada o sea la imagen del backend donde esta uploads
    if (!err) {//si no ay error o se si ay imagen
    fs.unlink('./uploads/productos/'+reg.portada,(err)=>{//la elimino
        if(err) throw err;
    });  
    }  
    });



    res.status(200).send({data:reg});

    }else{//si no ay imagen
    var reg  = await Producto.findByIdAndUpdate({_id:id},{//findByIdAndUpdate busco por id y actualiza
    titulo:data.titulo,
    stock:data.stock,
    precio:data.precio,
    categoria:data.categoria,
    descripcion:data.descripcion,
    contenido:data.contenido

    })

    res.status(200).send({data:reg});
    }






                    
        }else{
    res.status(500).send({message:'NoAccess'}); 
        }
    }else{
    res.status(500).send({message:'NoAccess'}); 
    }




}



const eliminar_producto_admin = async function(req, res){

        if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
            if (req.user.role == 'admin') {//si es admin paso
        var id=req.params['id'];
        var reg  = await Producto.findByIdAndRemove({_id:id});//findByIdAndRemove busco por id y elimino

        //EN REG QEDA LO ANTERIOR
        //console.log('lo anteriror'+reg);

        //obtener portada e iliminarla
        fs.stat('./uploads/productos/'+reg.portada,function(err){//stat metodo del modulo..obtengo la portada o sea la imagen del backend donde esta uploads
        if (!err) {//si no ay error o se si ay imagen
        fs.unlink('./uploads/productos/'+reg.portada,(err)=>{//la elimino
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




const listar_inventario_producto_admin = async function(req, res){//async define una función asíncrona,
//console.log(req.user);
if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
    if (req.user.role == 'admin') {//si es admin paso
                       var id=req.params['id'];
                
                let reg = await Inventario.find({producto: id}).populate('admin').sort({createdAt:-1});//sort({createdAt:-1}) lo ordena del mas actual primero//Inventario.find({producto: id}) busca en inventario el q tenga el id en el campo producto.. populate('admin') es lo q viene a ser en sql un join y su relacion es con admin fijate en el modelo inventario y veras q es el campo admin y relaciona con la coleccion admin
               res.status(200).send({data:reg});
              
    }else{
        res.status(500).send({message:'NoAccess'}); 
    }
}else{
res.status(500).send({message:'NoAccess'}); 
}


}



const eliminar_inventario_producto_admin = async function(req, res){//async define una función asíncrona,
//console.log(req.user);
if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
    if (req.user.role == 'admin') {//si es admin paso
                //OBTENER EL ID DEL INVENTARIO
                       var id=req.params['id'];
                       
                       
                //ELIMINAR INVENTARIO
                let reg = await Inventario.findByIdAndRemove({_id:id});//findByIdAndRemove busca por _id uno por uno desde la tabla mongodb y elimino el q tenga q ver con id

               //OBTENER EL REGISTRO DE PRODUCTO
                let prod = await Producto.findById({_id: reg.producto});
                
                //CALCULAR EL NUEVO STOCK
                let nuevo_stock = parseInt(prod.stock) - parseInt(reg.cantidad);//resto el stock del producto con la cantidad del invetario 

               //ACTUALIZACION DEL NUEVO STOCK AL PRODUCTO
                var producto  = await Producto.findByIdAndUpdate({_id: reg.producto},{//findByIdAndUpdate busco por id y actualiza
                
                stock:nuevo_stock
               

                });


               res.status(200).send({data:producto});
              
    }else{
        res.status(500).send({message:'NoAccess'}); 
    }
}else{
res.status(500).send({message:'NoAccess'}); 
}


}



const registro_inventario_producto_admin = async function(req, res){//async define una función asíncrona,
//console.log(req.user);
if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
    if (req.user.role == 'admin') {//si es admin paso
               
             var data=req.body;//lo q me viene del formulario del body
             let reg = await Inventario.create(data);//se crea el producto 
             //OBTENER EL REGISTRO DE PRODUCTO
                let prod = await Producto.findById({_id: reg.producto});

                //CALCULAR EL NUEVO STOCK
                                   //stock actual              //stock a aumentar
                let nuevo_stock = parseInt(prod.stock) + parseInt(reg.cantidad);//resto el stock del producto con la cantidad del invetario 

                 //ACTUALIZACION DEL NUEVO STOCK AL PRODUCTO
                var producto  = await Producto.findByIdAndUpdate({_id: reg.producto},{//findByIdAndUpdate busco por id y actualiza
                
                stock:nuevo_stock
               

                });

             res.status(200).send({data:reg});

    }else{
        res.status(500).send({message:'NoAccess'}); 
    }
}else{
res.status(500).send({message:'NoAccess'}); 
}


}





const actualizar_producto_variedades_admin = async function(req, res){//async define una función asíncrona,

if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
    if (req.user.role == 'admin') {//si es admin paso
     var id=req.params['id'];
     var data=req.body;//lo q me viene del formulario del body


var reg  = await Producto.findByIdAndUpdate({_id:id},{//findByIdAndUpdate busco por id y lo guarda en reg luego actualiza lo q esta en la llaves
titulo_variedad: data.titulo_variedad,
variedades: data.variedades
})//EN REG QEDA LO ANTERIOR
      res.status(200).send({data:reg});  
              
    }else{
res.status(500).send({message:'NoAccess'}); 
    }
}else{
res.status(500).send({message:'NoAccess'}); 
}


}



const agregar_imagen_galeria_admin = async function(req, res){//async define una función asíncrona,

if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
    if (req.user.role == 'admin') {//si es admin paso
     var id=req.params['id'];
     var data=req.body;//lo q me viene del formulario del body

var img_path = req.files.imagen.path;//agarro la ruta junto con su nombre de la imagen
var name = img_path.split('/');
var imagen_name = name[2];  


var reg  = await Producto.findByIdAndUpdate({_id:id},{//findByIdAndUpdate busco por id y lo guarda en reg luego actualiza lo q esta en la llaves
$push:{galeria:{
    imagen:imagen_name,
    _id:data._id
}}
});//EN REG QEDA LO ANTERIOR


res.status(200).send({data:reg}); 
              
    }else{
res.status(500).send({message:'NoAccess'}); 
    }
}else{
res.status(500).send({message:'NoAccess'}); 
}


}


const eliminar_imagen_galeria_admin = async function(req, res){//async define una función asíncrona,

if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
    if (req.user.role == 'admin') {//si es admin paso
     var id=req.params['id'];
     var data=req.body;//lo q me viene del formulario del body
 

var reg  = await Producto.findByIdAndUpdate({_id:id},{$pull: {galeria: {_id: data._id}}});//findByIdAndUpdate busco por id y lo guarda en reg luego actualiza lo q esta en la llaves , pull saca del array galeria tal id

//EN REG QEDA LO ANTERIOR


res.status(200).send({data:reg}); 
              
    }else{
res.status(500).send({message:'NoAccess'}); 
    }
}else{
res.status(500).send({message:'NoAccess'}); 
}


}

//METODOS PUBLICOS
const listar_productos_public = async function(req, res){//async define una función asíncrona,
                        //let tipo=req.params['tipo'];
                let filtro=req.params['filtro'];
                let reg = await Producto.find({titulo:new RegExp(filtro,'i')}).sort({createdAt:-1});//sort({createdAt:-1}) lo ordena del mas actual ..RegExp permiten describir secuencias de caracteres
               res.status(200).send({data:reg});

}


const obtener_productos_slug_public = async function(req, res){//async define una función asíncrona,
                        
                let slug=req.params['slug'];
                let reg = await Producto.findOne({slug:slug});//findOne recibe un objeto que será usado para buscar coincidencias, como lo haces con find
               res.status(200).send({data:reg});

}


const listar_productos_recomendados_public = async function(req, res){//async define una función asíncrona,
                        //let tipo=req.params['tipo'];
                let categoria=req.params['categoria'];
                let reg = await Producto.find({categoria:new RegExp(categoria,'i')}).sort({createdAt:-1}).limit(8);//sort({createdAt:-1}) lo ordena del mas actual ..RegExp permiten describir secuencias de caracteres
               res.status(200).send({data:reg});

}

const listar_productos_nuevos_public = async function(req, res){//async define una función asíncrona,
                       
                let reg = await Producto.find().sort({createdAt:-1}).limit(8);//sort({createdAt:-1}) lo ordena del mas actual ..RegExp permiten describir secuencias de caracteres
               res.status(200).send({data:reg});

}

const listar_productos_masvendidos_public = async function(req, res){//async define una función asíncrona,
                       
                let reg = await Producto.find().sort({nventas:-1}).limit(8);//sort({createdAt:-1}) lo ordena del mas actual ..RegExp permiten describir secuencias de caracteres
               res.status(200).send({data:reg});

}


const obtener_reviews_producto_public = async function(req, res){//async define una función asíncrona,
                       let id=req.params['id'];
                let reg = await Review.find({producto:id}).populate('cliente').sort({createdAt:-1});//sort({createdAt:-1}) lo ordena del mas actual ..RegExp permiten describir secuencias de caracteres
               res.status(200).send({data:reg});

}





module.exports = { 
    registro_producto_admin,
    listar_productos_admin,
    obtener_portada,
    obtener_producto_admin,
    actualizar_producto_admin,
    eliminar_producto_admin,
    listar_inventario_producto_admin,
    eliminar_inventario_producto_admin,
    registro_inventario_producto_admin,
    actualizar_producto_variedades_admin,
    agregar_imagen_galeria_admin,
    eliminar_imagen_galeria_admin,
    listar_productos_public,
    obtener_productos_slug_public,
    listar_productos_recomendados_public,
    listar_productos_nuevos_public,
    listar_productos_masvendidos_public,
    obtener_reviews_producto_public 
    }; //para poder importarlo con un reqired