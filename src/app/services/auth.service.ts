import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: any[] = [];

  constructor() {
    this.loadUsers();
  }

  private loadUsers() {
    const storedUsers = localStorage.getItem('users');
    this.users = storedUsers ? JSON.parse(storedUsers) : [];
  }

  private saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  register(user: any): boolean {
    if (this.checkUserExists(user.email)) {
      return false;
    }
    this.users.push(user);
    this.saveUsers();
    return true;
  }

  checkUserExists(email: string): boolean {
    return this.users.some(user => user.email === email);
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    return !!user;
  }
}