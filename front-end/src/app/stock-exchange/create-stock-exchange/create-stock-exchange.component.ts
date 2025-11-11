import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StockExchangeService } from '../services/stock-exchange.service';

@Component({
  selector: 'app-create-stock-exchange',
  templateUrl: './create-stock-exchange.component.html',
  styleUrls: ['./create-stock-exchange.component.css']
})
export class CreateStockExchangeComponent {
  name: string = '';
  description: string = '';
  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  fieldErrors: any = {}; // to show validation errors

  constructor(private service: StockExchangeService, private router: Router) { }

  create() {
    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.fieldErrors = {};

    this.service.createStockExchange({ name: this.name, description: this.description }).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = '✅ Stock Exchange created successfully! Redirecting...';

        // Navigate to list page
        setTimeout(() => {
          this.router.navigate(['/stock-exchanges/list']);
        }, 1500);
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 403) {
          this.errorMessage = '❌ Access denied. Please login again.';
        } else if (err.code === 'ERR006') {
          this.errorMessage = err.errors['detailed message'] || '❌ Name already exists.';
        } else if (err.code === 'ERR007') {
          this.fieldErrors = err.errors || {};
        } else {
          this.errorMessage = '❌ Failed to create. Please try again.';
        }
      }
    });
  }

  goBack() {
    this.router.navigate(['/stock-exchanges/list']);
  }
}
