import { Component, OnInit } from '@angular/core';
import { GuestService } from 'src/app/services/guest.service';

@Component({
  selector: 'app-politicas-envio',
  templateUrl: './politicas-envio.component.html',
  styleUrls: ['./politicas-envio.component.css']
})
export class PoliticasEnvioComponent implements OnInit {

  public politicas: any = {};

  constructor(
    private _guestService:GuestService
  ) { }

  ngOnInit(): void {
    this._guestService.obtener_politicas_envio().subscribe(
      response=>{
        this.politicas = response.data;
       
       
      });
  }

}
