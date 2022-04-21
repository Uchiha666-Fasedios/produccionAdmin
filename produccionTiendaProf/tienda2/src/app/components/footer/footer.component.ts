import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GuestService } from 'src/app/services/guest.service';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public config_global : any = {};

  public geo : any = {};
  public len : any = {};
  public country = '';
  public currency = 'ARS';
  public categorias :Array<any> = [];
  public activeLang = 'es';

  public parte1: any = {};
public parte2: any = {};
public parte3: any = {};
public politicas: any = {};
public terminos: any = {};

  constructor(

    private _router:Router,
    private translate: TranslateService,
    private _guestService:GuestService,
    private _clienteService:ClienteService,
  ) { 
 
    let lc_geo :any= localStorage.getItem('geo');
    this.geo = JSON.parse(lc_geo);
    this.country = this.geo.country_name;
    this.currency = this.geo.currency;
    this.translate.setDefaultLang(this.activeLang);
  }

  ngOnInit(): void {

    this._clienteService.obtener_config_public().subscribe(
      response => {            

  this.config_global=response.data;
  //console.log(this.config_global.lenguaje);
  if (this.config_global.lenguaje) {
    this.translate.setDefaultLang(this.config_global.lenguaje);
  }

      },

      error => {
       
        console.log(error);
   
      });
    
      this._guestService.obtener_parte1().subscribe(
        response=>{
          this.parte1 = response.data;
          
          
        });

        this._guestService.obtener_parte2().subscribe(
          response=>{
            this.parte2 = response.data;
           
            
          });

          this._guestService.obtener_parte3().subscribe(
            response=>{
              this.parte3 = response.data;
             
              
            });

            this._guestService.obtener_politicas_envio().subscribe(
              response=>{
                this.politicas = response.data;
               
               
              });

              this._guestService.obtener_terminos().subscribe(
                response=>{
                  this.terminos = response.data;
                 
                 
                });

                if(localStorage.getItem('lenguaje')){
                  let lenguaje :any= localStorage.getItem('lenguaje');
                  this.len = JSON.parse(lenguaje);
                  this.translate.setDefaultLang(this.len);
                  this.activeLang=this.len;
                }

                
  }

  public cambiarLenguaje() {
    localStorage.removeItem('lenguaje');
    localStorage.setItem('lenguaje',JSON.stringify(this.activeLang));
    this.translate.use(this.activeLang);
  }

}
