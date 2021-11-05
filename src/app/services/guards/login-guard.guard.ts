import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor( public usuarioService: UsuarioService,
               public router: Router
    ) {

  }
  canActivate() {
    if (this.usuarioService.estalogueado()) {
      console.log('Paso rl guar');
      return true;
    } else {
      console.log('Bloqueado por e lguard');
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
