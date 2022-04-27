import { HttpErrorResponse, HttpHeaders } from "@angular/common/http"
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";

export abstract class BaseServices{

  protected URL: string = environment.ApiUrl;

  protected ObterHeaderJson() {
    return {
      headers : new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  protected extractData(response: any){
    return response || {};
  }

  protected serviceError(response: Response | any){
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
