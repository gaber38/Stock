import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>('http://localhost:8080/auth/login', loginData).subscribe({
      next: (response: any) => {
        console.log('Login response:', response);

        if (response.access_token) {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);

          const tokenPayload = JSON.parse(atob(response.access_token.split('.')[1]));
          console.log('Decoded token payload:', tokenPayload);

          this.router.navigate(['/dashboard']);
        }
      },
      error: (err: any) => {
        console.error('Login error:', err);
        this.errorMessage = err.error?.message || 'Login failed. Please check your credentials.';
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
