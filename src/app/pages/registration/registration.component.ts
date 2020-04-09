import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Customer} from '../../models/customer';
import {Router} from '@angular/router';
import {Routes} from '../../enums/routes.enum';
import {RegistrationService} from '../../provider/registration/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public model: Customer;
  public routes = Routes;

  constructor(private registration: RegistrationService, private router: Router) {
  }

  ngOnInit(): void {
    this.model = new Customer();
    this.model.documentType = 1;
  }

  public onSubmit(registerForm: NgForm) {
    if (!registerForm.valid) {
      return false;
    }

    this.registration.customerRegistry(registerForm).subscribe((response: any) => {
      alert('Usuario creado correctamente!');
      this.router.navigate([Routes.LOGIN]);
    }, (error) => {
      registerForm.form.controls.userName.setErrors({incorrect: true});
      return false;
    });

  }
}
