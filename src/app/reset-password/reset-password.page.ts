import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';  // Importamos HttpClient para hacer peticiones a la API

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  email: string = '';  // Variable para almacenar el correo electrónico
  mensaje: string = '';  // Mensaje de éxito
  error: string = '';  // Mensaje de error

  private apiUrl = 'http://localhost:3000/users';  // URL de la API (JSON Server o tu backend)

  constructor(
    private router: Router,
    private alertController: AlertController,
    private http: HttpClient  // Inyectamos HttpClient para hacer peticiones HTTP
  ) {}

  async resetPassword() {
    // Validación del formato del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.error = 'Por favor, ingrese un correo electrónico válido.';
      return;
    }

    // Verificar si el email existe en la base de datos (API)
    this.http.get(`${this.apiUrl}?email=${this.email}`).subscribe(
      async (users: any) => {
        if (users.length > 0) {
          // Simular el envío de un enlace de restablecimiento de contraseña
          this.mensaje = 'Se ha enviado un enlace de restablecimiento a tu correo electrónico.';
          this.error = '';  // Limpiar mensaje de error
          await this.presentAlert('Éxito', this.mensaje);

          // Redirigir al usuario al login después de un tiempo
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        } else {
          // Si el email no se encuentra en la base de datos
          this.error = 'No se encontró una cuenta con ese correo electrónico.';
          this.mensaje = '';  // Limpiar mensaje de éxito
          await this.presentAlert('Error', this.error);
        }
      },
      async () => {
        // Manejo de errores de conexión con la API
        this.error = 'Hubo un problema al procesar la solicitud. Inténtalo de nuevo más tarde.';
        this.mensaje = '';  // Limpiar mensaje de éxito
        await this.presentAlert('Error', this.error);
      }
    );
  }

  // Función para mostrar alertas
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
