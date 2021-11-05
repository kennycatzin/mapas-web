import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';import { URL_SERVICIOS } from 'src/config/config';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MapasService {

  constructor(public http: HttpClient) { }

  getMarcadores() {
    let url =  'https://mapa-sockets.herokuapp.com/mapa';
    return this.http.get(url);
  }

  getCentrosMarcadores(event) {
    let url =  'https://mapa-sockets.herokuapp.com/centro-mapa/'+ event;
    return this.http.get(url);
  }
}
