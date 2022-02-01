import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public myWishList: string[] = [];
  public inputStock: string = "";

  private key: string =  '4IWMQSHST07EZSG8';
  //private symbol: string = 'AAPL';
  //private daten: any = {}
  //private datum: string[] = [];
  //private value: number[] = [];

  constructor(private http: HttpClient, private stockService: StockService) { }

  
  addStock(): void {
    if (this.inputStock !== "") {
      this.myWishList.push(this.inputStock);
      this.inputStock = "";
    }
    console.log(this.myWishList);
  }
  
  delete(id: number): void {
    this.myWishList = this.myWishList.filter((v, i)=> i!==id);
  }

  ngOnInit(): void {
  }
/*
  fetchData(stock: string): void {
    console.log(stock);
    this.stockService.setSymbol(stock);
    // let url: string = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + stock + '&apikey=' + this.key;
    // let obs = this.http.get(url);
    // let daten: any;
    // let datum: string[] = [];
    // let value: number[] = [];
    // obs.subscribe((response: any) => {
    //   daten = response["Time Series (Daily)"];
    //   for(let i in daten) {
    //     datum.push(i); doch kollege
    //     value.push(daten[i]['2. high']);
    // }
    //   console.log(datum);
    //   console.log(value);
    // })                 
  }*/

  setStock(stock: string): void {
    this.stockService.setStock(stock);
  }
  //  public getData(stockSymbol: string): void {
  //    this.stockService.getData(stockSymbol);
  //  }
}
