import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BlogPostComponent } from './blog-post.component';

const routes: Routes = [
  {
    path: ':id',
    component: BlogPostComponent
  }
];

@NgModule({
  declarations: [BlogPostComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes) // Child routes for the feature module
  ]
})
export class BlogModule { }
