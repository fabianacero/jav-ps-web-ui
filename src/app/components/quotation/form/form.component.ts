import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() productServiceDescription;

  constructor() {
  }

  ngOnInit(): void {
  }

  public onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('form, ', form);
    }
    return false;
  }

}
