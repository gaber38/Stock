import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockExchangeService } from '../services/stock-exchange.service';

@Component({
  selector: 'app-view-stock-exchange',
  templateUrl: './view-stock-exchange.component.html',
  styleUrls: ['./view-stock-exchange.component.css']
})
export class ViewStockExchangeComponent implements OnInit {

  id!: number;
  stock: any;
  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private stockExchangeService: StockExchangeService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadStock();
  }

  loadStock() {
    this.isLoading = true;
    this.errorMessage = '';

    this.stockExchangeService.getStockExchange(this.id)
      .subscribe({
        next: (data: any) => {
          this.isLoading = false;
          this.stock = data;
        },
        error: (err: any) => {
          this.isLoading = false;
          if (err?.errors) {
            this.errorMessage = Object.values(err.errors).join(', ');
          } else {
            this.errorMessage = err.message || 'Failed to load item.';
          }
        }
      });
  }
}
