import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LocalStorageUtils } from "src/app/utils/localstorage";

@Injectable()
export class ContaGuard implements CanActivate{
  localStorage = new LocalStorageUtils();

  constructor(private router: Router){}

  canActivate() {
      if(this.localStorage.getToken()){
        this.router.navigate(['/home']);
      }

      return true;
  }
}
