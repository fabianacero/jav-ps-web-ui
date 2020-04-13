import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../components/base/base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {

  ngOnInit(): void {
    this.getAllProductsAndServices();
  }
}
