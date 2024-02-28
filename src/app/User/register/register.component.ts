import { Component } from '@angular/core';
import { AddRegisterRequest } from '../models/AddRegisterRequest';
import { Subscription, catchError } from 'rxjs';
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  //im have mistane grom this type
  model: AddRegisterRequest;
  //? its for null or value
  private addCategorySubscription?: Subscription

  constructor(private serviceService: ServiceService, private route: Router) {
    this.model = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  }

  onFormSubmit() {
    this.addCategorySubscription = this.serviceService.addRegister(this.model)
      .subscribe(
        (_) => {

          this.route.navigate(['home']);

        }, (error) => {
          alert('this failed please try again' + '' + error);
        })

  }
  // ngOnDestroy(): void {
  //   throw new Error('Method not implemented.');
  // }

}
