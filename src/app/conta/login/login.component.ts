import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ngx-custom-validators';
import { fromEvent, merge, Observable } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { TokenVM } from '../models/TokenVM';
import { Usuario } from '../models/Usuario';
import { UsuarioAuth } from '../models/UsuarioAuth';
import { ContaService } from '../services/Conta.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];

  errors: any[] = [];

  loginForm: FormGroup;
  userAuth: UsuarioAuth;

  validationMessage: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  localStorageUtils = new LocalStorageUtils();

  constructor(private fb: FormBuilder,
    private contaService: ContaService,
    private router: Router)
    {
      this.validationMessage = {
        nome:{
          required: 'Informe o nome'
        },
        senha:{
          required: 'Informe a senha',
          rangeLength: 'A senha deve possuir entre 6 a 15 caracteres'
        }
      }

      this.genericValidator = new GenericValidator(this.validationMessage);
    }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      nome: ['', [Validators.required]],
      senha: ['', [Validators.required, CustomValidators.rangeLength([2,15])]],
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.loginForm);
    });
  }

  login(){
    if(this.loginForm.dirty && this.loginForm.valid){
      this.userAuth = Object.assign({}, this.userAuth, this.loginForm.value);

      this.contaService.Login(this.userAuth)
      .subscribe(
        sucesso => {this.processarSucesso(sucesso)},
        falha => {this.processarFalha(falha)}
      );
    }
  }

  processarSucesso(tokenVM: TokenVM){
    this.loginForm.reset();
    this.errors = [];
    this.localStorageUtils.setToken(tokenVM.token);
    this.router.navigate(['/home']);
  }

  processarFalha(fail: any){
    this.errors = fail.error.errors;
  }

}
