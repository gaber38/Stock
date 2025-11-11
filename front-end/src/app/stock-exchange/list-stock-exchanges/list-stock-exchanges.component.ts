import { Component, OnInit } from '@angular/core';
import { StockExchangeService } from '../services/stock-exchange.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-stock-exchanges',
  templateUrl: './list-stock-exchanges.component.html',
  styleUrls: ['./list-stock-exchanges.component.css']
})
export class ListStockExchangesComponent implements OnInit {
  stockExchanges: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  sortField: string = 'id';
  sortOrder: string = 'asc';
  currentPage: number = 1;
  totalPages: number = 1; // optional if backend returns it

  constructor(private stockExchangeService: StockExchangeService, private router: Router, private http: HttpClient) { }

  goToCreate() {
    this.router.navigate(['/stock-exchange/create']);
  }

  goToUpdate(exchange: any) {
    this.router.navigate(['/stock-exchange/update', exchange.id]);
  }

  goToAddStock(exchangeId: number) {
    this.router.navigate(['/stock-exchanges/add-stock', exchangeId]);
  }

  goToRemoveStock(exchangeId: number) {
    this.router.navigate(['/stock-exchanges/remove-stock', exchangeId]);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  deleteExchange(id: number) {
    if (!confirm('Are you sure you want to delete this stock exchange?')) return;

    this.stockExchangeService.deleteStockExchange(id).subscribe({
      next: () => {
        this.loadStockExchanges();
      },
      error: (err: any) => {
        if (err?.errors) {
          this.errorMessage = Object.values(err.errors).join(', ');
        } else {
          this.errorMessage = err.message || 'Delete failed.';
        }
      }
    });
  }

  ngOnInit(): void {
    this.loadStockExchanges();
  }

  loadStockExchanges() {
    this.isLoading = true;
    this.errorMessage = '';

    this.stockExchangeService.listStockExchanges(this.sortField, this.sortOrder, this.currentPage)
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;
          this.stockExchanges = res.data;
          if (res.totalPages) this.totalPages = res.totalPages;
        },
        error: (err: any) => {
          this.isLoading = false;
          if (err.status === 403) {
            this.errorMessage = '❌ Access denied. Please login again.';
          } else if (err.message) {
            this.errorMessage = `❌ ${err.message}`;
          } else {
            this.errorMessage = '❌ Failed to load stock exchanges.';
          }
        }
      });
  }

  // Pagination
  goToPage(page: number) {
    if (page < 1 || (this.totalPages && page > this.totalPages)) return;
    this.currentPage = page;
    this.loadStockExchanges();
  }

  // Sorting toggle
  changeSort(field: string) {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }
    this.loadStockExchanges();
  }

  goToLogout() {
    // Call backend logout API
    this.http.post('http://localhost:8080/account/logout', {}).subscribe({
      next: () => this.clearSession(),
      error: () => this.clearSession() // still clear session on error
    });
  }
   private clearSession() {
    localStorage.removeItem('token'); // remove auth token
    localStorage.removeItem('user');  // remove user data if stored
    this.router.navigate(['/login']);  // redirect to login page
  }
}
