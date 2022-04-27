import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { FooterComponent } from './footer/footer.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MenuLoginComponent } from "./menu-login/menu-login.component";

@NgModule({
  declarations: [
    NavMenuComponent,
    MenuLoginComponent,
    HomeComponent,
    FooterComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  exports:[
    NavMenuComponent,
    MenuLoginComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent
  ]
})
export class NavegationModule { }
