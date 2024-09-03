import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formularioLogin: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formularioLogin = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, /* tus validadores de contraseña */]]
    });
  }

  ngOnInit(): void {
    // Initialization logic goes here
    console.log('LoginPage initialized')
  }
  onSubmit() {
    if (this.formularioLogin.valid) {
      console.log('Formulario válido', this.formularioLogin.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}