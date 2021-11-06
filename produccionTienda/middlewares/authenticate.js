'use strict'


var jwt=require('jwt-simple');
var moment=require('moment');
var secret='123456789';

exports.auth = function(req,res,next){//exports para poder utilizar en otro lado
   
//console.log(req.headers);
   if (!req.headers.authorization) {//si no me llega del fronten de angular la autentication o sea el token
       return res.status(403).send({message: 'NoHeadersError'});
   }

   var token=req.headers.authorization.replace(/['"]+/g,'');//agarro el token sacando las comillas por si las ay

   var segment = token.split('.');//fracciono el token en partes .. lo convierto en array por cada . es una fila y tiene q ser 3 porqe la codificacion se hace en tres partes va yo lo pudse q sea en tres

   //console.log(token);
   //console.log(segment);
   if (segment.length != 3) {//si no tiene 3 filas el vector
       return res.status(403).send({message: 'InvalidToken'});
   }else{
       try {
           var payload = jwt.decode(token,secret);//decodifico el token y tengo sus datos del usuario del token su expiracion etc..
          if (payload.exp <= moment().unix()) {//si es menor ya expiro caduco
              return res.status(403).send({message: 'TokenExpired'}); 
          }
       } catch (error) {
          return res.status(403).send({message: 'InvalidToken'}); 
       }
   }
req.user = payload;//meto todo el usuario y el token decodificado
next();

}