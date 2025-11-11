import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css']
})
export class CreateStockComponent {
  name = '';
  description = '';
  currentPrice: number | null = null;

  isLoading = false;
  errorMessage = '';
  successMessage = '';
  fieldErrors: any = {};

  constructor(private stockService: StockService, private router: Router) {}

  create() {
    this.isLoading = true;
    this.errorMessage = '';
    this.fieldErrors = {};
    this.successMessage = '';

    const body: any = {
      name: this.name,
      description: this.description,
      currentPrice: this.currentPrice
    };

    this.stockService.createStock(body).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMessage = 'Stock created successfully!';
        this.name = '';
        this.description = '';
        this.currentPrice = null;
        setTimeout(() => this.router.navigate(['/stocks/list']), 1000);
      },
      error: (err: any) => {
        this.isLoading = false;
        if (err?.errors) {
          this.fieldErrors = err.errors;
        } else {
          this.errorMessage = err.message || 'Failed to create stock.';
        }
      }
    });
  }

  goBack() {
    this.router.navigate(['/stocks/list']);
  }
}
