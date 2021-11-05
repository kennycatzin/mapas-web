import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MapasService } from 'src/app/services/mapas/mapas.service';
import { Lugar } from '../../interfaces/lugar';
import { WebsocketService } from '../../services/websocket/websocket.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  @ViewChild('map') mapaElement: ElementRef;
  map: google.maps.Map;

  marcadores: google.maps.Marker[] = [];
  infoWindows: google.maps.InfoWindow[] = [];
  id_centro_trabajo;
  lugares: Lugar[] = [];

  constructor(
    // public wsService: WebsocketService,
    public cotizadorService: MapasService
  ) { }

  ngOnInit() {

    this.getMarcadores();
    // this.escucharSockets();

  }
  getMarcadores() {
    this.cargarMapa();

    // this.cotizadorService.getMarcadores()
    // .subscribe( (lugares: Lugar[]) => {
    //   this.id_centro_trabajo = 0;
    //   this.lugares = lugares;
    //   this.cargarMapa();
    // });
  }
  escucharSockets() {
    // marcador-nuevo
    // this.wsService.listen('marcador-nuevo')
    //   .subscribe( (marcador: Lugar) => {
    //     console.log(marcador);
    //     if(this.id_centro_trabajo == 0){
    //       this.agregarMarcador( marcador );
    //     }else if (this.id_centro_trabajo === marcador.id_centro_trabajo){
    //       this.agregarMarcador( marcador );
    //     }
    //   });
    // marcador-mover
    // this.wsService.listen( 'marcador-mover' )
    //   .subscribe( (marcador: Lugar) => {
    //     console.log(marcador.id)
    //     for ( const i in this.marcadores ) {
    //       console.log(this.marcadores[i].getTitle());
    //       if ( this.marcadores[i].getTitle() == marcador.id ) {
    //         console.log('Entro a marcar')
    //         console.log(this.marcadores[i].getTitle());
    //         const latLng = new google.maps.LatLng( marcador.lat, marcador.lng );
    //         console.log(latLng.lat());
    //         console.log(latLng.lng());
    //         console.log(this.marcadores[i]);

    //         this.marcadores[i].setPosition( latLng );
    //         break;
    //       }
    //     }
    //   });
    // marcador-borrar
    // this.wsService.listen('marcador-borrar')
    //   .subscribe( (id: string) => {
    //     console.log('mi marquer a borrar', id);
    //     for ( const i in this.marcadores ) {
    //       console.log(this.marcadores[i].getTitle());
    //       console.log(id);
    //       if ( this.marcadores[i].getTitle() == id ) {
    //         console.log('entro a eliminar')
    //         console.log( this.marcadores[i]);
    //         this.marcadores[i].setMap( null );            
    //         break;
    //       }
    //     }
    //   });
  }
  cargarMapa() {
    const latLng = new google.maps.LatLng( 20.966996, -89.623732 );
    const mapaOpciones: google.maps.MapOptions = {
      center: latLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map( this.mapaElement.nativeElement, mapaOpciones );
    console.log(' ===== uego oooaoaoao');
    this.map.addListener( 'click', ( coors ) => {
      console.log('aquiii boruuuuuuuu =====')
      const nuevoMarcador: Lugar = {
        nombre: 'Nuevo Lugar',
        lat: coors.latLng.lat(),
        lng: coors.latLng.lng(),
        id: new Date().toISOString(),
        id_centro_trabajo: 1
      };
      this.agregarMarcador( nuevoMarcador );
      console.log(nuevoMarcador);
      // this.wsService.emit( 'marcador-nuevo', nuevoMarcador );
    });
    for ( const lugar of this.lugares ) {
      console.log('Aqui atambien');
      this.agregarMarcador( lugar );
    }
  }


  agregarMarcador( marcador: Lugar ) {
    const latLng = new google.maps.LatLng( marcador.lat, marcador.lng );
    var icon = {
      url: "../../../assets/taxi.png", // url
      scaledSize: new google.maps.Size(40, 40), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
  };
    console.log(marcador);
    const marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      draggable: true,
      //icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      title: marcador.id.toString()      
    });

    this.marcadores.push( marker );

    const contenido = `<b>${ marcador.nombre } ${marcador.id}</b>`;
    const infoWindow = new google.maps.InfoWindow({
      content: contenido
    });

    this.infoWindows.push( infoWindow );

    google.maps.event.addDomListener( marker, 'click', () => {

      this.infoWindows.forEach( infoW => infoW.close() );
      infoWindow.open( this.map, marker );

    });

    google.maps.event.addDomListener( marker, 'dblclick', (coors) => {
      marker.setMap( null );
      // Disparar un evento de socket, para borrar el marcador
      console.log('Borrando' + marcador.id)
      // this.wsService.emit('marcador-borrar', marcador.id );
    });

    google.maps.event.addDomListener( marker, 'drag', (coors) => {
      const nuevoMarcador = {
        //lat: coors.latLng.lat(),
        //lng: coors.latLng.lng(),
        nombre: marcador.nombre,
        id: marcador.id
      };

      // Disparar un evento de socket, para mover el marcador
      // this.wsService.emit('marcador-mover', nuevoMarcador );

    });
    


  }
  cambioCentro(event){
    console.log(event);
    this.id_centro_trabajo = event;
    this.lugares = [];
    if(event == 0){
      this.cotizadorService.getMarcadores()
        .subscribe( (lugares: Lugar[]) => {
          this.lugares = lugares;
            this.cargarMapa();
        });
    }else{
      this.cotizadorService.getCentrosMarcadores(event)
        .subscribe( (lugares: Lugar[]) => {
          this.lugares = lugares;
          this.cargarMapa();
      });
    }
    

  }

}
