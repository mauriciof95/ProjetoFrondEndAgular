import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { BaseServices } from 'src/app/services/base.services';
import { UsuarioAuth } from '../models/UsuarioAuth';
import { Usuario } from '../models/Usuario';
import { TokenVM } from '../models/TokenVM';

@Injectable()
export class ContaService extends BaseServices
{
  constructor(_http: HttpClient) {
    super(_http);
  }

  Incluir(usuario: Usuario) : Observable<any>{
    return this.Post('/Usuario/cadastrar', usuario);
  }

  Login(usuarioAuth: UsuarioAuth) : Observable<TokenVM>{
    return this.Post<TokenVM>('/Usuario/login', usuarioAuth);
  }
}
