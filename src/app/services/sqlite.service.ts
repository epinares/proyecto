import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  private dbInstance: SQLiteObject | undefined;  // Se declara como undefined inicialmente

  constructor(private sqlite: SQLite) {
    this.init();  // Inicializa la base de datos al iniciar el servicio
  }

  // Inicializa SQLite y crea la tabla de sesión si no existe
  async init() {
    try {
      this.dbInstance = await this.sqlite.create({
        name: 'mydb.db',
        location: 'default'
      });

      await this.dbInstance.executeSql(
        'CREATE TABLE IF NOT EXISTS session (id INTEGER PRIMARY KEY, isLoggedIn BOOLEAN, email TEXT)',
        []
      );
    } catch (error) {
      console.error('Error al inicializar SQLite:', error);
    }
  }

  // Guarda el estado de la sesión en la base de datos SQLite
  async setSession(isLoggedIn: boolean, email: string) {
    try {
      if (this.dbInstance) {
        await this.dbInstance.executeSql(
          'INSERT OR REPLACE INTO session (id, isLoggedIn, email) VALUES (1, ?, ?)',
          [isLoggedIn, email]
        );
      }
    } catch (error) {
      console.error('Error al guardar la sesión en SQLite:', error);
    }
  }

  // Verifica si el usuario está autenticado leyendo el estado de la sesión desde SQLite
  async getSession(): Promise<{ isLoggedIn: boolean, email: string | null }> {
    try {
      if (this.dbInstance) {
        const res = await this.dbInstance.executeSql('SELECT * FROM session WHERE id = 1', []);
        if (res.rows.length > 0) {
          return {
            isLoggedIn: res.rows.item(0).isLoggedIn,
            email: res.rows.item(0).email
          };
        }
      }
      return { isLoggedIn: false, email: null };
    } catch (error) {
      console.error('Error al obtener la sesión desde SQLite:', error);
      return { isLoggedIn: false, email: null };
    }
  }

  // Cierra la sesión y limpia los datos de sesión en SQLite
  async clearSession() {
    try {
      if (this.dbInstance) {
        await this.dbInstance.executeSql('DELETE FROM session WHERE id = 1', []);
        console.log('Sesión eliminada de SQLite.');
      }
    } catch (error) {
      console.error('Error al cerrar sesión en SQLite:', error);
    }
  }
}
