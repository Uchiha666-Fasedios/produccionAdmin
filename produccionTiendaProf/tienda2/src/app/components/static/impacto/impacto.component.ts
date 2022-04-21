import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/services/GLOBA';
import { GuestService } from 'src/app/services/guest.service';

@Component({
  selector: 'app-impacto',
  templateUrl: './impacto.component.html',
  styleUrls: ['./impacto.component.css']
})
export class ImpactoComponent implements OnInit {

  public parte2: any = {};
  public url = GLOBAL.url;
  constructor(
    private _guestService:GuestService
  ) { 

    this._guestService.obtener_parte2().subscribe(
      response=>{
        this.parte2 = response.data;
       
        
      });
  }

  ngOnInit(): void {
  }

}
