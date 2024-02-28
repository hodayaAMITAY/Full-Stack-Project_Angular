import { ChangeDetectionStrategy, ChangeDetectorRef, Component,OnInit } from '@angular/core';
import { BehaviorSubject, Observable, filter, map, switchMap } from 'rxjs';
import { ClipDetails } from '../models/ClipDetails';
import { ServiceService } from '../services/service.service';
import { UserDetails } from '../models/UserDetails';
import { CategoryDetails } from '../models/CategoryDetails';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit{
  public userDetails: Observable<UserDetails> ;
  public allusercategories: Observable<CategoryDetails[]> ;
  public alluserclips: Observable<ClipDetails[]> ;


 
 constructor(private service:ServiceService, private cdRef: ChangeDetectorRef){
  this.userDetails = this.service.getUserData();
  this.allusercategories = this.service.getCategoriesData();
  this.alluserclips = this.service.getKlipsData();
  this.userDetails.pipe(
    filter(user => !!user?.id),
      //hear want list of klip and not user he change user at klip
    switchMap((user) => {
      return this.service.getClip(user!.id)
    })
  ).subscribe()
 }
ngOnInit()
{

  // this.userKlip.next([]);
  //return all arr from service into mistane
//   this.userDetails.pipe(
//     filter(user => !!user?.id),
//       //hear want list of klip and not user he change user at klip
//     switchMap((user) => {
//       return this.service.getClip(user!.id)
//     })
//   ).subscribe((x) => this.userKlip.next(x));
// ;

  this.userDetails.pipe(
    filter(user => !!user?.id),
      //hear want list of klip and not user he change user at klip
    switchMap((user) => {
      return this.service.GetCategory(user!.id)
    })
  ).subscribe();
  // this.userCategory.subscribe((k) => console.log('categories', k));
  // this.service.getClip(this.userDetails?.value?.userid ?? 0).subscribe(this.userKlip)
 }

}
