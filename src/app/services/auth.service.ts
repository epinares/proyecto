import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: any[] = [];

  checkUserExists(email: string): boolean {
    return this.users.some(user => user.email === email);
  }

  login(email: string, password: string): boolean {
    // Expresión regular para validar el formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Expresión regular para validar la contraseña:
    // - Al menos 4 números
    // - Al menos 3 letras minúsculas
    // - Al menos 1 letra mayúscula
    // - Mínimo 8 caracteres en total
    const passwordRegex = /^(?=.*\d{4})(?=.*[a-z]{3})(?=.*[A-Z]).{8,}$/;
    
    // Retornamos true si tanto el email como la contraseña pasan la validación
    return emailRegex.test(email) && passwordRegex.test(password);
  }
}
