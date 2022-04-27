import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.component.html'
})
export class MenuLoginComponent implements OnInit {

  token: string = "";

  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router) { }

  ngOnInit() {
  }


  usuarioLogado() : boolean{
    this.token = this.localStorageUtils.getToken();
    return this.token !== null;
  }

  logout(){
    this.localStorageUtils.clearToken();
    this.router.navigate(['/conta/login']);
  }

}
