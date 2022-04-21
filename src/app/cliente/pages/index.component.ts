import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/shared/models/cliente';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent {

  lista: Cliente[];

  constructor()
  {
    this.lista = [
      { id: 1, nome:"teste1", documento: '12345678' },
      { id: 2, nome:"teste2", documento: '12345679' },
      { id: 3, nome:"teste3", documento: '12345680' },
      { id: 4, nome:"teste4", documento: '12345681' },
      { id: 5, nome:"teste5", documento: '12345682' },
      { id: 6, nome:"teste6", documento: '12345683' },
    ]
  }
}
