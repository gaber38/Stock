import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private router: Router, private http: HttpClient) {}

  goToStocks() {
    this.router.navigate(['/stocks/list']);
  }

  goToStockExchanges() {
    this.router.navigate(['/stock-exchanges/list']);
  }

  goToLogout() {
    // Call backend logout API
    this.http.post('http://localhost:8080/account/logout', {}).subscribe({
      next: () => this.clearSession(),
      error: () => this.clearSession()
    });
  }
   private clearSession() {
    localStorage.removeItem('token'); 
    localStorage.removeItem('user');  
    this.router.navigate(['/login']); 
  }
}
