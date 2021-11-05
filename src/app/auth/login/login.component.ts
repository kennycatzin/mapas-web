import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public router: Router,
    public usuarioService: UsuarioService) { }

  ngOnInit() {
  }
  ingresar( forma: NgForm ) {
    if (forma.invalid) {
      return;
    }
    const usuario = new Usuario(null, forma.value.email, forma.value.password );
    this.usuarioService.login( usuario, forma.value.recuerdame )
          .subscribe( correcto => this.router.navigate(['/tablero']) );
    // this.router.navigate['/inicio'];
  }
  ingreso() {
    this.router.navigate(['/tablero']);
  }
}
