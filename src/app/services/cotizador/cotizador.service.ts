import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/config/config';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CotizadorService {

  constructor(public http: HttpClient) { }

  cotizador( origen: string, destino: string ) {
    const body = {
      id_origen: origen,
      id_destino: destino
    };
    const url = URL_SERVICIOS + '/get-direcciones';
    return this.http.post( url, body )
    .pipe(map( (resp: any) => {
      return resp.data;
    }));
  }
  getLugares(input: string){
    const url = URL_SERVICIOS + '/get-cotizacion';
    const body = {
      id_centro: 1,
      input: input
    };
    console.log('ollaa');
    const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
    return this.http.post( url, body, { 'headers': headers } )
    .pipe(map( (resp: any) => {
      console.log(resp)
      return resp.data;
    }));
  }
  getLugaresOrigen(input: string){
    const url = URL_SERVICIOS + '/get-autocomplete';
    const body = {
      input: input,
      id_centro: 1
    };
    console.log('ollaa');
    const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
    return this.http.post( url, body, { 'headers': headers } )
    .pipe(map( (resp: any) => {
      console.log(resp)

      return resp.data;
    }));
  }
  calcularPrecio(id_centro_trabajo: number){
    const url = URL_SERVICIOS + '/get-cotizacion';
    const body = {
      id_centro: id_centro_trabajo
    };
    return this.http.post( url, body )
    .pipe(map( (resp: any) => {
      return resp.data;
    }));
  }
}
