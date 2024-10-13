import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { LoginSuccessModalComponent } from './login-success-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,  // Inyectamos ActivatedRoute para capturar el returnUrl
    private alertController: AlertController,
    private authService: AuthService,
    private modalController: ModalController
  ) {}

  // Método de inicio de sesión con manejo de promesas usando async/await
  async login() {
    try {
      // Llamamos al método login del servicio de autenticación y esperamos el resultado
      const success = await this.authService.login(this.email, this.password);
      
      // Si el login es exitoso, obtener el returnUrl o redirigir a /home por defecto
      if (success) {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
        this.router.navigate([returnUrl]);
        await this.presentModal();  // Mostrar modal en caso de éxito
      } else {
        // Si falla, mostramos una alerta al usuario
        await this.presentAlert('Error', 'Por favor, ingrese un correo electrónico y contraseña válidos.');
      }
    } catch (error) {
      // Manejo de errores en caso de que falle la promesa
      await this.presentAlert('Error', 'Ocurrió un problema al iniciar sesión. Intente de nuevo más tarde.');
      console.error("Error en la promesa de inicio de sesión:", error);
    }
  }

  // Navegación hacia la página de registro
  navigateToRegistro() {
    this.router.navigate(['/registro']);
  }

  // Navegación hacia la página de restablecimiento de contraseña
  navigateToResetPassword() {
    this.router.navigate(['/reset-password']);
  }

  // Mostrar alerta
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Mostrar modal en caso de éxito de login
  async presentModal() {
    const modal = await this.modalController.create({
      component: LoginSuccessModalComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}
