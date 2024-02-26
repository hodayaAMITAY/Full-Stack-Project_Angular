import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './User/login/login.component';
import { RegisterComponent } from './User/register/register.component';
import { LogoutComponent } from './User/logout/logout.component';
import { ClipComponent } from './User/clip/clip.component';
import { CategoryComponent } from './User/category/category.component';
import { HomeComponent } from './User/home/home.component';

const routes: Routes = [
//   {path: '', redirectTo: 'login', pathMatch: 'full' },
//   //this page will show login and register
// { path: 'login', component: LoginComponent },
//hear will be klip and category
//{path: '/Home', component: HomeComponent },

{ path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home/clip', component: ClipComponent },
  { path: 'home/category', component: CategoryComponent},
  { path: 'home', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
