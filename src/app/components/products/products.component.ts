import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
  export class ProductsComponent implements OnInit, AfterViewInit {

  @Input() products: {};
  @Input() category: number;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

}
