import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private key: string =  '4IWMQSHST07EZSG8';
  
  private stockSubject = new Subject<string>();

  public stock$ = this.stockSubject.asObservable();

  
  constructor(private http:HttpClient) { }
  
  // public fetchData$(stock: string): Observable<any> {
  //   console.log('I have been called from inside of the service');
  //   let url: string = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + stock + '&apikey=' + this.key;
    // let obs = this.http.get(url);
    // return this.http.get(url);
    // let daten: any;
    // let datum: string[] = [];
    // let value: number[] = [];
    // obs.subscribe((response: any) => {
    //   daten = response["Time Series (Daily)"];
    //   for(let i in daten) {
    //     datum.push(i);
    //     value.push(daten[i]['2. high']);
    // }
    //   console.log(datum);
    //   console.log(value);
    // })                 
  // }

  public setStock(stock: string): void {
    console.log('stock set : ', stock);
    this.stockSubject.next(stock);
  }


  public getData$(stockSymbol: string): Observable<any> {
    let url: string = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + stockSymbol + '&apikey=' + this.key;
    return this.http.get(url);
  }
}
