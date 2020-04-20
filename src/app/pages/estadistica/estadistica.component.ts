import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Estadistica} from '../../models/estadistica';
import {Router} from '@angular/router';
import {Routes} from '../../enums/routes.enum';
import {EstadisticaService} from '../../provider/estadistica/estadistica.service';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss']
})
export class EstadisticaComponent implements OnInit {

  public model: Estadistica;
  public routes = Routes;
  subCategorias: any[] = [];


  public doughnutChartLabels = ['Productos', 'Servicios'];
  public doughnutChartData = [1,10];
  public doughnutChartType = 'doughnut';
  public doughnutTitle= "hola";

  
  //////////////////BARRAS GRAFICAS
    public barChartOptions = {
      scaleShowVerticalLines: true,
      responsive: true,
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
    };
    public barChartLabels = [];
    public barChartType = 'bar';
    public barChartLegend = true;
    public barChartData = [];
  ///FIN-BARRAS  

  //SERVICIO BARRAS
  public listaProductos = [];
  public listaCantProductos = [];
  public listaProductosCotiza = [];
  public listaCantProductosCotiza = [];

    
  public otroIndice = 0;
  public otroIndice2 = 0;
  constructor(private Estadistica: EstadisticaService, private router: Router) { }

  //radar
  public listCanCotizados = [];
  public radarChartLabels = ['REGISTERED', 'IN_REQUEST', 'IN_QUOTATION', 'FINISHED'];
  public radarChartCantProd = [0, 0, 0, 0];
  public radarChartCantServ = [0, 0, 0, 0];
  public radarChartType = 'radar';
  public radarChartData = [];

  //PIE
  public listaDesProductosCotiza = [];
  public listaVlrProductosCotiza = [];
  
  public pieChartLabels = [0,0,0,0,0,0,0];
  public pieChartData = [0,0,0,0,0,0,0,0];
  public contador = 0;

