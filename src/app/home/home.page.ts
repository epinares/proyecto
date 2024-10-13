import { Component, AfterViewInit, OnInit } from '@angular/core';
import { IonicModule, AnimationController } from '@ionic/angular';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../services/auth.service';  // Importamos el AuthService
import { Geolocation } from '@capacitor/geolocation';  // Importamos Geolocation
import { FavoritesService } from '../services/favorites.service';  // Servicio de favoritos

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, MatCardModule, CommonModule],
})
export class HomePage implements AfterViewInit, OnInit {
  iniciado: boolean = false;
  email: string | null = null;  // Variable para almacenar el email del usuario autenticado
  favorites: any[] = [];  // Almacenar los favoritos del usuario

  // Variables para el mapa
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };  // Inicialización predeterminada
  zoom = 14;
  options: google.maps.MapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
  };
  markers: any[] = [];

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
    private authService: AuthService,  // Inyectamos AuthService para manejar la sesión
    private favoritesService: FavoritesService  // Inyectamos el servicio de favoritos
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

    // Cargar los favoritos del usuario al iniciar
    if (this.email) {
      this.favoritesService.getFavoritesByEmail(this.email).subscribe(user => {
        if (user.length > 0) {
          this.favorites = user[0].favorites;
        }
      });
    }
  }

  // Lógica para cargar el mapa y obtener los cines cercanos
  async ngOnInit() {
    // Obtener la ubicación actual del usuario
    const coordinates = await Geolocation.getCurrentPosition();
    this.center = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude,
    };

    // Obtener los cines cercanos
    this.getNearbyCinemas(this.center.lat, this.center.lng);
  }

  getNearbyCinemas(lat: number, lng: number) {
    // Usar Places API para obtener los cines cercanos
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    const request: google.maps.places.PlaceSearchRequest = {
      location: new google.maps.LatLng(lat, lng),
      radius: 5000,  // Cambiado a número
      type: 'movie_theater',  // Cambiado a string en lugar de array
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        this.markers = results.map(place => {
          if (place.geometry && place.geometry.location) {  // Verificación de geometry y location
            return {
              position: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              },
            };
          }
          return null;
        }).filter(marker => marker !== null);  // Filtrar valores nulos
      }
    });
  }

  // Agregar película a favoritos
  addToFavorites(movie: any) {
    if (this.email) {
      this.favoritesService.addFavorite(this.email, movie).subscribe(() => {
        this.favorites.push(movie);  // Actualizar la lista localmente
      });
    }
  }

  // Eliminar película de favoritos
  removeFromFavorites(movieId: number) {
    if (this.email) {
      this.favoritesService.removeFavorite(this.email, movieId).subscribe(() => {
        this.favorites = this.favorites.filter(fav => fav.id !== movieId);  // Actualizar la lista localmente
      });
    }
  }
}
