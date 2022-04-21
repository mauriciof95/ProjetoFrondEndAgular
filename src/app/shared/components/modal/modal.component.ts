import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare let $: any;
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent {

  @ViewChild('formModal') modal:ElementRef;

  showModal(){
    $(this.modal.nativeElement).modal('show');
  }

  closeModal(){
    $(this.modal.nativeElement).modal('hide');
  }
  constructor() { }
}
