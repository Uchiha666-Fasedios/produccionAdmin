import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StarRatingComponent } from 'ng-starrating';
import { GLOBAL } from 'src/app/services/GLOBA';
import { GuestService } from 'src/app/services/guest.service';
import { ClienteService } from '../../../services/cliente.service';

declare var iziToast:any;

@Component({
  selector: 'app-dpedidos',
  templateUrl: './dpedidos.component.html',
  styleUrls: ['./dpedidos.component.css']
})
export class DpedidosComponent implements OnInit {

  public url = GLOBAL.url;
  public token = localStorage.getItem('token');
  public orden : any = {};
  public config_global: any = {}
  public detalles : Array<any> = [];
  public variedades : Array<any> = [];
  public load_data = true;
  public id = '';
  public admin: any = {};
  public lenguaje : any = {};

  public totalstar = 5;

  public review : any = {};

  constructor(
    private _guestService:GuestService,
    private _clienteService:ClienteService,
    private _route:ActivatedRoute,
    private _router:Router
  ) { 
    let len :any= localStorage.getItem('lenguaje');
    this.lenguaje = JSON.parse(len);
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        this.init_data();
      }
    );
  }

  ngOnInit(): void {
    this._guestService.obtener_admin().subscribe(
      response=>{
        this.admin = response.data;
       
        
      })

      this._clienteService.obtener_config_public().subscribe(
        response => {            

    this.config_global=response.data;
    console.log(this.config_global);
        },

        error => {
         
          console.log(error);
     
        });
  }

  init_data(){
    this._guestService.obtener_detalles_ordenes_cliente(this.id,this.token).subscribe(
      response=>{
       
        
        this.variedades = response.variedades;
        
        if(response.data != undefined){
          this.orden = response.data;
         
        
          response.detalles.forEach((element:any) => {
              this._guestService.obtener_review_producto_cliente(element.producto._id).subscribe(
                response=>{
                 
                  let emitido = false;
                  response.data.forEach((element_:any) => {
                     if(element_.cliente == localStorage.getItem('_id')){
                      emitido = true;
                     }
                  });
                  element.estado = emitido;
                }
              );
          });
          this.detalles = response.detalles;
          
          this.load_data = false;
        }else{
          this.orden = undefined;
        }
       
        

      }
    );
  }

  openModal(item:any){
    this.review = {};
    this.review.producto = item.producto._id;
    this.review.cliente = item.cliente;
    this.review.venta = this.id;

}

  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}){
    
    this.review.estrellas = $event.newValue;
    
    
  }

  emitir(id:any){
    if(this.review.review){
      if(this.review.estrellas && this.review.estrellas >= 0){
       
        
        this._guestService.emitir_review_producto_cliente(this.review,this.token).subscribe(
          response=>{
            
            if(this.lenguaje == 'es'){
              iziToast.show({
                title: 'SUCCESS',
                titleColor: '#1DC74C',
                color: '#FFF',
                class: 'text-success',
                position: 'topRight',
                message: 'Se emitio correctamente la reseña.'
            });
            }else{
              iziToast.show({
                title: 'SUCCESS',
                titleColor: '#1DC74C',
                color: '#FFF',
                class: 'text-success',
                position: 'topRight',
                message: 'The review was issued successfully.'
            });
            }


            window.location.reload();
          });
        
      }else{
       
        if(this.lenguaje == 'es'){
          iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: 'Seleccione el numero de estrellas.'
        });
        }else{
          iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: 'Select the number of stars.'
        });
        }


      }
    }else{

      if(this.lenguaje == 'es'){
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'Ingrese un mensaje de la reseña.'
      });
      }else{
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'Enter a review message.'
      });
      }
    }
  }
}
