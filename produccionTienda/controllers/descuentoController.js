'use strict'

var Descuento = require('../models/descuento');
var fs = require('fs');//modulo para archivos
var path = require('path');//modulo para manejar imagenes


const registro_descuento_admin = async function(req, res){//async define una función asíncrona,

    if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
        if (req.user.role == 'admin') {//si es admin paso
        
    var data = req.body; //req lo q le puedo estar enviando desde el cliente o la peticion q yo haga req.body lo q llega del body de la peticion 
    var img_path = req.files.banner.path;//agarro la ruta junto con su nombre de la imagen
    //console.log(req.files);
    //console.log(data);
    var name = img_path.split('/');
    var banner_name = name[2];
     
    data.banner = banner_name;
    let reg = await Descuento.create(data);//se crea el producto 

   


    res.status(200).send({data:reg});

        }else{

                res.status(500).send({message:'NoAccess'}); 
        
        }

        }else{
                res.status(500).send({message:'NoAccess'}); 
        }


}




const listar_descuentos_admin = async function(req, res){//async define una función asíncrona,
        //console.log(req.user);
        if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
            if (req.user.role == 'admin') {//si es admin paso
                                //let tipo=req.params['tipo'];
                        let filtro=req.params['filtro'];
                        let reg = await Descuento.find({titulo:new RegExp(filtro,'i')}).sort({createdAt:-1});//RegExp permiten describir secuencias de caracteres
                    res.status(200).send({data:reg});
                    
            }else{
                res.status(500).send({message:'NoAccess'}); 
            }
        }else{
        res.status(500).send({message:'NoAccess'}); 
        }


}


const obtener_banner_descuento = async function(req, res){//async define una función asíncrona,

var img=req.params['img'];
//console.log(img);
fs.stat('./uploads/descuentos/'+img,function(err){
  if (!err) {
      let path_img='./uploads/descuentos/'+img;
      res.status(200).sendFile(path.resolve(path_img));
  }else{
      let path_img='./uploads/default.jpg';
      res.status(200).sendFile(path.resolve(path_img));
  }  
})

}


const obtener_descuento_admin = async function(req, res){//async define una función asíncrona,
    //console.log(req.user);
    if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
        if (req.user.role == 'admin') {//si es admin paso
        var id=req.params['id'];
    try {//si va todo bien y no hay errores porqe si se pone en la url otro id desconocido captura el error
        var reg  = await Descuento.findById({_id:id});//findById busco por id
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


const actualizar_descuento_admin = async function(req, res){//async define una función asíncrona,

    if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
        if (req.user.role == 'admin') {//si es admin paso
        var id=req.params['id'];
        var data=req.body;//lo q me viene del formulario del body

    if (req.files) {//si hay imagen
    var img_path = req.files.banner.path;//agarro la ruta junto con su nombre de la imagen

    var name = img_path.split('/');
    var banner_name = name[2];


    var reg  = await Descuento.findByIdAndUpdate({_id:id},{//findByIdAndUpdate busco por id y lo guarda en reg luego actualiza lo q esta en la llaves
    titulo:data.titulo,
    banner:banner_name,
    descuento:data.descuento,
    fecha_inicio:data.fecha_inicio,
    fecha_fin:data.fecha_fin
    
    });//EN REG QEDA LO ANTERIOR devuelve lo anterior

    //console.log('lo anteriror'+reg);

    //obtener portada e iliminarla
    fs.stat('./uploads/descuentos/'+reg.banner,function(err){//stat metodo del modulo..obtengo la portada o sea la imagen del backend donde esta uploads
    if (!err) {//si no ay error o se si ay imagen
    fs.unlink('./uploads/descuentos/'+reg.banner,(err)=>{//la elimino
        if(err) throw err;
    });  
    }  
    });



    res.status(200).send({data:reg});

    }else{//si no ay imagen
    var reg  = await Descuento.findByIdAndUpdate({_id:id},{//findByIdAndUpdate busco por id y actualiza
     titulo:data.titulo,
    descuento:data.descuento,
    fecha_inicio:data.fecha_inicio,
    fecha_fin:data.fecha_fin

    });

    res.status(200).send({data:reg});
    }






                    
        }else{
    res.status(500).send({message:'NoAccess'}); 
        }
    }else{
    res.status(500).send({message:'NoAccess'}); 
    }


}


const eliminar_descuento_admin = async function(req, res){

        if (req.user) {//me llegaria del midelware  el usuario middlewares\authenticate.js
            if (req.user.role == 'admin') {//si es admin paso
        var id=req.params['id'];
        var reg  = await Descuento.findByIdAndRemove({_id:id});//findByIdAndRemove busco por id y elimino

        //EN REG QEDA LO ANTERIOR
        //console.log('lo anteriror'+reg);

        //obtener portada e iliminarla
        fs.stat('./uploads/descuentos/'+reg.banner,function(err){//stat metodo del modulo..obtengo la portada o sea la imagen del backend donde esta uploads
        if (!err) {//si no ay error o se si ay imagen
        fs.unlink('./uploads/descuentos/'+reg.banner,(err)=>{//la elimino
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


const obtener_descuento_activo = async function(req, res){

 let descuentos = await Descuento.find().sort({createdAt:-1});
 var arr_descuentos = [];
var today = Date.parse(new Date().toString())/1000;
descuentos.forEach(element => {
    var tt_inicio = Date.parse(element.fecha_inicio+"T00:00:00")/1000;//creo timestamp q esto da un numero q refiere a esta fecha
    var tt_fin = Date.parse(element.fecha_fin+"T23:59:59")/1000;

    if (today >= tt_inicio && today <= tt_fin) {
        arr_descuentos.push(element)
    }
});

if (arr_descuentos.length >= 1) {
     res.status(200).send({data:arr_descuentos});
}else{
     res.status(200).send({data:undefined});
}

}



module.exports = { 
  registro_descuento_admin,
  listar_descuentos_admin,
  obtener_banner_descuento,
  obtener_descuento_admin,
  actualizar_descuento_admin,
  eliminar_descuento_admin,
  obtener_descuento_activo
    }; //para poder importarlo con un reqired