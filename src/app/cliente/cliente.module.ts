import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ModalComponent } from "../shared/components/modal/modal.component";
import { ClienteRoutingModule } from "./cliente.router";

import { IndexComponent } from "./pages/index.component";

@NgModule({
  declarations: [
    IndexComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule
  ],
  exports: [

  ]
})
export class ClienteModule{}
