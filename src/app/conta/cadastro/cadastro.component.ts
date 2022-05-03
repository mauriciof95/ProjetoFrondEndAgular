import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, merge, Observable } from 'rxjs';
import { BaseCadastro } from 'src/app/utils/base-crud';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { Usuario } from '../models/Usuario';
import { ContaService } from '../services/Conta.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent extends BaseCadastro implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];

  usuario: Usuario;

  constructor(private fb: FormBuilder,
    private contaService: ContaService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService)
    {
      super();

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

      this.AddValidationsMessages();
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
    this.AddValidation(this.formInputElements);
  }

  adicionarConta(){
    if(this.cadastroForm.dirty && this.cadastroForm.valid){
      this.spinner.show();
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);

      this.contaService.Incluir(this.usuario)
      .subscribe(
        sucesso => {this.processarSucesso(sucesso)},
        falha => {this.processarFalha(falha)}
      );
    }
  }

  processarSucesso(response: any){
    this.spinner.hide();
    this.cadastroForm.reset();
    this.cadastroForm.patchValue({ativo: true});
    this.errors = [];
    this.toastr.success("Cadastro realizado com sucesso!", "Sucesso!")
  }

  processarFalha(fail: any){
    this.spinner.hide()
    this.errors = fail.error.errors;
    this.toastr.error('Algo de errado não está certo!', 'Ops!');
  }

}
