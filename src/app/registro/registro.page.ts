// Importaciones necesarias para el componente
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as $ from 'jquery';
import 'jquery-validation';

// Declaración global para extender la interfaz JQuery con el método validate
declare global {
  interface JQuery {
    validate(options: any): JQuery;
  }
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  // Propiedades para almacenar los datos del formulario
  nombre: string = '';
  email: string = '';
  contrasena: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Inicializa la validación del formulario al cargar el componente
    this.initializeValidation();
  }

  // Método para configurar la validación del formulario usando jQuery Validation
  initializeValidation() {
    $('#registroForm').validate({
      // Reglas de validación para cada campo
      rules: {
        nombre: {
          required: true,
          minlength: 2
        },
        email: {
          required: true,
          email: true
        },
        contrasena: {
          required: true,
          minlength: 8,
          pattern: /^(?=.*\d{4})(?=.*[a-z]{3})(?=.*[A-Z])/ // Patrón para validar la contraseña
        }
      },
      // Mensajes personalizados para cada validación
      messages: {
        nombre: {
          required: "Por favor, ingrese su nombre",
          minlength: "El nombre debe tener al menos 2 caracteres"
        },
        email: {
          required: "Por favor, ingrese su email",
          email: "Por favor, ingrese un email válido"
        },
        contrasena: {
          required: "Por favor, ingrese una contraseña",
          minlength: "La contraseña debe tener al menos 8 caracteres",
          pattern: "La contraseña debe contener al menos 4 números, 3 letras minúsculas y 1 mayúscula"
        }
      },
      // Manejador de envío del formulario
      submitHandler: () => {
        this.registrar();
      }
    });
  }

  // Método para manejar el registro del usuario
  async registrar() {
    // Verifica si el formulario es válido
    if (($('#registroForm') as any).valid()) {
      console.log('Nombre:', this.nombre);
      console.log('Email:', this.email);
      console.log('Contraseña:', this.contrasena);

      // Crea y muestra una alerta de registro exitoso
      const alert = await this.alertController.create({
        header: 'Registro Exitoso',
        message: 'Tu cuenta ha sido creada correctamente.',
        buttons: ['OK']
      });

      await alert.present();
      // Navega a la página de login después del registro exitoso
      this.router.navigate(['/login']);
    }
  }

  // Método para volver a la página de login
  volverALogin() {
    this.router.navigate(['/login']);
  }
}
