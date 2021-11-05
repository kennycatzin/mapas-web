import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any = [
    {
      titulo: 'Dashboard',
      icono: 'dashboard',
      url: '/tablero'
    },
    {
      titulo: 'Actividad',
      icono: 'traffic',
      url: '/actividad'
    },
    {
      titulo: 'Cotizador',
      icono: 'rv_hookup',
      url: '/cotizador'
    },
    {
      titulo: 'Usuarios',
      icono: 'engineering',
      url: '/cotizador'
    },
    {
      titulo: 'Quejas y sugerencias',
      icono: 'record_voice_over',
      url: '/cotizador'
    },
    {
      titulo: 'Configuración',
      icono: 'settings',
      url: '/cotizador'
    },
    {
      titulo: 'Asignación de viajes',
      icono: 'room',
      url: '/cotizador'
    },
    {
      titulo: 'Clientes',
      icono: 'supervised_user_circle',
      url: '/cotizador'
    },
    {
      titulo: 'Reportes',
      icono: 'summarize',
      url: '/cotizador'
    }
  ];
  constructor() { }
}
// {
//   titulo: 'Usuarios',
//   icono: 'mdi mdi-chart-bubble',
//   url: '/usuarios'
// },
