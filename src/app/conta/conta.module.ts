import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';

import { ContaRoutingModule } from './conta.route';
import { ContaAppComponent } from './conta.app.component';
import { ContaService } from './services/Conta.service';
import { CustomFormsModule } from 'ngx-custom-validators';
import { ContaGuard } from './services/conta.guard';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    ContaAppComponent,
    CadastroComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ContaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    NgxSpinnerModule
  ],
  providers:[
    ContaService,
    ContaGuard
  ]
})
export class ContaModule { }
