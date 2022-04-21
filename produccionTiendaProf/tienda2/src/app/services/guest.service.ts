import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBA";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  public url;

  constructor(
    private _http: HttpClient,
  ) { 
    this.url = GLOBAL.url;
  }

  obtener_descuento_activo(): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
   
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'obtener_descuento_activo', {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}

   obtener_inicio(): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
   
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'obtener_inicio', {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}

  obtener_ip_cliente():Observable<any>{
    return this._http.get('https://api.ipify.org/?format=json');//eso me da la ip mia
  }

  obtener_data_cliente(ip:any):Observable<any>{
    return this._http.get('https://ipapi.co/'+ip+'/json');//eso me da todos los datos donde estoy
  }

  listar_productos_destacados_publico():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'listar_productos_destacados_publico',{headers:headers});
  }

  listar_productos_nuevos_publico():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'listar_productos_nuevos_publico',{headers:headers});
  }

  registro_cliente(data:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'registro_cliente',data,{headers:headers});
  }

  login_cliente(data:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'login_cliente',data,{headers:headers});
  }

  obtener_cliente_guest(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_cliente_guest/'+id,{headers:headers});
  }

  actualizar_perfil_cliente_guest(id:any,data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url + 'actualizar_perfil_cliente_guest/'+id,data,{headers:headers});
  }

  get_Regiones():Observable<any>{
    return this._http.get('./assets/regiones.json');
  }
  get_Distritos():Observable<any>{
    return this._http.get('./assets/distritos.json');
  }
  get_Procincias():Observable<any>{
    return this._http.get('./assets/provincias.json');
  }
  get_Zonas():Observable<any>{
    return this._http.get('./assets/zonas.json');
  }

  registro_direccion_cliente(data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url + 'registro_direccion_cliente',data,{headers:headers});
  }

  obtener_direccion_todos_cliente(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_direccion_todos_cliente/'+id,{headers:headers});
  }

  cambiar_direccion_principal_cliente(id:any,cliente:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+'cambiar_direccion_principal_cliente/'+id+'/'+cliente,{data:true},{headers:headers});
  }

  eliminar_direccion_cliente(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.delete(this.url+'eliminar_direccion_cliente/'+id,{headers:headers});
  }

  get_categorias():Observable<any>{
    return this._http.get('./assets/categorias.json');
  }

  listar_productos_publico():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'listar_productos_publico',{headers:headers});
  }

  obtener_sexo_productos():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'obtener_sexo_productos',{headers:headers});
  }

  obtener_variedades_productos_cliente(id:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'obtener_variedades_productos_cliente/'+id,{headers:headers});
  }

  obtener_productos_slug_publico(slug:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'obtener_productos_slug_publico/'+slug,{headers:headers});
  }

  listar_productos_recomendados_publico(categoria:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'listar_productos_recomendados_publico/'+categoria,{headers:headers});
  }

  agregar_carrito_cliente(data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'agregar_carrito_cliente',data,{headers:headers});
  }

  obtener_carrito_cliente(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_carrito_cliente/'+id,{headers:headers});
  }

  eliminar_carrito_cliente(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.delete(this.url+'eliminar_carrito_cliente/'+id,{headers:headers});
  }

  pedido_compra_cliente(data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'pedido_compra_cliente',data,{headers:headers});
  }

  obtener_ordenes_cliente(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_ordenes_cliente/'+id,{headers:headers});
  }

  validar_cupon_admin(cupon:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'validar_cupon_admin/'+cupon,{headers:headers});
  }

  obtener_detalles_ordenes_cliente(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_detalles_ordenes_cliente/'+id,{headers:headers});
  }

  emitir_review_producto_cliente(data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'emitir_review_producto_cliente',data,{headers:headers});
  }

  obtener_review_producto_cliente(id:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'obtener_review_producto_cliente/'+id,{headers:headers});
  }

  obtener_reviews_producto_publico(id:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'obtener_reviews_producto_publico/'+id,{headers:headers});
  }

  createToken(data:any):Observable<any>{
    let headers = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('Authorization','Bearer TEST-1950243353246089-020803-3d4bdcd598959b7c388146af8aba9066-83399485'); //el token de mercado pago.. blog explicacion= https://echoslams.com/blog/mercado-pago-usando-su-api-en-angular
    return this._http.post('https://api.mercadopago.com/checkout/preferences',data,{headers:headers});
  }

  consultarIDPago(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'consultarIDPago/'+id,{headers:headers});
  }

  obtenerPago(id:any):Observable<any>{
    let headers = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('Authorization','Bearer TEST-1950243353246089-020803-3d4bdcd598959b7c388146af8aba9066-83399485');
    return this._http.get('https://api.mercadopago.com/v1/payments/'+id,{headers:headers});
  }


  comprobar_carrito_cliente(data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'comprobar_carrito_cliente',data,{headers:headers});
  }

  registro_compra_cliente(data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'registro_compra_cliente',data,{headers:headers});
  }

  obtener_reviews_cliente(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_reviews_cliente/'+id,{headers:headers});
  }

  
  enviar_mensaje_contacto(data:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'enviar_mensaje_contacto',data,{headers:headers});
  }

  obtener_config_admin():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'obtener_config_admin',{headers:headers});
  }
  obtener_variedades_public(): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.get(this.url+'obtener_variedades_public', {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}

  verificar_token(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'verificar_token',{headers:headers});
  }

  listar_productos_recomendados_public(categoria:any): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
   
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'listar_productos_recomendados_public/'+categoria, {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}

  isAuthenticate(){
    const token : any = localStorage.getItem('token');
  
    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(token);

      if(!token){
        localStorage.clear();
        return false;
      }

      if(!decodedToken){
        localStorage.clear();
        return false;
      }
    
      if(helper.isTokenExpired(token)){
        localStorage.clear();
        return false;
      }

    } catch (error) {
      console.log(error);
      
      localStorage.clear();
      return false;
    }

    return true;
  }

  obtener_tapa(): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
   
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'obtener_tapa', {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}

  obtener_parte1(): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
   
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'obtener_parte1', {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}

  obtener_parte2(): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
   
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'obtener_parte2', {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}

  obtener_parte3(): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
   
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'obtener_parte3', {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}

  obtener_admin(): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
   
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'obtener_admin', {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}
  
  obtener_politicas_envio(): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
   
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'obtener_politicas_envio', {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}

  obtener_terminos(): Observable<any>{//va tener de parametros un parametro typo user q tiene el modelo y Observable para poder recoger la informacion
   
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'obtener_terminos', {headers: headers});//retorno la ruta del backend controlador ClienteController con su accion  y la cabezera para q no alla errores
	}

}
