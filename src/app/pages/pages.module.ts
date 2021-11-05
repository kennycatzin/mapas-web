import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapaComponent } from './mapa/mapa.component';
import { CotizadorComponent } from './cotizador/cotizador.component';
import { PagesComponent } from './pages.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import { TableroComponent } from './tablero/tablero.component';

@NgModule({
  declarations: [
    MapaComponent,
    CotizadorComponent,
    PagesComponent,
    TableroComponent,
  ],
  exports: [
    MapaComponent,
    CotizadorComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    HttpClientJsonpModule,
    SharedModule,
    RouterModule
  ]
})
export class PagesModule { }
