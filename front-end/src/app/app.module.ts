import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateStockExchangeComponent } from './stock-exchange/create-stock-exchange/create-stock-exchange.component';
import { UpdateStockExchangeComponent } from './stock-exchange/update-stock-exchange/update-stock-exchange.component';
import { DeleteStockExchangeComponent } from './stock-exchange/delete-stock-exchange/delete-stock-exchange.component';
import { ListStockExchangesComponent } from './stock-exchange/list-stock-exchanges/list-stock-exchanges.component';
import { RemoveStockComponent } from './stock-exchange/remove-stock/remove-stock.component';
import { ViewStockExchangeComponent } from './stock-exchange/view-stock-exchange/view-stock-exchange.component';
import { ViewStockComponent } from './stock/view-stock/view-stock.component';
import { DeleteStockComponent } from './stock/delete-stock/delete-stock.component';
import { UpdateStockComponent } from './stock/update-stock/update-stock.component';
import { CreateStockComponent } from './stock/create-stock/create-stock.component';
import { ListStocksComponent } from './stock/list-stock/list-stock.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddStockComponent } from './stock-exchange/add-stock/add-stock.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CreateStockExchangeComponent,
    UpdateStockExchangeComponent,
    DeleteStockExchangeComponent,
    ListStockExchangesComponent,
    ViewStockExchangeComponent,
    ViewStockComponent,
    ListStocksComponent,
    CreateStockComponent,
    UpdateStockComponent,
    DeleteStockComponent,
    DashboardComponent,
    AddStockComponent,
    RemoveStockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
