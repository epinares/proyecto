import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';  // Importa LoadingController para el spinner

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService, 
    private router: Router,
    private loadingController: LoadingController  // Inyecta el LoadingController
  ) {}

  async canActivate(): Promise<boolean> {
    // Muestra el spinner de carga
    const loading = await this.loadingController.create({
      message: 'Verificando autenticación...',  // Mensaje opcional mientras verifica
      spinner: 'crescent',
    });
    await loading.present();

    try {
      // Verifica si el usuario está autenticado usando el AuthService
      const isLoggedIn = await this.authService.isLoggedIn();
      
      if (!isLoggedIn) {
        // Si no está autenticado, redirige a la página de login
        this.router.navigate(['/login']);
        return false;
      }
      return true;  // Si está autenticado, permite el acceso
    } catch (error) {
      // Maneja errores durante la verificación
      console.error('Error verificando la autenticación:', error);
      this.router.navigate(['/login']);  // Redirige en caso de error
      return false;
    } finally {
      // Detiene el spinner de carga, independientemente de lo que ocurra
      await loading.dismiss();
    }
  }
}
