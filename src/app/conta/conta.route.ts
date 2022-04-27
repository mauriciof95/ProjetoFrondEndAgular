import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ContaAppComponent } from './conta.app.component';
import { LoginComponent } from './login/login.component';
import { ContaGuard } from './services/conta.guard';


const contaRoutes: Routes = [
  {
    path: '', component: ContaAppComponent,
    children: [
      { path: 'cadastro', component: CadastroComponent },
      { path: 'login', component: LoginComponent, canActivate: [ContaGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(contaRoutes)],
  exports: [RouterModule]
})
export class ContaRoutingModule { }
