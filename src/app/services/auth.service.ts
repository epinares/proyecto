import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SqliteService } from './sqlite.service';  // Importamos el servicio de SQLite

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private http: HttpClient, private sqliteService: SqliteService) {}

  // Lógica de autenticación con validaciones y almacenamiento de sesión en SQLite
  async login(email: string, password: string): Promise<boolean> {
    // Validaciones de formato para el email y la contraseña
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d{4})(?=.*[a-z]{3})(?=.*[A-Z]).{8,}$/;

    if (!emailRegex.test(email) || !passwordRegex.test(password)) {
      return false;
    }

    try {
      // Lógica para autenticar al usuario mediante una API externa
      const response: any = await this.http.post('https://api.example.com/login', { email, password }).toPromise();
      
      if (response.success) {
        this.isAuthenticated = true;
        // Guardamos la sesión en SQLite con el estado de autenticación y el email del usuario
        await this.sqliteService.setSession(true, email);  
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      return false;
    }
  }

  // Verifica si el usuario está autenticado leyendo el estado de la sesión desde SQLite
  async isLoggedIn(): Promise<boolean> {
    const session = await this.sqliteService.getSession();
    return session.isLoggedIn;
  }

  // Recupera el email del usuario almacenado en la sesión desde SQLite
  async getEmail(): Promise<string | null> {
    const session = await this.sqliteService.getSession();
    return session.email;
  }

  // Cierra la sesión y limpia los datos de sesión en SQLite
  async logout() {
    this.isAuthenticated = false;
    await this.sqliteService.clearSession();  // Limpia la sesión en SQLite
  }
}
