import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BlogPageComponent } from './blog-page.component';
import { BlogPostModule } from '../../components/blog-post/blog-post.module';
import { ButtonComponent } from '../../components/button/button.component';

const routes: Routes = [
  {
    path: '',
    component: BlogPageComponent
  }
];

@NgModule({
  declarations: [BlogPageComponent, ButtonComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BlogPostModule
  ]
})
export class BlogPageModule { }
