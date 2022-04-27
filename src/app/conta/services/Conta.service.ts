import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { BaseServices } from 'src/app/services/base.services';
import { UsuarioAuth } from '../models/UsuarioAuth';
import { Usuario } from '../models/Usuario';
import { TokenVM } from '../models/TokenVM';

@Injectable()
export class ContaService extends BaseServices{
  constructor(private http: HttpClient) { super(); }

  Incluir(usuario: Usuario) : Observable<any>{
    let response = this.http
    .post(this.URL + '/Usuario/cadastrar', usuario, this.ObterHeaderJson())
    .pipe(
      map( this.extractData ),
      catchError( this.serviceError ));

    return response;
  }

  Login(usuarioAuth: UsuarioAuth) : Observable<TokenVM>{
    let response = this.http
    .post(this.URL + '/Usuario/login', usuarioAuth, this.ObterHeaderJson())
    .pipe(
      map( this.extractData ),
      catchError( this.serviceError ));

    return response;
  }
}
