import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    private alertController: AlertController,
    private authService: AuthService,
    private modalController: ModalController
  ) {}

  async login() {
    // Llamamos al método login del servicio de autenticación
    if (this.authService.login(this.email, this.password)) {
      // Si el login es exitoso, navegamos a la página de inicio
      this.router.navigate(['/home']);
    } else {

      // Si falla, mostramos una alerta al usuario
      await this.presentAlert('Error', 'Por favor, ingrese un correo electrónico y contraseña válidos.');
    }
  }

  navigateToRegistro() {
    this.router.navigate(['/registro']);
  }

  navigateToResetPassword() {
    this.router.navigate(['/reset-password']);
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: LoginSuccessModalComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}
