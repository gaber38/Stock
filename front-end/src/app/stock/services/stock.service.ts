import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private baseUrl = 'http://localhost:8080/stocks';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  createStock(data: { name: string; description: string; currentPrice: number }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, data, { headers: this.getAuthHeaders(), observe: 'response' }).pipe(
      map(res => res.body),
      catchError(err => throwError(err.error || { message: 'Failed to create stock.' }))
    );
  }

  listStocks(sortField: string = 'id', sortOrder: string = 'asc', page: number = 1): Observable<any> {
    const url = `${this.baseUrl}/list?sortField=${sortField}&sortOrder=${sortOrder}&page=${page}`;
    return this.http.get<any>(url, { headers: this.getAuthHeaders(), observe: 'response' }).pipe(
      map(res => res.body),
      catchError(err => throwError(err.error || { message: 'Failed to load stocks.' }))
    );
  }

  updateStock(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, data, { headers: this.getAuthHeaders(), observe: 'response' }).pipe(
      map(res => res.body),
      catchError(err => throwError(err.error || { message: 'Failed to update stock.' }))
    );
  }

  deleteStock(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { headers: this.getAuthHeaders(), observe: 'response' }).pipe(
      map(res => res.body),
      catchError(err => throwError(err.error || { message: 'Failed to delete stock.' }))
    );
  }

  getStock(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders(), observe: 'response' }).pipe(
      map(res => res.body),
      catchError(err => throwError(err.error || { message: 'Failed to fetch stock.' }))
    );
  }
}
