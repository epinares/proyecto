import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  // Obtener los favoritos del usuario por su email
  getFavoritesByEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?email=${email}`);
  }

  // Agregar película a favoritos
  addFavorite(email: string, movie: any): Observable<any> {
    // Primero obtenemos el usuario por email
    return new Observable(observer => {
      this.http.get(`${this.apiUrl}?email=${email}`).subscribe((users: any) => {
        if (users.length > 0) {
          const user = users[0];
          user.favorites.push(movie);  // Agregamos la película a la lista de favoritos

          // Actualizamos al usuario en la base de datos
          this.http.put(`${this.apiUrl}/${user.id}`, user).subscribe(() => {
            observer.next(user.favorites);  // Devolvemos la lista actualizada de favoritos
            observer.complete();
          });
        } else {
          observer.error('Usuario no encontrado');
        }
      });
    });
  }

  // Eliminar película de favoritos
  removeFavorite(email: string, movieId: number): Observable<any> {
    // Primero obtenemos el usuario por email
    return new Observable(observer => {
      this.http.get(`${this.apiUrl}?email=${email}`).subscribe((users: any) => {
        if (users.length > 0) {
          const user = users[0];
          user.favorites = user.favorites.filter((fav: any) => fav.id !== movieId);  // Filtramos la película eliminada

          // Actualizamos al usuario en la base de datos
          this.http.put(`${this.apiUrl}/${user.id}`, user).subscribe(() => {
            observer.next(user.favorites);  // Devolvemos la lista actualizada de favoritos
            observer.complete();
          });
        } else {
          observer.error('Usuario no encontrado');
        }
      });
    });
  }
}
