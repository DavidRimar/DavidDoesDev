import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BlogPostModule } from '../../components/blog-post/blog-post.module';
import { BlogPageComponent } from './blog-page.component';

const routes: Routes = [
  {
    path: 'blog/:id',
    component: BlogPageComponent
  }
];

@NgModule({
  declarations: [BlogPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BlogPostModule
  ]
})
export class BlogPageModule { }
