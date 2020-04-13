import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../components/base/base.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent extends BaseComponent implements OnInit {

  ngOnInit(): void {
    this.getAllProductsAndServices();
  }

}
