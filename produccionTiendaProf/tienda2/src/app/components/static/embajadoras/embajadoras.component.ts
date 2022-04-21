import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/services/GLOBA';
import { GuestService } from 'src/app/services/guest.service';

@Component({
  selector: 'app-embajadoras',
  templateUrl: './embajadoras.component.html',
  styleUrls: ['./embajadoras.component.css']
})
export class EmbajadorasComponent implements OnInit {

  public parte3: any = {};
  public url = GLOBAL.url;
  constructor(
    private _guestService:GuestService
  ) { 

    this._guestService.obtener_parte3().subscribe(
      response=>{
        this.parte3 = response.data;
       
        
      });
  }

  ngOnInit(): void {
  }

}
