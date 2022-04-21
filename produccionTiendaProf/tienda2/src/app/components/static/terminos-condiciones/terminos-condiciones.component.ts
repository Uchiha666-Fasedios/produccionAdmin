import { Component, OnInit } from '@angular/core';
import { GuestService } from 'src/app/services/guest.service';

@Component({
  selector: 'app-terminos-condiciones',
  templateUrl: './terminos-condiciones.component.html',
  styleUrls: ['./terminos-condiciones.component.css']
})
export class TerminosCondicionesComponent implements OnInit {
  public parte1: any = {
    titulo0:''
  };
  public parte2: any = {};
  public parte3: any = {};
  public terminos: any = {};
  constructor(
    private _guestService:GuestService
  ) { }

  ngOnInit(): void {
    this._guestService.obtener_terminos().subscribe(
      response=>{
        this.terminos = response.data;
       
       
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
  }

}
