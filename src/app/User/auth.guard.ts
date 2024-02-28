import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { ServiceService } from './services/service.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(private authService: ServiceService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // User is logged in, allow access to the route
    } else {
      this.router.navigate(['/login']); // User is not logged in, navigate to login page
      return false; // Prevent access to the route
    }
  }
}