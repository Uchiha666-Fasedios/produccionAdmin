//TODO ESTO CONTIEN EL SERVICIO PARA ENVIO DE PETICIONE AJAX DESDE HTTP
//VA TENER LA CLASE Y LOS METODOS NECESARIOS
import { GLOBAL } from "./GLOBA";
import { Injectable } from '@angular/core';//para poder hacer peticiones ajax a un servicio externo a una url externa
import { HttpClient, HttpHeaders } from '@angular/common/http';//para poder hacer peticiones ajax a un servicio externo a una url externa
import { Observable } from 'rxjs';//para poder recoger la informacion q nos devuelve el apirest cuando hagamos una peticion
import { JwtHelperService } from "@auth0/angular-jwt";//importo el paqete de los guards

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

   public url: string;

  constructor(
    public _http: HttpClient//le inyecto al constructor le pongo de parametro este modulo para q tenga todo paras las peticiones http
  ) { 
    this.url = GLOBAL.url;//Global.url contiene la url base del proyecto del backend
  }




  login_cliente(data:any): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion

    //HttpHeaders me permite utilizar cabezeras 'Content-Type','application/json' el formato de cabecera q va a tener
//_http ya contiene el paqete con metodos necesarios y post porqe la info viene por post
		//url tiene la pagina base del backend concateno todo lo demas save-project porqe asi se llama el metodo para guardar datos y params tiene el modelo para llamar a los datos y guardar en el backend
		//let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
	                               
    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
  

		return this._http.post(this.url+'login_cliente',data, {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}


  obtener_cliente_guest(id:any,token:any): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
   
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', token);

		return this._http.get(this.url+'obtener_cliente_guest/'+id, {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}



  public isAuthenticated():boolean{//metodo para los guards
    
   const token= localStorage.getItem('token') || '{}';//|| '{}' esto porqe tiraba error espera un vector 
    
    if (!token) {//si no hay nada
      return false;
    }
//si el token no es valido no podra decodificar y se produce un error entonces uso try cach para capturar
    try {//si ay token
       const helper = new JwtHelperService();//instancio el paqete de los guard
    var decodedToken = helper.decodeToken(token);//al decodificar obtengo todos los datos del usuario
   //console.log(decodedToken);


 if (helper.isTokenExpired(token)) {//si tiene sesion serrada va no ay token
 localStorage.clear();//elimina la kukis entera
   return false;
 }

   
    if (!decodedToken) {//si no ay nada se produce un error
      console.log('no acceso');
      localStorage.clear();//elimina la kukis entera
      return false;
      
    }
    } catch (error) {
      localStorage.clear();//elimina la kukis entera
       return false;
    }


    return true;

  }



actualizar_perfil_cliente_guest(id:any,data:any,token:any): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
	                              
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', token);

		return this._http.put(this.url+'actualizar_perfil_cliente_guest/'+id,data, {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}



obtener_config_public(): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
   
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'obtener_config_public', {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}


  listar_productos_public(filtro:any): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
  
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'listar_productos_public/'+filtro, {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}


    agregar_carrito_cliente(data:any,token:any): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
   
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', token);

		return this._http.post(this.url+'agregar_carrito_cliente',data, {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}


 

  update_carrito_cliente(cantidad:any,data:any,token:any): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
	                              
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', token);

		return this._http.put(this.url+'update_carrito_cliente/'+cantidad,data, {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}


  obtener_carrito_cliente(id:any,token:any): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
   
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', token);

		return this._http.get(this.url+'obtener_carrito_cliente/'+id, {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}



  eliminar_producto_carrito_cliente(id:any,token:any): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
   
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', token);

		return this._http.delete(this.url+'eliminar_producto_carrito_cliente/'+id, {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}



    registro_direccion_cliente(data:any,token:any): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
   
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', token);

		return this._http.post(this.url+'registro_direccion_cliente',data, {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}


  obtener_direccion_todos_cliente(id:any,token:any): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
   
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', token);

		return this._http.get(this.url+'obtener_direccion_todos_cliente/'+id, {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}


  cambiar_direccion_principal_cliente(id:any,cliente:any,token:any): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
	                              
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', token);

		return this._http.put(this.url+'cambiar_direccion_principal_cliente/'+id+'/'+cliente,{data:true}, {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}


    obtener_direccion_principal_cliente(id:any,token:any): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
   
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', token);

		return this._http.get(this.url+'obtener_direccion_principal_cliente/'+id, {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}


  
    registro_compra_cliente(data:any,token:any): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
   
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', token);

		return this._http.post(this.url+'registro_compra_cliente',data, {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}


    get_token_culqi(data:any): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
   
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer pk_test_55a3ec6ff4052315' );

		return this._http.post('https://secure.culqi.com/v2/tokens',data, {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}


    get_charge_culqi(data:any): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
   
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer sk_test_0105a68f9deebf03' );

		return this._http.post(' https://api.culqi.com/v2/charges',data, {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}

  
   enviar_correo_compra_cliente(id:any,token:any): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
   
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', token);

		return this._http.get(this.url+'enviar_correo_compra_cliente/'+id, {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}


  validar_cupon_admin(cupon:any,token:any): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
   
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', token);

		return this._http.get(this.url+'validar_cupon_admin/'+cupon, {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}


    obtener_ordenes_cliente(id:any,token:any): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
   
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', token);

		return this._http.get(this.url+'obtener_ordenes_cliente/'+id, {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}


  obtener_detalles_ordenes_cliente(id:any,token:any): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
   
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', token);

		return this._http.get(this.url+'obtener_detalles_ordenes_cliente/'+id, {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}


   emitir_review_producto_cliente(data:any,token:any): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
   
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', token);

		return this._http.post(this.url+'emitir_review_producto_cliente',data, {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}


  obtener_review_producto_cliente(id:any): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
   
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'obtener_review_producto_cliente/'+id, {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}

   obtener_review_cliente(id:any,token:any): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
   
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', token);

		return this._http.get(this.url+'obtener_review_cliente/'+id, {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}

  
  

}

