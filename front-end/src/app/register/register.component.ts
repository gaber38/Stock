import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  role: string = 'USER';
  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }
  errors: { [key: string]: string } = {};

  register() {
    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.errors = {}; // reset previous field errors

    const registerData = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.http.post<any>('http://localhost:8080/auth/register', registerData).subscribe({
      next: (response) => {
        console.log('Register response:', response);
        this.isLoading = false;

        if (response.access_token) {
          this.successMessage = '✅ Registration successful. Redirecting to login...';

          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);

          setTimeout(() => this.router.navigate(['/login']), 2000);
        } else {
          this.errorMessage = '❌ Registration failed. Please try again.';
        }
      },
      error: (err) => {
        console.error('Register error:', err);
        this.isLoading = false;

        if (err.error && err.error.errors) {
          // Field-specific errors
          const fieldKeys = Object.keys(err.error.errors);
          if (fieldKeys.length === 1 && fieldKeys[0] === 'detailed message') {
            // General error like "Email already exists"
            this.errorMessage = `❌ ${err.error.errors['detailed message']}`;
          } else {
            // Multiple field errors
            this.errors = err.error.errors;
          }
        } else if (err.error && err.error.message) {
          // Fallback general message
          this.errorMessage = `❌ ${err.error.message}`;
        } else {
          this.errorMessage = '❌ Registration failed. Please try again.';
        }
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
