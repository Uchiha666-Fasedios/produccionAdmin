import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/services/GLOBA';
import { GuestService } from 'src/app/services/guest.service';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent implements OnInit {

  public parte1: any = {};
  public url = GLOBAL.url;
  constructor(
    private _guestService:GuestService
  ) { 

    this._guestService.obtener_parte1().subscribe(
      response=>{
        this.parte1 = response.data;
        
        
      });
  }

  ngOnInit(): void {
  }

}
