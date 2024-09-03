// OnInit is already imported in the existing code, so we can remove this duplicate import
// Validators is already imported in the existing code, so we can remove this duplicate import

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formularioRegistro: FormGroup;
  showConfirmPassword: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.formularioRegistro = this.formBuilder.group({
      nombreCompleto: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*\d{4})(?=.*[a-z]{3})(?=.*[A-Z]).{8,}$/)
      ]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Initialization logic goes here
    this.initializeForm()
  }

  private initializeForm() {
    // Add any additional form initialization logic here
    // For example, you could set default values or subscribe to value changes
    this.formularioRegistro.valueChanges.subscribe(value => {
      console.log('Form value changed:', value)
    })
  }

  onSubmit() {
    if (this.formularioRegistro.valid) {
      console.log('Registro válido', this.formularioRegistro.value);
    } else {
      console.log('Formulario de registro inválido');
    }
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Implementa los métodos necesarios aquí
  register(user: any): boolean {
    // Lógica de registro
    return true;
  }
}

