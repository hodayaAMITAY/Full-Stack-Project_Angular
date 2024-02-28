import { Component,OnInit  } from '@angular/core';
import { LoginDetails } from '../models/LoginDetails';
import { ServiceService } from '../services/service.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ResetPassDetails } from '../models/ResetPassDetails';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit{
  login : LoginDetails;
  r : ResetPassDetails;
  //public users = ['aaa', 'bbb']
  subscription?: Subscription;
  public displaySignIn$$ = new BehaviorSubject<boolean>(false);
  public displayRegister$$ = new BehaviorSubject<boolean>(false);
  public displayReset$$ = new BehaviorSubject<boolean>(false);
  constructor(private serviceService: ServiceService,private _router: Router){
    this.login = {
      UserName :'',
      Password :''
    };
    this.r={
    UserName : '',
    OldPassword : '',
    NewPassword : ''
    };
  }
  ngOnInit(): void {
    console.log("on init");
  }
  onSubmit()
  {
    // this.subscription = this.serviceService.Login(this.login).subscribe((response) => {
    //   if(response.ok){
    //     this._router.navigate(['home'])
    //   }
    // })
  }
  public Signin($event: any)
  {
    this.displaySignIn$$.next(true);
  }
  onFormSubmit(){
    this.subscription = this.serviceService.Login(this.login).subscribe(
     (response)=>{
           console.log('this was succ');
          if(response)
          {
            this._router.navigate(['home']);
          }
          else
          {
            alert('The email and pass is invalid please try again');
          }
    })
    
   } 
    Register()
  {
    this.displayRegister$$.next(true);
  }
  ResetPassword()
  {
    this.displayReset$$.next(true);
  }
  public resetPassword()
  {
    this.serviceService.resetPassword(this.r).subscribe(
      (response) => {
        alert('Password reset link sent to your email.');
        // Optionally, navigate the user to another page
      },
      (error) => {
        // Handle password reset error
        alert('Failed to reset password. Please try again later.');
      }
    )
  }
}
