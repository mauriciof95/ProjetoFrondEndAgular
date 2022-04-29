import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { fromEvent, merge, Observable } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { Usuario } from '../models/Usuario';
import { ContaService } from '../services/Conta.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];

  errors: any[] = [];

  cadastroForm: FormGroup;
  usuario: Usuario;

  validationMessage: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};


  constructor(private fb: FormBuilder,
    private contaService: ContaService)
    {
      this.validationMessage = {
        nome:{
          required: 'Informe o nome'
        },
        email:{
          required: 'Informe o e-mail',
          email: 'Email inválido'
        },
        senha:{
          required: 'Informe a senha',
          rangeLength: 'A senha deve possuir entre 6 a 15 caracteres'
        },
        perfil_id:{
          required: 'Selecione o Perfil'
        }
      }

      this.genericValidator = new GenericValidator(this.validationMessage);
    }

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      id: [''],
      nome: ['', [Validators.required]],
      senha: ['', [Validators.required, CustomValidators.rangeLength([2,15])]],
      email: ['', [Validators.required, Validators.email]],
      perfil_id:	['', [Validators.required]],
      ativo: ['']
    });

    this.cadastroForm.patchValue({ativo: true});
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
    });
  }

  adicionarConta(){
    if(this.cadastroForm.dirty && this.cadastroForm.valid){
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);

      this.contaService.Incluir(this.usuario)
      .subscribe(
        sucesso => {this.processarSucesso(sucesso)},
        falha => {this.processarFalha(falha)}
      );
    }
  }

  processarSucesso(response: any){
    this.cadastroForm.reset();
    this.errors = [];
  }

  processarFalha(fail: any){
    this.errors = fail.error.errors;
  }

}
