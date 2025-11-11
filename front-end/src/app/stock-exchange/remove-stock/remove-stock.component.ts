import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StockExchangeService } from '../services/stock-exchange.service';

@Component({
  selector: 'app-remove-stock',
  templateUrl: './remove-stock.component.html',
  styleUrls: ['./remove-stock.component.css']
})
export class RemoveStockComponent implements OnInit {

  stockExchangeId!: number;
  stocks: any[] = []; // Stocks currently associated with this exchange
  selectedStockId: number | null = null;

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stockExchangeService: StockExchangeService
  ) { }

  ngOnInit(): void {
    this.stockExchangeId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadStockExchangeStocks();
  }

  loadStockExchangeStocks() {
    this.isLoading = true;
    this.stockExchangeService.getStockExchange(this.stockExchangeId).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.stocks = res.data.stocks || [];
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = err.message || 'Failed to load stocks';
      }
    });
  }

  removeStock() {
    if (!this.selectedStockId) {
      this.errorMessage = 'Please select a stock to remove';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.stockExchangeService.removeStockFromExchange(this.stockExchangeId, this.selectedStockId).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Stock removed successfully!';
        this.loadStockExchangeStocks(); // refresh the list
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = err.message || 'Failed to remove stock';
      }
    });
  }

  cancel() {
    this.router.navigate(['/stock-exchanges/list']);
  }

}
