import { ElementRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { fromEvent, merge, Observable } from "rxjs";
import { DisplayMessage, GenericValidator, ValidationMessages } from "./generic-form-validation";

export class BaseCadastro{
  validationMessage: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  errors: any[] = [];

  cadastroForm: FormGroup;

  AddValidationsMessages(){
    this.genericValidator = new GenericValidator(this.validationMessage);
  }


  AddValidation(formInputElements: ElementRef[]){
    let controlBlurs: Observable<any>[] = formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

      merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
    });
  }
}
