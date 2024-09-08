import { NgModule } from '@angular/core';  // <-- Add this import
import { CommonModule } from '@angular/common';  // Required for Angular directives like *ngIf, *ngFor
import { BlogCardComponent } from './blog-card.component';  // Import your BlogCardComponent
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [BlogCardComponent],
  exports: [BlogCardComponent],  // Export the component
  imports: [CommonModule, MatCardModule]
})
export class BlogCardModule { }
