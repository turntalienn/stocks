import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' //returns rxJs observables

let stocks: Array<string> = ['AAPL', 'GOOG', 'FB', 'AMZN', 'TWTR'];
let service: string = 'https://angular2-in-action-api.herokuapp.com'; //API endpoint URL

//interface for a stock object
export interface StockInterface {
  symbol: string;
  lastTradePriceOnly: number;
  change: number;
  changeInPercent: number;
}

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  constructor(private http: HttpClient) { }

  //method to get the stocks.
  get() {
    return stocks.slice();
  }

  //method to add a new stock to list.
  add(stock: any) {
    stocks.push(stock);
    return this.get();
  }

  //method to remove a stock from list.
  remove(stock: any) {
    stocks.splice(stocks.indexOf(stock), 1);
    return this.get();
  }

  //method to call HttpClient service to load stock values from API
  load(symbols: any) {
    if (symbols) {
      return this.http.get<Array<StockInterface>>(service + '/stocks/snapshot?symbols =' + symbols.join());
    }
  }
}
