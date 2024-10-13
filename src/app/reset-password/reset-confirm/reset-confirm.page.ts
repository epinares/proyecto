import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-confirm',
  templateUrl: './reset-confirm.page.html',
  styleUrls: ['./reset-confirm.page.scss'],
})
export class ResetConfirmPage {
  email: string = '';
  password: string = '';
  mensaje: string = '';

  private apiUrl = 'http://localhost:3000/users';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      this.email = params['email'];
    });
  }

  restablecerContraseña() {
    this.http.get(`${this.apiUrl}?email=${this.email}`).subscribe((users: any) => {
      if (users.length > 0) {
        const user = users[0];
        user.password = this.password;
        this.http.put(`${this.apiUrl}/${user.id}`, user).subscribe(() => {
          this.mensaje = 'Contraseña restablecida exitosamente.';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        });
      } else {
        this.mensaje = 'Error: No se encontró la cuenta.';
      }
    });
  }
}
