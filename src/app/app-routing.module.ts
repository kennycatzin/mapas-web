import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTING } from './auth/auth.routing';
import { LoginComponent } from './auth/login/login.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PAGES_APP_ROUTING } from './pages/pages.routing';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '**', component: NopagefoundComponent}
];

@NgModule({
  imports: [
    PAGES_APP_ROUTING,
    APP_ROUTING
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }