import { ChangeDetectionStrategy, Component,Input,OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { ClipDetails } from '../models/ClipDetails';
import { UserDetails } from '../models/UserDetails';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CategoryDetails } from '../models/CategoryDetails';

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrl: './clip.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClipComponent implements OnInit{
   @Input() Clips:ClipDetails[] | null = [];
   @Input() categories:CategoryDetails[] | null = [];

   @Input() userDetails:UserDetails|null=null;
   newClip:ClipDetails;


  // clipLink: string = '';
  
  constructor(public serviceservice: ServiceService, private sanitizer: DomSanitizer) {
    this.newClip={
      id:0,
      categoryid:0,
      url:'',
      registerId: this.userDetails?.id ?? "",
    };
  }
  ngOnInit() {

  }

 
    
 

  addClip(): void {
    if (this.newClip.url.trim()) {
        //add to service
      this.serviceservice.addClip({ ...this.newClip,  registerId: this.userDetails?.id ?? ""}).subscribe(
        (response)=>{
              console.log('this was succ');
             if(response)
             {
               alert('clip added succ');
             }
             else
             {
               alert('The email and pass is invalid please try again');
             }
       });
      this.newClip=
      {
        id:0,
        registerId: this.userDetails?.id ?? "",
        url:'',
        categoryid :0,
    }
  }
  }
  deleteClip(id: number): any {
    this.serviceservice.deleteClip(id).subscribe( (response)=>{
      console.log('this was succ');
     if(response)
     {
       alert('clip added succ');
     }
     else
     {
       alert('The email and pass is invalid please try again');
     }
});;
  } 
  }