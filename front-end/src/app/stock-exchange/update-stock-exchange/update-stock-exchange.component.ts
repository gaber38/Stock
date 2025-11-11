import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StockExchangeService } from '../services/stock-exchange.service';

@Component({
  selector: 'app-update-stock-exchange',
  templateUrl: './update-stock-exchange.component.html',
  styleUrls: ['./update-stock-exchange.component.css']
})
export class UpdateStockExchangeComponent implements OnInit {

  id!: number;
  name: string = '';
  description: string = '';

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private stockExchangeService: StockExchangeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.stockExchangeService.getStockExchange(this.id).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.name = res.data.name;
        this.description = res.data.description;
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load stock exchange.';
      }
    });
  }

  update() {
    this.isLoading = true;

    const body: any = {};
    if (this.name) body.name = this.name;
    if (this.description) body.description = this.description;

    this.stockExchangeService.updateStockExchange(this.id, body).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/stock-exchanges/list']);
      },
      error: (err: any) => {
        this.isLoading = false;
        if (err?.errors) {
          this.errorMessage = Object.values(err.errors).join(', ');
        } else {
          this.errorMessage = err.message || 'Update failed.';
        }
      }
    });
  }

  cancel() {
    this.router.navigate(['/stock-exchanges/list']);
  }
}
