import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descuento'
})
export class DescuentoPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {//este pipe se llama desde index-producto al value le llega el precio y el args le llega el array entero
  let descuento = Math.round(value - (value*args[0])/100);//Math.round lo redondeo ..el precio menos * esa posicion q es el porsentaje / cien 
    
    
    return descuento;
  }

}

