import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Lugar } from '../../interfaces/lugar';
import { map, startWith } from 'rxjs/operators';
import { CotizadorService } from 'src/app/services/cotizador/cotizador.service';

@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html',
  styleUrls: ['./cotizador.component.css']
})
export class CotizadorComponent implements OnInit {
  @ViewChild('cotMap') cotMapaElement: ElementRef;
  cotMap: google.maps.Map;
  objFactura: any = [];
  myControl = new FormControl();
  origenControl = new FormControl();
  destinoControl = new FormControl();
  infoWindows: google.maps.InfoWindow[] = [];

  filteredOptions: Observable<any[]> | undefined;
  origenFilteredOptions: Observable<any[]> | undefined;
  destinoFilteredOptions: Observable<any[]> | undefined;
  options: any[] = [];
  origenOptions: any[] = [];
  destinoOptions: any[] = [];
  origenID = '';
  destinoID = '';
  objInfoDireccion = {};
  distanciaViaje = 0;
  poliTexto = '';
  calculado = false;
  lugarOrigen: Lugar;
  lugarDestino: Lugar;
  lugares: Lugar[] = [];
  marcadores: google.maps.Marker[] = [];
  totalViaje  = 0;
  origen ='';
  destino ='';

  constructor(
    public cotizadorService: CotizadorService
  ) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      this.origenFilteredOptions = this.origenControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._origenFilter(value))
      );
      this.destinoFilteredOptions = this.destinoControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._destinoFilter(value))
      );

    this.cargarMapa();
  }

  private _filter(value: string): string[] {
    if(value.length > 3){
      console.log(value);
      const filterValue = value.toLowerCase();
      console.log();
      const data = this.options.filter(option => option.description.toLowerCase().includes(filterValue));
      console.log(data);
      if(
        typeof data === 'object' && data.length > 0
      ){
        console.log('Hola muchachas')
      }
      return this.options.filter(option => option.description.toLowerCase().includes(filterValue));
    }
    return [];
  }
  private _origenFilter(value: string): string[] {
    if(value.length > 3){
      console.log(value);
      const filterValue = value.toLowerCase();
      console.log(this.origenOptions.filter(option => option.description.toLowerCase().includes(filterValue)));
      console.log(this.origenID);
      return this.origenOptions.filter(option => option.description.toLowerCase().includes(filterValue));
    }
    return [];
  }
  private _destinoFilter(value: string): string[] {
    if(value.length > 3){
      console.log(value);
      const filterValue = value.toLowerCase();
      console.log(this.destinoOptions.filter(option => option.description.toLowerCase().includes(filterValue)));

      return this.destinoOptions.filter(option => option.description.toLowerCase().includes(filterValue));
    }
    return [];
  }
  onShopSelectionChanged(event) {
    console.log(event.option.id);
}
origenSelec(event) {
  console.log(event.option.id);
  this.origenID = event.option.id;
}
destinoSelec(event) {
  console.log(event.option.id);
  this.destinoID = event.option.id;
}
  cargarMapa() {
    const latLng = new google.maps.LatLng( 20.966996, -89.623732 );
    const mapaOpciones: google.maps.MapOptions = {
      center: latLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };


    this.cotMap = new google.maps.Map( this.cotMapaElement.nativeElement, mapaOpciones );

  }
  marcarRuta(){
    const flightPlanCoordinates = this.decodePoly(this.poliTexto);
    const flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: "#FF5733",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });
    flightPath.setMap(this.cotMap);
  }
  busqueda(event: string){
    if(event.length > 3){
      this.getLugares(event);
    }
    if(event.length == 0){
      this.objFactura = [];
    }
  }
  getLugares(input: string){
    this.cotizadorService.getLugares(input)
      .subscribe((object: any) => {
        this.options = object.predictions;
    });
  }
  origenBusqueda(event: string){
    if(event.length > 3){
      this.getLugaresOrigen(event);
    }
    if(event.length == 0){
      this.objFactura = [];
    }
  }
  destinoBusqueda(event: string){
    if(event.length > 3){
      this.getLugaresDestino(event);
    }
    if(event.length == 0){
      this.objFactura = [];
    }
  }
  getLugaresOrigen(input: string){
  this.cotizadorService.getLugares(input)
      .subscribe((object: any) => {
        console.log(object)
        this.origenOptions = object.predictions;
    });
  }
  getLugaresDestino(input: string){
    this.cotizadorService.getLugares(input)
      .subscribe((object: any) => {
        this.destinoOptions = object.predictions;
    });
  }
  cotizar(){

    if(this.origenID.length > 0 && this.destinoID.length > 0){
      this.cotizadorService.cotizador(this.origenID, this.destinoID)
        .subscribe((object: any) => {
            const miData = object.routes;
            var menor = parseFloat(miData[0].legs[0].distance.value);
            var cadena = miData[0].overview_polyline.points;
            var origenLat = miData[0].legs[0].start_location.lat;
            var origenLng = miData[0].legs[0].start_location.lng;
            var origenID = '1';
            var origenId_centro_trabajo = 1;
            var origenNombre = 'Origen';
    
            var destinoLat = miData[0].legs[0].end_location.lat;
            var destinoLng = miData[0].legs[0].end_location.lng;
            var destinoID = '2';
            var destinoId_centro_trabajo = 1;
            var destinoNombre = 'Destino';
    
            for(var i = 1; i <= miData.length - 1; i++){
              if (miData[i].legs[0].distance.value < menor){
                menor = miData[i].legs[0].distance.value;
                cadena = miData[i].overview_polyline.points;
                
                origenLat = miData[i].legs[0].start_location.lat;
                origenLng = miData[i].legs[0].start_location.lng;
    
                destinoLat = miData[i].legs[0].end_location.lat;
                destinoLng = miData[i].legs[0].end_location.lng;
              } 
            }
            this.distanciaViaje = menor;
            this.poliTexto = cadena;
            this.marcarRuta();
            this.agregarMarcador(origenLat, origenLng, origenNombre, origenID);
            this.agregarMarcador(destinoLat, destinoLng, destinoNombre, destinoID);
            this.calcularPrecio();
          });
        }else{
          return;
        }
  }
  limpiar(){
    this.cargarMapa();
    this.calculado = false;
    this.totalViaje = 0;
    this.distanciaViaje = 0;
    this.poliTexto = '';
    this.destinoID = '';
    this.origenID = '';
    this.origen = '';
    this.destino = '';
  }
  calcularPrecio(){
    const url = 'http://localhost:8888/mapas-api/public/api/get-cotizacion';
      const body = {
        id_centro: 1
      };
      this.cotizadorService.calcularPrecio(1)
      .subscribe((object: any) => {
        console.log(object);
      let hoy = new Date();
      let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
      let banderazo = object.banderazo;
      let tarifa_minima = object.tarifa_minima;
      let horarios = object.horarios;
      let detalleHorario = [];
      console.log(hora)
      for(let i = 0; i <= horarios.length - 1; i++){
        console.log(horarios[i].hora_inicial);
        if(hora >= horarios[i].hora_inicial && hora <= horarios[i].hora_final){
          console.log(horarios[i].detalle_horario);
          detalleHorario = horarios[i].detalle_horario;
          let valorRestante = 0;
          let auxDistancia = 0;

          let calculoBruto = 0;
          this.distanciaViaje = this.distanciaViaje / 1000;
          auxDistancia = this.distanciaViaje
          let bandera = 0;
          let banderaFinal = 0;
          for(let j = 0; j <= detalleHorario.length - 1; j++){

            valorRestante = detalleHorario[j].km_final - detalleHorario[j].km_inicial;
            console.log('mi valor restante para entrar' + valorRestante + ' ' + auxDistancia);
            if(valorRestante <= auxDistancia && bandera != 1){
              console.log('entro al inicio')
              auxDistancia = auxDistancia - valorRestante;
              calculoBruto += valorRestante * detalleHorario[j].precio;
            }else{
              if(j > 0 && bandera != 1 && banderaFinal != 1){
                console.log('entro al final');
                banderaFinal = 1;
                console.log(auxDistancia);
                console.log(detalleHorario[j].precio);
                calculoBruto += auxDistancia * detalleHorario[j].precio;
              }
              if(j == 0){
                console.log('aqui me quedoooooo')
                bandera = 1;
                calculoBruto += auxDistancia * detalleHorario[j].precio;
              }
            }            
          }
          calculoBruto = calculoBruto + banderazo;
          if(calculoBruto < tarifa_minima){
            calculoBruto = tarifa_minima;
          }
          console.log(this.distanciaViaje);
          console.log(calculoBruto);
          this.calculado = true;
          this.totalViaje = calculoBruto;
        }
      }
      });
  }
    agregarMarcador( lat: number, lng: number, nombre: string, id: string ) {
      const latLng = new google.maps.LatLng( lat, lng );
      var icon = {
        url: "../../../assets/taxi.png", // url
        scaledSize: new google.maps.Size(40, 40), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };
    // icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      const marker = new google.maps.Marker({
        map: this.cotMap,
        animation: google.maps.Animation.DROP,
        position: latLng,
        draggable: true,
        title: id      
      });
      this.marcadores.push( marker );
      const contenido = `<b>${ nombre }</b>`;
      const infoWindow = new google.maps.InfoWindow({
        content: contenido
      });
      this.infoWindows.push( infoWindow );
      google.maps.event.addDomListener( marker, 'click', () => {
        // this.infoWindows.forEach( infoW => infoW.close() );
        infoWindow.open( this.cotMap, marker );
      });
    }
    decodePoly(Poly: string){

      // array that holds the points
      const encoded = Poly;
      var points=[ ]
      var index = 0, len = encoded.length;
      var lat = 0, lng = 0;
      while (index < len) {
          var b, shift = 0, result = 0;
          do {
  
      b = encoded.charAt(index++).charCodeAt(0) - 63;//finds ascii                                                                                    //and substract it by 63
                result |= (b & 0x1f) << shift;
                shift += 5;
               } while (b >= 0x20);
  
  
         var dlat = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
         lat += dlat;
        shift = 0;
        result = 0;
       do {
          b = encoded.charAt(index++).charCodeAt(0) - 63;
          result |= (b & 0x1f) << shift;
         shift += 5;
           } while (b >= 0x20);
       var dlng = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
       lng += dlng;
   
     points.push({lat:( lat / 1E5),lng:( lng / 1E5)})  
   
    }
    console.log(points) ;
    return points;
      }
}
