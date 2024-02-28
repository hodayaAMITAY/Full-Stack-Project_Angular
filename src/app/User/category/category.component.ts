import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { CategoryDetails } from '../models/CategoryDetails';
import { ServiceService } from '../services/service.service';
import { BehaviorSubject } from 'rxjs';
import { UserDetails } from '../models/UserDetails';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent {
  public categoriesToDisplay: {
    categoryDetails: CategoryDetails,
    categoryUpdate: CategoryDetails,
  }[] = [];
  @Input() set categories(categories: CategoryDetails[] | null) {
    if(!!categories){
      this.categoriesToDisplay = categories.map((c) => ({
        categoryDetails: c,
        categoryUpdate: {
          id: c.id,
          name: '',
          registerId: this.userDetails?.id ?? ''
        }
      }))
    }

  }
  @Input() userDetails: UserDetails | null = null;
  newCategory: CategoryDetails;
  constructor(public serviceservice: ServiceService) {
    this.newCategory = {
      id: 0,
      name: '',
      registerId: this.userDetails?.id ?? ''
    };

  }
  addCategory(): void {
    if (this.newCategory.name.trim()) {
      //add to service
      this.serviceservice.addCategory({ ...this.newCategory, registerId: this.userDetails!.id }).subscribe(
        (response) => {
          console.log('this was succ');
          if (response) {
            alert('clip added succ');
          }
          else {
            alert('The email and pass is invalid please try again');
          }
        });
      this.newCategory =
      {
        id: 0,
        name: '',
        registerId: this.userDetails?.id ?? ''
      }
    }
  }
  update(updateCategory:CategoryDetails) {
    if (updateCategory) {
      // Assuming you have implemented a method in CategoryService to update a category
      this.serviceservice.updateCategory(updateCategory).subscribe(
        //return the new category
        (response: any) => {
          console.log('Category updated successfully');
          alert('Category updated successfully');
          // Reset categoryToUpdate
          updateCategory =
          {
            id: 0,
            name: '',
            registerId: this.userDetails?.id ?? ''
          }
        },
        (error: any) => {
          console.error('Error while updating category:', error);
          alert('An error occurred while updating the category. Please try again.');
        });
    } else {
      alert('No category selected for update.');
    }
  }
}