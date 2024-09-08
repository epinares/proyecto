import { Component, AfterViewInit } from '@angular/core';
import { IonicModule, AnimationController } from '@ionic/angular';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, MatCardModule, CommonModule],
})
export class HomePage implements AfterViewInit {
  iniciado: boolean = false;
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
      imagen: 'assets/shawshank.jpg'
    }
    // Add more movies as needed
  ];

  constructor(private router: Router, private animationCtrl: AnimationController) {}

  cerrarSesion() {
    this.iniciado = false;
    this.router.navigate(['/login']);
  }

  comenzar() {
    this.iniciado = true;
  }

  verDetallesPelicula(pelicula: string) {
    console.log(`Mostrando detalles de: ${pelicula}`);
    // Aquí puedes implementar la lógica para mostrar más detalles de la película
  }

  ngAfterViewInit() {
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