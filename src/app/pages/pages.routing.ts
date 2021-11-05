import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginGuardGuard } from "../services/guards/login-guard.guard";
import { CotizadorComponent } from "./cotizador/cotizador.component";
import { MapaComponent } from "./mapa/mapa.component";
import { PagesComponent } from "./pages.component";
import { TableroComponent } from "./tablero/tablero.component";

const routes: Routes  = [
    { path: '', 
    component: PagesComponent,
    // canActivate: [ LoginGuardGuard ],
    children: [
      { path: 'actividad', component: MapaComponent },
      { path: 'cotizador', component: CotizadorComponent },
      { path: 'tablero', component: TableroComponent },
      { path: '', redirectTo: '/tablero', pathMatch: 'full'},
    ]
  },
];

export const PAGES_APP_ROUTING = RouterModule.forRoot(routes, {useHash: true});
