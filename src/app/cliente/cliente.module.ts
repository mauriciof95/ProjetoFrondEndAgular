import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ClienteRoutingModule } from "./cliente.router";

import { IndexComponent } from "./pages/index.component";

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule
  ],
  exports: [

  ]
})
export class ClienteModule{}
