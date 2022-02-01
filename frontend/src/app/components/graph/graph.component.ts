import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { first, Subject, takeUntil } from 'rxjs';
import { StockService } from 'src/app/services/stock.service';
import * as d3 from 'd3';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, OnDestroy {
  private destroySubject = new Subject<void>();
  public data: { value: number; date: string; }[] = [];
  show :boolean =  true;
  public stockSymbol: string = "The";

  private svg:any;
  private margin = 50;
  private width = 1000 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor(private stockService: StockService) {
  }
  
  ngOnInit(): void {
    this.stockService.stock$.pipe(takeUntil(this.destroySubject)).subscribe(value => {
      console.log('value from graph component: ', value);
      this.stockSymbol = value;
      this.stockService.getData$(value).pipe(takeUntil(this.destroySubject)).subscribe(res => {
        console.log('Fetched data: ', res);
        let temp = res["Time Series (Daily)"];
        for(let i in temp) {
          let temp2 = {value: temp[i]['2. high'], date: i};
          this.data.push(temp2);
        }
        console.log("Bearbeitete daten: ", this.data);
        if (this.show === true) {
          this.createSvg();
          this.drawBars(this.data);
          this.show = false;
        }
      })
    });
  }


  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.unsubscribe();
    this.data = [];
    this.show = true;
  }

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
}


private drawBars(data: { value: number; date: string; }[]): void {
  // Create the X-axis band scale
  const x = d3.scaleBand()
  .range([0, this.width])
  .domain(data.map(d => d.date))
  .padding(0.5);

  // Draw the X-axis on the DOM
  this.svg.append("g")
  .attr("transform", "translate(0," + this.height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-90)")
  .style("text-anchor", "end");

  // Create the Y-axis band scale
  const y = d3.scaleLinear()
  .domain([0, 300])
  .range([this.height, 0]);

  // Draw the Y-axis on the DOM
  this.svg.append("g")
  .call(d3.axisLeft(y));

  // Create and fill the bars
  this.svg.selectAll("bars")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", (d: { date: string; }) => x(d.date))
  .attr("y", (d: { value: d3.NumberValue; }) => y(d.value))
  .attr("width", x.bandwidth())
  .attr("height", (d: { value: d3.NumberValue; }) => this.height - y(d.value))
  .attr("fill", "#00aaa0");
}
}
