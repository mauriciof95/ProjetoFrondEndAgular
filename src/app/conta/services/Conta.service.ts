import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { BaseServices } from 'src/app/services/base.services';
import { Usuario } from '../models/Usuario';

@Injectable()
export class ContaService extends BaseServices{
  constructor(private http: HttpClient) { super(); }

  Incluir(usuario: Usuario) : Observable<Usuario>{
    let response = this.http.post(this.URL + 'Usuario/cadastrar', usuario, this.ObterHeaderJson())
    .pipe(
      map( this.extractData ),
      catchError( this.serviceError ));

    return response;
  }

  Login(usuario: Usuario){

  }
}
