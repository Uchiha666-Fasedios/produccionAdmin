import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuestService } from 'src/app/services/guest.service';
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {

  public cliente : any = {};
  public id :any = '';
  public token :any = '';
  public lenguaje : any = {};

  constructor(
    private _guestService:GuestService,
    private _router:Router
  ) { 
    this.id = localStorage.getItem('_id');
    this.token = localStorage.getItem('token');
    let len :any= localStorage.getItem('lenguaje');
    this.lenguaje = JSON.parse(len);

    if(this.id){
      this._guestService.obtener_cliente_guest(this.id,this.token).subscribe(
        response=>{
          this.cliente = response.data;
        }
      );
    }
  }

  ngOnInit(): void {
  }

  actualizar(actualizarForm:any){
    if(actualizarForm.valid){
      this.cliente.password = $('#input_password').val();
      this._guestService.actualizar_perfil_cliente_guest(this.id,this.cliente,this.token).subscribe(
        response=>{
          
          if(this.lenguaje == 'es'){
            iziToast.show({
              title: 'SUCCESS',
              titleColor: '#1DC74C',
              color: '#FFF',
              class: 'text-success',
              position: 'topRight',
              message: 'Se actualizo su perfil correctamente.'
          });
          }else{
            iziToast.show({
              title: 'SUCCESS',
              titleColor: '#1DC74C',
              color: '#FFF',
              class: 'text-success',
              position: 'topRight',
              message: 'Your profile has been successfully updated.'
          });
          }
        }
      );
      
    }else{
      if(this.lenguaje == 'es'){
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'Los datos del formulario no son validos.'
      });
      }else{
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'The form data is not valid.'
      });
      }

      
    }
  }

}
