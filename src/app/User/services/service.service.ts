import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddRegisterRequest } from '../models/AddRegisterRequest';
import { Observable } from 'rxjs/internal/Observable';
import { LoginDetails } from '../models/LoginDetails';
import { Router } from '@angular/router';
import { ClipDetails } from '../models/ClipDetails';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { UserDetails } from '../models/UserDetails';
import { CategoryDetails } from '../models/CategoryDetails';
import { sha256 } from 'js-sha256';
import { ResetPassDetails } from '../models/ResetPassDetails';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private userSubject = new BehaviorSubject<UserDetails>({
    email: '',
    firstName: '',
    id: '',
    lastName: '',
    password: ''
  });



  private klips = new BehaviorSubject<ClipDetails[]>([]);
  private categories = new BehaviorSubject<CategoryDetails[]>([]);
  onLoginSuccess(userData: any) {
    //enter to user details like clip
    this.userSubject.next(userData);
  }

  getUserData() {
    //every compo that want get user use to this func
    return this.userSubject.asObservable();
  }
  getKlipsData() {
    //every compo that want get user use to this func
    return this.klips.asObservable();
  }
  getCategoriesData() {
    //every compo that want get user use to this func
    return this.categories.asObservable();
  }

  clips: string[] = [];
  public apiUrl = "https://localhost:7288/api"
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*'
    })
  };
  constructor(private http: HttpClient, private router: Router) { }
  addRegister(model: AddRegisterRequest): Observable<UserDetails> {
    const hashedPassword = sha256(model.password);
    const ModelToSEnd = {
     ...model,
     password: hashedPassword
    }
    return this.http.post<UserDetails>(`${this.apiUrl}/Register/Register`, ModelToSEnd).pipe(
      tap((user) => {
        if (!!user) {
          this.onLoginSuccess(user);
        }
      })
    )
  }
  resetPassword(r: ResetPassDetails): Observable<void> {
    const hashedoldPassword = sha256(r.OldPassword);
    const hashednewPassword = sha256(r.NewPassword);
    const ResetToSEnd = {
     ...r,
     oldpassword: hashedoldPassword,
     newpassword:hashednewPassword
    }
    return this.http.post<any>(`${this.apiUrl}/Register/resetPassword`, ResetToSEnd);
  }


  Login(login: LoginDetails): Observable<UserDetails> {
     const hashedPassword = sha256(login.Password);
     const loginToSEnd = {
      ...login,
      Password: hashedPassword
     }
    return this.http.post<UserDetails>(`${this.apiUrl}/Register/Login`, loginToSEnd, this.httpOptions).pipe(
      tap((user) => {
        if (!!user) {
          this.onLoginSuccess(user);
        }
      }),
      tap(response => {
        // Assuming the server response contains a token upon successful login
        if (response && response.email) {
          localStorage.setItem('token', response.email);
        }
      })

    );
  }
  isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}
  addClip(Clip: ClipDetails): Observable<ClipDetails> {
    return this.http.post<ClipDetails>(`${this.apiUrl}/klip/Klip`, Clip).pipe(
      tap((clip) => {
        if (!!clip) {
          this.klips.next([...this.klips.value, clip])
        }
      })
    );;
  }

  deleteClip(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Klip/${id}`).pipe(
      tap(() =>
        
          this.klips.next([...this.klips.value.filter(c => c.id != id)])
        
      )
    );;
  }

  getClip(userid: string): Observable<ClipDetails[]> {
    return this.http.get<ClipDetails[]>(`${this.apiUrl}/klip/${userid}`).pipe(
      tap((klips) => {
        if (!!klips) {
          this.klips.next(klips)
        }
      })
    );
  }

  // getClip(): Observable<ClipDetails[]> {
  //   return this.http.get<ClipDetails[]>(this.apiUrl);
  // }


  logout(): void {
    this.router.navigateByUrl('/login');
    localStorage.removeItem('token');
  }

  GetCategory(userid: string): Observable<CategoryDetails[]> {
    return this.http.get<CategoryDetails[]>(`${this.apiUrl}/categories/${userid}`).pipe(
      tap((categories) => {
        if (!!categories) {
          this.categories.next(categories)
        }
      })
    );
  }
  // getCategories(): Observable<CategoryDetails[]> {
  //   return this.http.get<CategoryDetails[]>(`${this.apiUrl}/categories`);
  // }

  addCategory(category: CategoryDetails): Observable<CategoryDetails> {
    return this.http.post<CategoryDetails>(`${this.apiUrl}/categories`, category).pipe(
      tap((category) => {
        if (!!category) {
          this.categories.next([...this.categories.value, category])
        }
      })
    );;
  }

  updateCategory(category: CategoryDetails): Observable<CategoryDetails> {
    return this.http.put<CategoryDetails>(`${this.apiUrl}/categories/${category.id}`, category).pipe(
      tap((category) => {
        if (!!category) {
          this.categories.next([...this.categories.value.filter(c => c.id != category.id), category])
        }
      })
    );;
  }

  sendEmail(registerId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Email/send`, registerId);
  }
}
