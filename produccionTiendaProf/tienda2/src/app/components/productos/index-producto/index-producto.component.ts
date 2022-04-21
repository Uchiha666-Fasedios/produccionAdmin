import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';

declare var noUiSlider:any;
declare var $:any;
import { io } from "socket.io-client";
import { GLOBAL } from 'src/app/services/GLOBA';
import { GuestService } from 'src/app/services/guest.service';
declare var iziToast:any;

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent implements OnInit {

  //GEO
  public geo : any = {};
  public country = '';
  public currency = 'ARS';
  public user_lc : any = undefined;

  public token :any = '';
  public hash:any={};
  public categorias :Array<any> = [];
  public config_global: any = {}
  public filter_cat_tallas = null;
  public filter_precio_max = 0;
  public filter_precio_min = 0;
  public filter_cat_sexo: any = null;
  public filter_category: any = null;
  public mas_vendidos :Array<any> =[];
  public url =GLOBAL.url;

  public productos : Array<any> =[];
  public productos_const : Array<any> =[];
  public prod_sex : Array<any> =[];
  public prod_sex2 : Array<any> =[];
  public prod_tall : Array<any> =[];
  public prod_cat : Array<any> =[];
  public Woman = false;
  public Man = false;
  public Unisex = false;
  public Girl = false;
  public Boy = false;
  public procat: Array<any> =[];
  public procat2: Array<any> =[];
  public arr_objet_talla: Array<any> =[];
  public sort_by = 'Defecto';
  public page = 1;
  public pageSize = 15;

  public route_categoria = '';
  public filtro_search = '';
  public load_data = false;

  constructor(
    private _clienteService:ClienteService,
    private _guestService:GuestService,
    private _route:ActivatedRoute,
    private _router:Router
  ) { 
    let obj_lc :any= localStorage.getItem('user_data');
    this.user_lc = JSON.parse(obj_lc);

    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;

    let lc_geo :any= localStorage.getItem('geo');
    this.geo = JSON.parse(lc_geo);
    this.country = this.geo.country_name;
    this.currency = this.geo.currency;

   /* this._guestService.get_categorias().subscribe(
      response=>{
        this.categorias = response;
        console.log(response);
        
      }
    );*/
    localStorage.removeItem('sexo');
      localStorage.removeItem('talla');
      localStorage.removeItem('precio');
      localStorage.removeItem('categoria');

      this._clienteService.obtener_config_public().subscribe(
            response => {            

        this.config_global=response.data;
        
            },

            error => {
             
              console.log(error);
         
            });

            this._guestService.listar_productos_publico().subscribe(
            response => {  

               for(var item of response.data){
                      this.prod_sex.push(item.producto);
                    }  

               for(var item of this.prod_sex){

     
      
          if(item.sexo == 'Woman'){
            this.Woman = true;
          }else if (item.sexo == 'Man'){
            this.Man = true;
          } else if(item.sexo == 'Unisex'){
            this.Unisex = true;
          }else if(item.sexo == 'Girl'){
            this.Girl = true;
          }else if(item.sexo == 'Boy'){
            this.Boy = true;
          }
          
         
       }

       
            },

            error => {
             
              console.log(error);
         
            });

           


              this._guestService.obtener_variedades_public().subscribe(
            response => {            

        this.procat=response.data;


      
            //ELIMINO DEL OBJETO ARRAY LOS DUPLICADOS
            this.procat = this.procat.filter(o => this.hash[o.valor] ? false : this.hash[o.valor] = true);
            //console.log(this.procat);
        
        for (const iterator of this.procat) {
          var res =iterator.valor.match(/[0123456789]/gi);
          if (!res) {
            
            this.procat2.push(iterator.valor);
          }
        }

        
        
       
       
       
            },

            error => {
             
              console.log(error);
         
            });
  }

  ngOnInit(): void {
    setTimeout(() => {
      var slider : any = document.getElementById('ps-sliderr');

      noUiSlider.create(slider, {
          start: [0, 50000],
          connect: true,
          range: {
              'min': 0,
              'max': 50000
          },
          tooltips: [true,true],
       
      })

      slider.noUiSlider.on('update', function (values:any) {
          $('.ps-slider__min').text(values[0]);
          $('.ps-slider__max').text(values[1]);
      });
      $('.noUi-tooltip').css('font-size','11px');
    }, 150);

    this._guestService.listar_productos_destacados_publico().subscribe(
      response=>{
        this.mas_vendidos = response.data;
      

      }
    );

    this._route.params.subscribe(
      params=>{
        this.route_categoria = params['categoria'];
        
        
        if(this.route_categoria){
           
           
          this.init_prod();
          
        }else{
          this._route.queryParams.subscribe(
            (params: Params)=>{
              this.filtro_search = params.filter;

              if(this.filtro_search){
                console.log(1);
                this.productos = [];
                this._guestService.listar_productos_publico().subscribe(
                  response=>{
                    
                    for(var item of response.data){
                      item.producto.variedades = item.variedades,
                      this.productos.push(item.producto);
                    }
                    this.productos_const = this.productos;
                    
                    var term = new RegExp(this.filtro_search.toString().trim() , 'i');
                    this.productos = this.productos_const.filter(item=>term.test(item.titulo));
                    this.load_data = false;

                  }
                );
              }else{
               


                this.init_prod();

             



              }
            });


          
         
        }//fin else
         
      });

       


  }


  init_prod(){
    console.log(2);

                this.productos = [];
                this._guestService.listar_productos_publico().subscribe(
                  response=>{
        
                    for(var item of response.data){
                      item.producto.variedades = item.variedades,
                      this.productos.push(item.producto);
                      
                    }
                 
                    this.productos_const = this.productos; 
                    
                    
                     
                    this.load_data = false;
               
               if (this.route_categoria) {
                  this.productos = [];
               this.buscar_por_categoria(this.route_categoria);
               }

                  });
  }



     reset(){
        localStorage.removeItem('sexo');
      localStorage.removeItem('talla');
      localStorage.removeItem('precio');
      localStorage.removeItem('categoria');
      this.filter_cat_sexo = null;
      this.filter_cat_tallas = null;
      this.filter_category = null;
      this.filter_precio_max = 0;
      this.filter_precio_min = 0;
      this.buscar_por_categoria('todos');
     }
      
      
  reset_sexo(){
    localStorage.removeItem('sexo');
    this.filter_cat_sexo = null;
    let ls_talla = localStorage.getItem('talla');
    let ls_precio = localStorage.getItem('precio');
    let ls_sexo = localStorage.getItem('sexo');
    let ls_categoria = localStorage.getItem('categoria');
    if(ls_talla){
    this.buscar_por_talla();
    }else if(ls_precio){
    this.buscar_precios();
    }else if(ls_sexo){
    this.buscar_por_sexo(this.filter_cat_sexo);
    }else if(ls_categoria){
    this.buscar_por_categoria(this.filter_category);
    }else{
      this.buscar_por_categoria('todos');
    }
   
  }

  reset_talla(){
     localStorage.removeItem('talla');
    this.filter_cat_tallas = null;
    let ls_talla = localStorage.getItem('talla');
    let ls_precio = localStorage.getItem('precio');
    let ls_sexo = localStorage.getItem('sexo');
    let ls_categoria = localStorage.getItem('categoria');
    if(ls_talla){
    this.buscar_por_talla();
    }else if(ls_precio){
    this.buscar_precios();
    }else if(ls_sexo){
    this.buscar_por_sexo(this.filter_cat_sexo);
    }else if(ls_categoria){
    this.buscar_por_categoria(this.filter_category);
    }else{
      this.buscar_por_categoria('todos');
    }
    
  }
   reset_category(){
    localStorage.removeItem('categoria');
    this.filter_category = null;
    let ls_talla = localStorage.getItem('talla');
    let ls_precio = localStorage.getItem('precio');
    let ls_sexo = localStorage.getItem('sexo');
    let ls_categoria = localStorage.getItem('categoria');
    if(ls_talla){
    this.buscar_por_talla();
    }else if(ls_precio){
    this.buscar_precios();
    }else if(ls_sexo){
    this.buscar_por_sexo(this.filter_cat_sexo);
    }else if(ls_categoria){
    this.buscar_por_categoria(this.filter_category);
    }else{
      this.buscar_por_categoria('todos');
    }
  }
   reset_precio(){
    localStorage.removeItem('precio');
    this.filter_precio_max = 0;
    let ls_talla = localStorage.getItem('talla');
    let ls_precio = localStorage.getItem('precio');
    let ls_sexo = localStorage.getItem('sexo');
    let ls_categoria = localStorage.getItem('categoria');
    if(ls_talla){
    this.buscar_por_talla();
    }else if(ls_precio){
    this.buscar_precios();
    }else if(ls_sexo){
    this.buscar_por_sexo(this.filter_cat_sexo);
    }else if(ls_categoria){
    this.buscar_por_categoria(this.filter_category);
    }else{
      this.buscar_por_categoria('todos');
    }
  }

  //FILTRO POR SEXO
  
  buscar_por_sexo(sex:any){
     let ls_talla = localStorage.getItem('talla');
    let ls_precio = localStorage.getItem('precio');
    let ls_sexo = localStorage.getItem('sexo');
    let ls_categoria = localStorage.getItem('categoria');

   this.productos = [];
   this.filter_cat_sexo = sex;
   if(ls_sexo == null){
             this.productos = this.productos_const.filter(item=>item.sexo==sex);
              localStorage.setItem('sexo',JSON.stringify(this.productos));
        
          }else{

                 localStorage.removeItem('sexo');
       this.productos = this.productos_const.filter(item=>item.sexo==sex);
      
      localStorage.setItem('sexo',JSON.stringify(this.productos));
          }

      //elige talla  
      if (ls_talla != null && ls_categoria == null && ls_precio == null) {
        this.productos = [];
      
      for(var item of this.productos_const){
        if (item.sexo == sex) {
          
        for(var subitem of item.variedades){//las variedades son las tallas
          if(subitem.valor == this.filter_cat_tallas){
            this.productos.push(item);
           
                  }
          
               }
           }
      }
     
      //elige categoria
        }else if(ls_categoria != null && ls_talla == null && ls_precio == null){
        this.productos = [];
     
      for(var item of this.productos_const){
        if (item.categoria == this.filter_category && item.sexo == sex) {
    
            this.productos.push(item);
          
        }
      }
      //elige precio
      }else if(ls_precio != null && ls_talla == null && ls_categoria == null){
         this.productos=[];
        


            this.productos = this.productos_const.filter((item)=>{
            //console.log(this.filter_precio_max,this.filter_precio_min);
            
            return item.sexo == sex &&
                   item.precio >= this.filter_precio_min &&
                   item.precio <= this.filter_precio_max
          });
          //elige precio y talla
      }else if(ls_precio != null && ls_talla != null && ls_categoria == null){
         this.prod_tall=[];
         this.productos=[];
         for(var item of this.productos_const){
        if (item.sexo == sex) {
          
        for(var subitem of item.variedades){//las variedades son las tallas
          if(subitem.valor == this.filter_cat_tallas){
            this.prod_tall.push(item);
           
                                             }
          
                                 }
             }
      }

        this.productos = this.prod_tall.filter((item)=>{
            //console.log(this.filter_precio_max,this.filter_precio_min);
            
            return item.precio >= this.filter_precio_min &&
                   item.precio <= this.filter_precio_max
          });
          
       //elige precio talla y categoria
      }else if(ls_precio != null && ls_talla != null && ls_categoria != null){

          this.prod_tall=[];
          this.productos=[];
          
         for(var item of this.productos_const){
        if (item.categoria == this.filter_category && item.sexo == sex) {
          
        for(var subitem of item.variedades){//las variedades son las tallas

          if(subitem.valor == this.filter_cat_tallas){
            
            this.prod_tall.push(item);
           
          }
          
        }
        }
        }
       
        this.productos = this.prod_tall.filter((item)=>{
            //console.log(this.filter_precio_max,this.filter_precio_min);
            
            return item.precio >= this.filter_precio_min &&
                   item.precio <= this.filter_precio_max
          });

          //elige precio y categoria
      }else if(ls_precio != null && ls_categoria != null && ls_talla == null){

      this.productos = [];
      this.prod_cat=[];
     
      for(var item of this.productos_const){
        if (item.categoria == this.filter_category && item.sexo == sex) {
    
            this.prod_cat.push(item);
          
        }
      }

         this.productos = this.prod_cat.filter((item)=>{
            //console.log(this.filter_precio_max,this.filter_precio_min);
            
            return item.precio >= this.filter_precio_min &&
                   item.precio <= this.filter_precio_max
          });

     //talla y category
      }else if(ls_talla != null && ls_categoria != null){

       
          this.productos=[];
          
         for(var item of this.productos_const){
        if (item.categoria == this.filter_category && item.sexo == sex) {
          
        for(var subitem of item.variedades){//las variedades son las tallas

          if(subitem.valor == this.filter_cat_tallas){
            
            this.productos.push(item);
           
          }
          
        }
        }
        }
       
        

          
      }



  }

  //FILTRO POR CATEGORIA

  buscar_por_categoria(cat:any){
    let ls_talla = localStorage.getItem('talla');
    let ls_precio = localStorage.getItem('precio');
    let ls_sexo = localStorage.getItem('sexo');
    let ls_categoria = localStorage.getItem('categoria');
    this.filter_category=cat;
    this.productos = [];
    if(cat == 'todos'){
      localStorage.removeItem('sexo');
      localStorage.removeItem('talla');
      localStorage.removeItem('precio');
      this.productos = this.productos_const;
      this._router.navigate(['/productos']);
    }else{
      
          if(ls_categoria == null){
             this.productos = this.productos_const.filter(item=>item.categoria==cat);
              localStorage.setItem('categoria',JSON.stringify(this.productos));
        
          }else{
            localStorage.removeItem('categoria');
       this.productos = this.productos_const.filter(item=>item.categoria==cat);
      
      localStorage.setItem('categoria',JSON.stringify(this.productos));
          }
      
     //elige talla  
      if (ls_talla != null && ls_sexo == null && ls_precio == null) {
        this.productos = [];
      
      for(var item of this.productos_const){
        if (item.categoria == cat) {
          
        for(var subitem of item.variedades){//las variedades son las tallas
          if(subitem.valor == this.filter_cat_tallas){
            this.productos.push(item);
           
          }
          
        }
        }
      }
     
      //elige sexo
        }else if(ls_sexo != null && ls_talla == null && ls_precio == null){
        this.productos = [];
     
      for(var item of this.productos_const){
        if (item.categoria == cat && item.sexo == this.filter_cat_sexo) {
    
            this.productos.push(item);
          
        }
      }
      //elige precio
      }else if(ls_precio != null && ls_talla == null && ls_sexo == null){
         this.productos=[];
        

            this.productos = this.productos_const.filter((item)=>{
            //console.log(this.filter_precio_max,this.filter_precio_min);
            
            return item.categoria == cat &&
                   item.precio >= this.filter_precio_min &&
                   item.precio <= this.filter_precio_max
          });
      //elige precio y talla
      }else if(ls_precio != null && ls_talla != null && ls_sexo == null){
         this.prod_tall=[];
         this.productos=[];
         for(var item of this.productos_const){
        if (item.categoria == cat) {
          
        for(var subitem of item.variedades){//las variedades son las tallas
          if(subitem.valor == this.filter_cat_tallas){
            this.prod_tall.push(item);
           
          }
          
        }
        }
      }

        this.productos = this.prod_tall.filter((item)=>{
            //console.log(this.filter_precio_max,this.filter_precio_min);
            
            return item.precio >= this.filter_precio_min &&
                   item.precio <= this.filter_precio_max
          });
           //elige precio talla y sexo
      }else if(ls_precio != null && ls_talla != null && ls_sexo != null){

          this.prod_tall=[];
          this.productos=[];
          
         for(var item of this.productos_const){
        if (item.categoria == cat) {
          
        for(var subitem of item.variedades){//las variedades son las tallas

          if(subitem.valor == this.filter_cat_tallas){
            
            this.prod_tall.push(item);
           
          }
          
        }
        }
        }

          
       
        this.productos = this.prod_tall.filter((item)=>{
            //console.log(this.filter_precio_max,this.filter_precio_min);
            
            return item.sexo == this.filter_cat_sexo && 
                   item.precio >= this.filter_precio_min &&
                   item.precio <= this.filter_precio_max
          });

        //elige precio y sexo
      }else if(ls_precio != null && ls_sexo != null && ls_talla == null){

      this.productos = [];
      this.prod_sex2=[];
     
      for(var item of this.productos_const){
        if (item.categoria == cat && item.sexo == this.filter_cat_sexo) {
    
            this.prod_sex2.push(item);
          
        }
      }

         this.productos = this.prod_sex2.filter((item)=>{
            //console.log(this.filter_precio_max,this.filter_precio_min);
            
            return item.precio >= this.filter_precio_min &&
                   item.precio <= this.filter_precio_max
          });
      }else if(ls_talla != null && ls_sexo != null && ls_precio == null){

          this.prod_tall=[];
          this.productos=[];
          
         for(var item of this.productos_const){
        if (item.categoria == cat && item.sexo == this.filter_cat_sexo) {
          
        for(var subitem of item.variedades){//las variedades son las tallas

          if(subitem.valor == this.filter_cat_tallas){
            
            this.productos.push(item);
           
          }
          
        }
        }
        }

        
      }
 
    
    }//fin del else que abarca los filtros
  
  
  }



//FILTRO POR TALLA
  buscar_por_talla(){
    let ls_talla = localStorage.getItem('talla');
    let ls_precio = localStorage.getItem('precio');
    let ls_sexo = localStorage.getItem('sexo');
    let ls_categoria = localStorage.getItem('categoria');
    this.productos = [];
    if(this.filter_cat_tallas == 'todos'){
      this.productos = this.productos_const;
    }else{
          if(ls_talla == null){
           
             
      for(var item of this.productos_const){

        for(var subitem of item.variedades){//las variedades son las tallas
          if(subitem.valor == this.filter_cat_tallas){
            this.productos.push(item);
           
          }
          
        }
      }
        localStorage.setItem('talla',JSON.stringify(this.productos));
      
            
          }else{
            localStorage.removeItem('talla');
              
      for(var item of this.productos_const){

        for(var subitem of item.variedades){//las variedades son las tallas
          if(subitem.valor == this.filter_cat_tallas){
            this.productos.push(item);
           
          }
          
        }
      }
      
      localStorage.setItem('talla',JSON.stringify(this.productos));
            
          }



         //elige categoria  
      if (ls_categoria != null && ls_sexo == null && ls_precio == null) {
        this.productos = [];
      
      for(var item of this.productos_const){
        if (item.categoria == this.filter_category) {
          
        for(var subitem of item.variedades){//las variedades son las tallas
          if(subitem.valor == this.filter_cat_tallas){
            this.productos.push(item);
           
          }
          
        }
        }
      }
     
      //elige sexo
        }else if(ls_sexo != null && ls_categoria == null && ls_precio == null){
        this.productos = [];
     
      for(var item of this.productos_const){
        if (item.sexo == this.filter_cat_sexo) {
          
        for(var subitem of item.variedades){//las variedades son las tallas
          if(subitem.valor == this.filter_cat_tallas){
            this.productos.push(item);
           
          }
          
        }
        }
      }
      //elige precio
      }else if(ls_precio != null && ls_categoria == null && ls_sexo == null){

         this.productos=[];
        this.prod_tall=[];

      for(var item of this.productos_const){
          
        for(var subitem of item.variedades){//las variedades son las tallas
          if(subitem.valor == this.filter_cat_tallas){
            this.prod_tall.push(item);
           
          }
          
        }
        
      }

            this.productos = this.prod_tall.filter((item)=>{
            //console.log(this.filter_precio_max,this.filter_precio_min);
            
            return item.precio >= this.filter_precio_min &&
                   item.precio <= this.filter_precio_max
          });
      //elige precio y categoria
      }else if(ls_precio != null && ls_categoria != null && ls_sexo == null){
         this.prod_tall=[];
         this.productos=[];
         for(var item of this.productos_const){
        if (item.categoria == this.filter_category) {
          
        for(var subitem of item.variedades){//las variedades son las tallas
          if(subitem.valor == this.filter_cat_tallas){
            this.prod_tall.push(item);
           
          }
          
        }
        }
      }

        this.productos = this.prod_tall.filter((item)=>{
            //console.log(this.filter_precio_max,this.filter_precio_min);
            
            return item.precio >= this.filter_precio_min &&
                   item.precio <= this.filter_precio_max
          });
           //elige precio categoria y sexo
      }else if(ls_precio != null && ls_categoria != null && ls_sexo != null){

          this.prod_tall=[];
          this.productos=[];
          
         for(var item of this.productos_const){
        if (item.categoria == this.filter_category) {
          
        for(var subitem of item.variedades){//las variedades son las tallas

          if(subitem.valor == this.filter_cat_tallas){
            
            this.prod_tall.push(item);
           
          }
          
        }
        }
        }

          
       
        this.productos = this.prod_tall.filter((item)=>{
            //console.log(this.filter_precio_max,this.filter_precio_min);
            
            return item.sexo == this.filter_cat_sexo && 
                   item.precio >= this.filter_precio_min &&
                   item.precio <= this.filter_precio_max
          });

        //elige precio y sexo
      }else if(ls_precio != null && ls_sexo != null && ls_categoria == null){

      this.productos = [];
      this.prod_tall=[];

       for(var item of this.productos_const){
        if (item.sexo == this.filter_cat_sexo) {
          
        for(var subitem of item.variedades){//las variedades son las tallas

          if(subitem.valor == this.filter_cat_tallas){
            
            this.prod_tall.push(item);
           
          }
          
        }
        }
        }
      
         this.productos = this.prod_tall.filter((item)=>{
            //console.log(this.filter_precio_max,this.filter_precio_min);
            
            return item.precio >= this.filter_precio_min &&
                   item.precio <= this.filter_precio_max
          });
      }else if(ls_categoria != null && ls_sexo != null && ls_precio == null){

          this.prod_tall=[];
          this.productos=[];
          
         for(var item of this.productos_const){
        if (item.categoria == this.filter_category && item.sexo == this.filter_cat_sexo) {
          
        for(var subitem of item.variedades){//las variedades son las tallas

          if(subitem.valor == this.filter_cat_tallas){
            
            this.productos.push(item);
           
          }
          
        }
        }
        }

          
      
      }


     
    }//fin del else q contiene los filtros
  }

//FILTRO POR PRECIO

  buscar_precios(){
    let ls_talla = localStorage.getItem('talla');
    let ls_precio = localStorage.getItem('precio');
    let ls_sexo = localStorage.getItem('sexo');
    let ls_categoria = localStorage.getItem('categoria');
          if(ls_precio == null){
           
             let min =  parseInt($('.ps-slider__min').text());
    let max = parseInt($('.ps-slider__max').text());
    this.productos = this.productos_const.filter((item)=>{
      this.filter_precio_max=max;
      this.filter_precio_min=min;
      
      return item.precio >= min &&
              item.precio <= max
    });
      
    localStorage.setItem('precio',JSON.stringify(this.productos));
      
            
          }else{
            localStorage.removeItem('precio');

          let min =  parseInt($('.ps-slider__min').text());
    let max = parseInt($('.ps-slider__max').text());
    this.productos = this.productos_const.filter((item)=>{
      this.filter_precio_max=max;
      this.filter_precio_min=min;
      
      return item.precio >= min &&
              item.precio <= max
    });
      
      localStorage.setItem('precio',JSON.stringify(this.productos));
            
          }



      //elige categoria  
      if (ls_categoria != null && ls_sexo == null && ls_talla == null) {
        this.productos = [];
      
      

         this.productos = this.productos_const.filter((item)=>{
            //console.log(this.filter_precio_max,this.filter_precio_min);
            
            return item.categoria == this.filter_category &&
                   item.precio >= this.filter_precio_min &&
                   item.precio <= this.filter_precio_max
          });
     
      //elige sexo
        }else if(ls_sexo != null && ls_categoria == null && ls_talla == null){
        this.productos = [];
     
       this.productos = this.productos_const.filter((item)=>{
            //console.log(this.filter_precio_max,this.filter_precio_min);
            
            return item.sexo == this.filter_cat_sexo &&
                   item.precio >= this.filter_precio_min &&
                   item.precio <= this.filter_precio_max
          });
      //elige talla
      }else if(ls_talla != null && ls_categoria == null && ls_sexo == null){

         this.productos=[];
        this.prod_tall=[];

      for(var item of this.productos_const){
          
        for(var subitem of item.variedades){//las variedades son las tallas
          if(subitem.valor == this.filter_cat_tallas){
            this.prod_tall.push(item);
           
          }
          
        }
        
      }

            this.productos = this.prod_tall.filter((item)=>{
            //console.log(this.filter_precio_max,this.filter_precio_min);
            
            return item.precio >= this.filter_precio_min &&
                   item.precio <= this.filter_precio_max
          });
      //elige talla y categoria
      }else if(ls_talla != null && ls_categoria != null && ls_sexo == null){
         this.prod_tall=[];
         this.productos=[];
         for(var item of this.productos_const){
        if (item.categoria == this.filter_category) {
          
        for(var subitem of item.variedades){//las variedades son las tallas
          if(subitem.valor == this.filter_cat_tallas){
            this.prod_tall.push(item);
           
          }
          
        }
        }
      }

        this.productos = this.prod_tall.filter((item)=>{
            //console.log(this.filter_precio_max,this.filter_precio_min);
            
            return item.precio >= this.filter_precio_min &&
                   item.precio <= this.filter_precio_max
          });
           //elige talla categoria y sexo
      }else if(ls_talla != null && ls_categoria != null && ls_sexo != null){

          this.prod_tall=[];
          this.productos=[];
          
         for(var item of this.productos_const){
        if (item.categoria == this.filter_category) {
          
        for(var subitem of item.variedades){//las variedades son las tallas

          if(subitem.valor == this.filter_cat_tallas){
            
            this.prod_tall.push(item);
           
          }
          
        }
        }
        }

          
       
        this.productos = this.prod_tall.filter((item)=>{
            //console.log(this.filter_precio_max,this.filter_precio_min);
            
            return item.sexo == this.filter_cat_sexo && 
                   item.precio >= this.filter_precio_min &&
                   item.precio <= this.filter_precio_max
          });

        //elige talla y sexo
      }else if(ls_talla != null && ls_sexo != null && ls_categoria == null){

      this.productos = [];
      this.prod_tall=[];

       for(var item of this.productos_const){
        if (item.sexo == this.filter_cat_sexo) {
          
        for(var subitem of item.variedades){//las variedades son las tallas

          if(subitem.valor == this.filter_cat_tallas){
            
            this.prod_tall.push(item);
           
          }
          
        }
        }
        }
      
         this.productos = this.prod_tall.filter((item)=>{
            //console.log(this.filter_precio_max,this.filter_precio_min);
          
            
            return item.precio >= this.filter_precio_min &&
                   item.precio <= this.filter_precio_max
          });
      }else if(ls_categoria != null && ls_sexo != null && ls_talla == null){

          
          this.productos=[];
          
         
        this.productos = this.productos_const.filter((item)=>{
            //console.log(this.filter_precio_max,this.filter_precio_min);
            
            return item.sexo == this.filter_cat_sexo &&
                   item.categoria == this.filter_category && 
                   item.precio >= this.filter_precio_min &&
                   item.precio <= this.filter_precio_max
          });

        //elige talla y sexo
      }


       
    

  }

  

  orden_por(){
    if(this.sort_by == 'Defecto'){

      this.productos = this.productos_const;
    }else if(this.sort_by == '+-Precio'){
      this.productos.sort(function (a, b) {
        
        if (a.precio < b.precio) {
          return 1;
        }
        if (a.precio > b.precio) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    }else if(this.sort_by == '-+Precio'){
      this.productos.sort(function (a, b) {
        
        if (a.precio > b.precio) {
          return 1;
        }
        if (a.precio < b.precio) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    }else if(this.sort_by == 'azTitulo'){
      this.productos.sort(function (a, b) {
        
        if (a.titulo > b.titulo) {
          return 1;
        }
        if (a.titulo < b.titulo) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    }else if(this.sort_by == 'zaTitulo'){
      this.productos.sort(function (a, b) {
        
        if (a.titulo < b.titulo) {
          return 1;
        }
        if (a.titulo > b.titulo) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    }
  }

  agregar_producto(producto:any){}

  agregar_producto_guest(producto:any){}
}
