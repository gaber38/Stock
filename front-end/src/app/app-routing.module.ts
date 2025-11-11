import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ListStockExchangesComponent } from './stock-exchange/list-stock-exchanges/list-stock-exchanges.component';
import { CreateStockExchangeComponent } from './stock-exchange/create-stock-exchange/create-stock-exchange.component';
import { UpdateStockExchangeComponent } from './stock-exchange/update-stock-exchange/update-stock-exchange.component';
import { ViewStockExchangeComponent } from './stock-exchange/view-stock-exchange/view-stock-exchange.component';
import { DeleteStockExchangeComponent } from './stock-exchange/delete-stock-exchange/delete-stock-exchange.component';
import { ViewStockComponent } from './stock/view-stock/view-stock.component';
import { CreateStockComponent } from './stock/create-stock/create-stock.component';
import { UpdateStockComponent } from './stock/update-stock/update-stock.component';
import { DeleteStockComponent } from './stock/delete-stock/delete-stock.component';
import { ListStocksComponent } from './stock/list-stock/list-stock.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RemoveStockComponent } from './stock-exchange/remove-stock/remove-stock.component';
import { AddStockComponent } from './stock-exchange/add-stock/add-stock.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'stock-exchanges/list', component: ListStockExchangesComponent },
  { path: 'stock-exchange/create', component: CreateStockExchangeComponent },
  { path: 'stock-exchange/update/:id', component: UpdateStockExchangeComponent },
  { path: 'stock-exchange/view/:id', component: ViewStockExchangeComponent },
  { path: 'stock-exchange/delete/:id', component: DeleteStockExchangeComponent },
  { path: 'stocks/view/:id', component: ViewStockComponent },
  { path: 'stocks/list', component: ListStocksComponent },
  { path: 'stocks/create', component: CreateStockComponent },
  { path: 'stocks/update/:id', component: UpdateStockComponent },
  { path: 'stocks/delete/:id', component: DeleteStockComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'stock-exchanges/add-stock/:id', component: AddStockComponent },
  { path: 'stock-exchanges/remove-stock/:id', component: RemoveStockComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
