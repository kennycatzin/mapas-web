import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { WebsocketService } from './websocket/websocket.service';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { CotizadorService } from './cotizador/cotizador.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuardGuard, SidebarService } from './service.index';
import { UsuarioService } from './usuario/usuario.service';
const config: SocketIoConfig = { url: 'https://mapa-sockets.herokuapp.com', options: {} };

@NgModule({
  declarations: [
  // WebsocketService,
    
  ],
  // exports: [
  //   WebsocketService,
  //   CotizadorService
  // ],
  imports: [
    CommonModule,
    SocketIoModule.forRoot( config ),
    RouterModule,
    HttpClientModule
  ],
  providers: [
    SidebarService,
    UsuarioService,
    LoginGuardGuard,
    CotizadorService

  ]
})
export class ServicesModule { }
