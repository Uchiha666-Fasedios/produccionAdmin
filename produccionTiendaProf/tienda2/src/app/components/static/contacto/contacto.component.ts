import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuestService } from 'src/app/services/guest.service';
declare var iziToast:any;

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  public contacto: any = {};
  public load_btn = false;
  public admin: any = {};
  public lenguaje : any = {};
  constructor(
    private _guestService:GuestService,
    private _router:Router
  ) { 

    let len :any= localStorage.getItem('lenguaje');
    this.lenguaje = JSON.parse(len);
  }


  ngOnInit(): void {

    this._guestService.obtener_admin().subscribe(
      response=>{
        this.admin = response.data;
       
        
      });
  }
  registro(registroForm:any){
    if(registroForm.valid){
      this.load_btn = true;
      this._guestService.enviar_mensaje_contacto(this.contacto).subscribe(
        response=>{
         
          if(this.lenguaje == 'es'){
            iziToast.show({
              title: 'SUCCESS',
              titleColor: '#1DC74C',
              color: '#FFF',
              class: 'text-success',
              position: 'topRight',
              message: 'Se envió correctamente el mensaje.'
          });
          }else{
            iziToast.show({
              title: 'SUCCESS',
              titleColor: '#1DC74C',
              color: '#FFF',
              class: 'text-success',
              position: 'topRight',
              message: 'The message was sent successfully.'
          });
          }
          this.contacto = {};
          this.load_btn = false;
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
