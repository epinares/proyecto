import { Component, AfterViewInit } from '@angular/core';
import { IonicModule, AnimationController } from '@ionic/angular';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../services/auth.service';  // Importamos el AuthService

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, MatCardModule, CommonModule],
})
export class HomePage implements AfterViewInit {
  iniciado: boolean = false;
  email: string | null = null;  // Variable para almacenar el email del usuario autenticado

  peliculas = [
    {
      titulo: 'Inception',
      genero: 'Ciencia ficción / Acción',
      descripcion: 'Un ladrón con la rara habilidad de "extracción" roba secretos del subconsciente mientras la gente sueña.',
      imagen: 'assets/inception.jpg'
    },
    {
      titulo: 'The Shawshank Redemption',
      genero: 'Drama',
      descripcion: 'Dos hombres encarcelados forjan una amistad a lo largo de varios años, encontrando consuelo y redención a través de actos de decencia común.',
      imagen: 'assets/The Shawshank Redemption.jpg'
    }
  ];

  constructor(
    private router: Router,
    private animationCtrl: AnimationController,
    private authService: AuthService  // Inyectamos AuthService para manejar la sesión
  ) {}

  // Método para cerrar sesión
  async cerrarSesion() {
    await this.authService.logout();  // Cerramos la sesión limpiando el almacenamiento
    this.iniciado = false;
    this.router.navigate(['/login']);  // Redirigimos al login
  }

  comenzar() {
    this.iniciado = true;
  }

  // Método para navegar a la página de películas con detalles
  irAPeliculas(pelicula: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        pelicula: pelicula
      }
    };
    this.router.navigate(['/peliculas'], navigationExtras);
  }

  // Obtener el email del usuario autenticado y reproducir la animación
  async ngAfterViewInit() {
    this.email = await this.authService.getEmail();  // Obtenemos el email del usuario autenticado
    const cards = document.querySelectorAll('.mat-card');
    cards.forEach((card) => {
      const animation = this.animationCtrl.create()
        .addElement(card)
        .duration(1000)
        .fromTo('opacity', '0', '1')
        .fromTo('transform', 'translateY(50px)', 'translateY(0px)');
      animation.play();
    });
  }
}
