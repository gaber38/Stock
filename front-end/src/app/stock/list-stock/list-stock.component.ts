import { Component, OnInit } from '@angular/core';
import { StockService } from '../services/stock.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-stock',
  templateUrl: './list-stock.component.html',
  styleUrls: ['./list-stock.component.css']
})
export class ListStocksComponent implements OnInit {

  stocks: any[] = [];
  isLoading = false;
  errorMessage = '';

  sortField = 'id';
  sortOrder = 'asc';
  currentPage = 1;
  totalPages = 1;

  constructor(private stockService: StockService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadStocks();
  }

  loadStocks() {
    this.isLoading = true;
    this.errorMessage = '';

    this.stockService.listStocks(this.sortField, this.sortOrder, this.currentPage).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.stocks = res.data;
        if (res.totalPages) this.totalPages = res.totalPages;
      },
      error: (err: any) => {
        this.isLoading = false;
        if (err.status === 403) {
          this.errorMessage = '❌ Access denied. Please login again.';
        } else if (err.message) {
          this.errorMessage = `❌ ${err.message}`;
        } else {
          this.errorMessage = '❌ Failed to load stocks.';
        }
      }
    });
  }

  goToCreate() {
    this.router.navigate(['/stocks/create']);
  }

  goToUpdate(id: number) {
    this.router.navigate(['/stocks/update', id]);
  }

  goToView(stock: any) {
    this.router.navigate(['/stocks/view', stock.id]);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
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

  deleteStock(id: number) {
    if (!confirm('Are you sure you want to delete this stock?')) return;

    this.stockService.deleteStock(id).subscribe({
      next: () => this.loadStocks(),
      error: (err: any) => {
        if (err?.errors) {
          this.errorMessage = Object.values(err.errors).join(', ');
        } else {
          this.errorMessage = err.message || 'Delete failed.';
        }
      }
    });
  }

  // Pagination
  goToPage(page: number) {
    if (page < 1 || (this.totalPages && page > this.totalPages)) return;
    this.currentPage = page;
    this.loadStocks();
  }

  // Sorting
  changeSort(field: string) {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }
    this.loadStocks();
  }
}
