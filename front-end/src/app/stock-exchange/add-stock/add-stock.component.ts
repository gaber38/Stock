import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StockExchangeService } from '../services/stock-exchange.service';
import { StockService } from '../../stock/services/stock.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {

  stockExchangeId!: number;
  stocks: any[] = [];
  selectedStockId: number | null = null;

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stockExchangeService: StockExchangeService,
    private stockService: StockService
  ) { }

  ngOnInit(): void {
    this.stockExchangeId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadStocks();
  }

  loadStocks() {
    this.isLoading = true;
    this.stockService.listStocks().subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.stocks = res.data;
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = err.message || 'Failed to load stocks';
      }
    });
  }

  addStock() {
    if (!this.selectedStockId) {
      this.errorMessage = 'Please select a stock';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.stockExchangeService.addStockToExchange(this.stockExchangeId, this.selectedStockId).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Stock added successfully!';
        setTimeout(() => this.router.navigate(['/stock-exchanges/view', this.stockExchangeId]), 1000);
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = err.message || 'Failed to add stock';
      }
    });
  }

  cancel() {
    this.router.navigate(['/stock-exchanges/list']);
  }

}