  ngOnInit(): void {
    //Obtenemos las sub categorias de los productos
    this.Estadistica.getUsers( ).subscribe(
        (data) => { // Success
          var cantidadDeProductos = data[0].subCategories.length ;
          var cantidadDeServicios = data[1].subCategories.length ;
          this.doughnutChartData = [ cantidadDeProductos , cantidadDeServicios ];
        },
        (error) => {
          console.error(error);
        }
    );
    //------------------------------------------------------------------------------------------
    //                                    BARRAS
    //------------------------------------------------------------------------------------------

    //--------------INICIO PRODUCTOS SOLICITADOS------------------
    this.Estadistica.getSolicitudesPorCategoria( 1 ).subscribe(
      (data) => {  
        this.listaProductos = [];
       this.listaCantProductos = [];
       this.listaProductosCotiza = [];
       this.listaCantProductosCotiza = [];

        for( var i = 0; i<data.length; i++){
          for( var j = 0; j< data[i].details.length; j++){
            var indice = this.listaProductos.indexOf( data[i].details[j].productDescription);
             if ( indice <0 ) {
              this.listaProductos[ this.otroIndice ] = data[i].details[j].productDescription;
              this.listaCantProductos[ this.otroIndice++ ] = data[i].details[j].quantity;
            }else{
              this.listaCantProductos[ indice ] += data[i].details[j].quantity;
            }
          }
        }
        
      },
      (error) => {
        console.error(error);
      }
    );
    //--------------FIN PRODUCTOS SOLICITADOS------------------
     
    //--------------INICIO SERVICIOS SOLICITADOS------------------  
      this.Estadistica.getSolicitudesPorCategoria( 2 ).subscribe(
        (data) => {
          for( var i = 0; i<data.length; i++){
            for( var j = 0; j< data[i].details.length; j++){
              var indice =  this.listaProductos.indexOf( data[i].details[j].productDescription);
              if ( indice < 0) {
                this.listaProductos[ this.otroIndice ] = data[i].details[j].productDescription;
                this.listaCantProductos[ this.otroIndice++ ] = data[i].details[j].quantity;
              }else{
                this.listaCantProductos[ indice ] += data[i].details[j].quantity;
              }
            }
          }
          var lista = [];
          for(var i = 0; i< this.listaCantProductos.length;i++){
            var indice =  this.listaProductosCotiza.indexOf( this.listaProductos[i] );
            if(indice>=0){
              lista[i] = this.listaCantProductosCotiza[ indice];
            }else{
              lista[i] = 0;
            }
          }
          this.barChartLabels = this.listaProductos;
          this.barChartData = [
            {data: this.listaCantProductos, label: 'Solicitados'},
            {data: lista, label: 'Cotizados'}
          ];
        },
        (error) => {
          console.error(error);
        }
      );
      //--------------FIN SERVICIOS SOLICITADOS------------------

      //--------------INICIO PRODUCTOS COTIZADOS------------------
      
      this.Estadistica.getCotizacionesPorCategoria( 1 ).subscribe(
        (data) => { // Success   
          console.error("*INICIO PRODUCTOS COTIZADOS*");    
          for( var i = 0; i<data.length; i++){
            for( var j = 0; j< data[i].details.length; j++){ 
              var indice =  this.listaProductos.indexOf( data[i].details[j].productDescription);

             if(indice>=0){
                this.listaProductosCotiza[ indice] = data[i].details[j].productDescription;
                
                if(this.listaCantProductosCotiza[ indice] == null){
                  this.listaCantProductosCotiza[ indice] = data[i].details[j].quantity;
                }else{
                  this.listaCantProductosCotiza[ indice] += data[i].details[j].quantity;
                } 
              }
            }
          }

          var lista = [];
          for(var i = 0; i< this.listaCantProductos.length;i++){
            var indice =  this.listaProductosCotiza.indexOf( this.listaProductos[i] );
            if(indice>=0){
              lista[i] = this.listaCantProductosCotiza[ indice];
            }else{
              lista[i] = 0;
            }
          }
          this.barChartLabels = this.listaProductos;
          this.barChartData = [
            {data: this.listaCantProductos, label: 'Solicitados'},
            {data: lista, label: 'Cotizados'}
          ];
        },
        (error) => {
          console.error(error);
        }
       
      );
      
      //--------------FIN PRODUCTOS COTIZADOS------------------

      //--------------INICIO SERVICIOS COTIZADOS------------------
      this.Estadistica.getCotizacionesPorCategoria( 2 ).subscribe(
        (data) => { // Success   
          //console.error("*INICIO SERVICIOS COTIZADOS*");
          //console.error("++++"+this.listaCantProductosCotiza);
         for( var i = 0; i<data.length; i++){
            for( var j = 0; j< data[i].details.length; j++){
               
             var indice =  this.listaProductos.indexOf( data[i].details[j].productDescription);

             if(indice>=0){
                this.listaProductosCotiza[ indice] = data[i].details[j].productDescription;
                
                if(this.listaCantProductosCotiza[ indice] == null){
                  this.listaCantProductosCotiza[ indice] = data[i].details[j].quantity;
                }else{
                  this.listaCantProductosCotiza[ indice] += data[i].details[j].quantity;
                } 
              }
            }
          }
          
          var lista = [];
          for(var i = 0; i< this.listaCantProductos.length;i++){
            var indice =  this.listaProductosCotiza.indexOf( this.listaProductos[i] );
            if(indice>=0){
              lista[i] = this.listaCantProductosCotiza[ indice];
            }else{
              lista[i] = 0;
            }
          }
          this.barChartLabels = this.listaProductos;
          this.barChartData = [
            {data: this.listaCantProductos, label: 'Solicitados'},
            {data: lista, label: 'Cotizados'}
          ];
          //console.error("*FIN SERVICIOS COTIZADOS*");
        },
        (error) => {
          console.error(error);
        }
      );
      //--------------FIN SERVICIOS COTIZADOS------------------
    
    //------------------------------------------------------------------------------------------
    //                                    RADAR
    //------------------------------------------------------------------------------------------

    //--------------INICIO PRODUCTOS SOLICITADOS------------------
    
    this.Estadistica.getSolicitudesPorCategoria( 1 ).subscribe(
      (data) => {  
        for( var i = 0; i<data.length; i++){
          var indice = this.radarChartLabels.indexOf( data[i].eRequestStatus);
          this.radarChartCantProd[ indice ] += 1; 
          console.error("**"+  indice + "-- "+data[i].eRequestStatus + "--"+this.radarChartCantProd[ indice ] );
        }
        //console.error(data);
        console.error("-->"+this.radarChartCantProd);
        this.radarChartData = [
          {data: this.radarChartCantProd, label: 'PRODUCTOS'},
          {data: this.radarChartCantServ, label: 'SERVICIOS'}
        ];
      },
      (error) => {
        console.error(error);
      }
    );//--------------FIN PRODUCTOS SOLICITADOS------------------

    //--------------INICIO SERVICIOS SOLICITADOS------------------
    this.Estadistica.getSolicitudesPorCategoria( 2 ).subscribe(
      (data) => {  
        for( var i = 0; i<data.length; i++){

          
          var indice = this.radarChartLabels.indexOf( data[i].eRequestStatus);
          this.radarChartCantServ[ indice ] += 1;
        }
        //console.error(this.radarChartCantProd);
        //console.error(this.radarChartCantServ);
        this.radarChartData = [
          {data: this.radarChartCantProd, label: 'PRODUCTOS'},
          {data: this.radarChartCantServ, label: 'SERVICIOS'}
        ];

      },
      (error) => {
        console.error(error);
      }
    );
    //------------------------FIN SERVICIOS SOLICITADOS------------------

    //------------------------------------------------------------------------------------------
    //                                    PIE
    //------------------------------------------------------------------------------------------

    //--------------INICIO PRODUCTOS COTIZADOS------------------
    this.Estadistica.getCotizacionesPorCategoria( 1 ).subscribe(
      (data) => { // Success   

        for( var i = 0; i<data.length; i++){
          for( var j = 0; j< data[i].details.length; j++){ 

            var indice =  this.listaDesProductosCotiza.indexOf( data[i].details[j].productDescription);

            if(indice>=0){
              this.listaDesProductosCotiza[indice] = data[i].details[j].productDescription;
              this.listaVlrProductosCotiza[indice] += data[i].details[j].amount;
            }else{
              this.listaDesProductosCotiza[this.contador] = data[i].details[j].productDescription;
              this.listaVlrProductosCotiza[this.contador] = data[i].details[j].amount;
              this.contador ++;
            }
          }
        }

        this.pieChartLabels = this.listaDesProductosCotiza;
        this.pieChartData = this.listaVlrProductosCotiza;
      },
      (error) => {
        console.error(error);
      }
    );
    //--------------INICIO SERVICIOS COTIZADOS------------------
    this.Estadistica.getCotizacionesPorCategoria( 2 ).subscribe(
      (data) => { // Success   
        for( var i = 0; i<data.length; i++){
          for( var j = 0; j< data[i].details.length; j++){ 

            var indice =  this.listaDesProductosCotiza.indexOf( data[i].details[j].productDescription);

            if(indice>=0){
              this.listaDesProductosCotiza[indice] = data[i].details[j].productDescription;
              this.listaVlrProductosCotiza[indice] += data[i].details[j].amount;
            }else{
              this.listaDesProductosCotiza[this.contador] = data[i].details[j].productDescription;
              this.listaVlrProductosCotiza[this.contador] = data[i].details[j].amount;
              this.contador ++;
            }
          }
        }
        this.pieChartLabels = this.listaDesProductosCotiza;
        this.pieChartData = this.listaVlrProductosCotiza;
      },
      (error) => {
        console.error(error);
      }
    );


  }

  
  
  

  /////////////
  

  public pieChartType = 'pie';

}
