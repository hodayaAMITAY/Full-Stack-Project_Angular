import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './User/login/login.component';
import { RegisterComponent } from './User/register/register.component';
import { FormsModule } from '@angular/forms';
import { ClipComponent } from './User/clip/clip.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './User/logout/logout.component';
import { CategoryComponent } from './User/category/category.component';
import { HomeComponent } from './User/home/home.component';
import { ClipListComponent } from './User/clip-list/clip-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ClipComponent,
    LogoutComponent,
    CategoryComponent,
    HomeComponent,
    ClipListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
