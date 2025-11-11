import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StockExchangeService {
  private baseUrl = 'http://localhost:8080/stockexchanges';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  createStockExchange(data: { name: string; description: string }): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/create`,
      data,
      { headers: this.getAuthHeaders(), observe: 'response' }
    ).pipe(
      map(res => res.body),
      catchError(err => {
        let errorPayload: any = {};
        if (err.status === 403) {
          errorPayload = { message: 'Access denied. Please login again.' };
        } else if (err.error) {
          errorPayload = err.error;
        } else {
          errorPayload = { message: 'Operation failed. Please try again.' };
        }
        return throwError(errorPayload);
      })
    );
  }

  // List stock exchanges with paging and sorting
  listStockExchanges(
    sortField: string = 'id',
    sortOrder: string = 'asc',
    page: number = 1
  ): Observable<any> {
    const headers = this.getAuthHeaders();
    const url = `${this.baseUrl}/list?sortField=${sortField}&sortOrder=${sortOrder}&page=${page}`;

    return this.http.get<any>(url, { headers, observe: 'response' }).pipe(
      map(res => res.body),
      catchError(err => {
        let errorPayload: any = {};
        if (err.status === 403) {
          errorPayload = { status: 403, message: 'Access denied. Please login again.' };
        } else if (err.error) {
          errorPayload = err.error;
        } else {
          errorPayload = { message: 'Failed to load stock exchanges.' };
        }
        return throwError(errorPayload);
      })
    );
  }

  updateStockExchange(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, data, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    }).pipe(
      map(res => res.body),
      catchError(err => throwError(err.error || { message: 'Failed' }))
    );
  }

  deleteStockExchange(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    }).pipe(
      map(res => res.body),
      catchError(err => throwError(err.error || { message: 'Failed' }))
    );
  }

  getStockExchange(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    }).pipe(
      map(res => (res.body as any)?.data),
      catchError(err => {
        if (err.status === 403) {
          return throwError({ message: 'Access denied. Please login again.' });
        }
        return throwError(err.error || { message: 'Fetch failed.' });
      })
    );
  }

  addStockToExchange(stockExchangeId: number, stockId: number) {
    const url = `${this.baseUrl}/add_stock/${stockExchangeId}`;
    const body = { stockId };

    return this.http.post<any>(url, body, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    }).pipe(
      map(res => res.body),
      catchError(err => {
        let errorPayload: any = {};
        if (err.status === 400) {
          errorPayload = { message: err.error?.errors?.detailed_message || 'Duplicate item found.' };
        } else if (err.status === 404) {
          errorPayload = { message: err.error?.errors?.detailed_message || 'Item not found.' };
        } else {
          errorPayload = { message: 'Operation failed. Please try again.' };
        }
        return throwError(errorPayload);
      })
    );
  }

  removeStockFromExchange(stockExchangeId: number, stockId: number) {
    const url = `${this.baseUrl}/remove_stock/${stockExchangeId}`;
    const body = { stockId };

    return this.http.post<any>(url, body, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    }).pipe(
      map(res => res.body),
      catchError(err => {
        let errorPayload: any = {};
        if (err.status === 400) {
          errorPayload = { message: err.error?.errors?.detailed_message || 'Stock not associated.' };
        } else if (err.status === 404) {
          errorPayload = { message: err.error?.errors?.detailed_message || 'Item not found.' };
        } else {
          errorPayload = { message: 'Operation failed. Please try again.' };
        }
        return throwError(errorPayload);
      })
    );
  }
}
