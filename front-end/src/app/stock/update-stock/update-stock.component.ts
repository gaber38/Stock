import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.css']
})
export class UpdateStockComponent implements OnInit {

  id!: number;
  name = '';
  description = '';
  currentPrice: number | null = null;

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private stockService: StockService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadStock();
  }

  loadStock() {
    this.isLoading = true;
    this.stockService.getStock(this.id).subscribe({
      next: (stock: any) => {
        this.isLoading = false;
        // Pre-fill form with model values
        this.name = stock.name;
        this.description = stock.description;
        this.currentPrice = stock.currentPrice;
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load stock data.';
      }
    });
  }

  update() {
    this.isLoading = true;
    const updatedStock = {
      name: this.name,
      description: this.description,
      currentPrice: this.currentPrice
    };

    this.stockService.updateStock(this.id, updatedStock).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Stock updated successfully!';
        setTimeout(() => this.router.navigate(['/stocks/list']), 1000);
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Update failed.';
      }
    });
  }

  cancel() {
    this.router.navigate(['/stocks/list']);
  }
}
