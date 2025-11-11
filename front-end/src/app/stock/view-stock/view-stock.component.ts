import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-view-stock',
  templateUrl: './view-stock.component.html',
  styleUrls: ['./view-stock.component.css']
})
export class ViewStockComponent implements OnInit {

  id!: number;
  stock: any;
  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private stockService: StockService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadStock();
  }

  loadStock() {
    this.isLoading = true;
    this.errorMessage = '';

    this.stockService.getStock(this.id).subscribe({
      next: (data: any) => {
        this.isLoading = false;
        this.stock = data;
      },
      error: (err: any) => {
        this.isLoading = false;
        if (err?.errors) {
          this.errorMessage = Object.values(err.errors).join(', ');
        } else {
          this.errorMessage = err.message || 'Failed to load stock.';
        }
      }
    });
  }
}
