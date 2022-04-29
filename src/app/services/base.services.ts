import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http"
import { Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { catchError, map } from 'rxjs/operators'
import { Injectable } from "@angular/core";

@Injectable()
export class BaseServices{

  protected URL: string = environment.ApiUrl;

  constructor(private http: HttpClient){ }

  public Get<T>(resource: string) : Observable<T>{
    let response = this.http
    .get(this.URL + resource, this.ObterHeaderJson())
    .pipe(
      map( this.extractData ),
      catchError( this.serviceError ));

    return response;
  }


  public Post<T>(resource: string, obj: {}) : Observable<T>{
    let response = this.http
    .post(this.URL + resource, obj, this.ObterHeaderJson())
    .pipe(
      map( this.extractData ),
      catchError( this.serviceError ));

    return response;
  }


  protected ObterHeaderJson() {
    return {
      headers : new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  private extractData(response: any){
    return response || {};
  }

  private serviceError(response: Response | any){
    let customError: string[] = [];

    if(response instanceof HttpErrorResponse){
      if(response.statusText === "Unknown Error"){
        customError.push("Ocorreu um erro desconhecido");
        response.error.errors = customError;
      }
    }

    console.error(response);
    return throwError(response);
  }
}
