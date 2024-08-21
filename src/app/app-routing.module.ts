import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { AboutPageComponent } from './pages/about/about-page/about-page.component';

const routes: Routes = [
  {
    path: '',
    component: AboutPageComponent
  },
  {
    path: 'blog/:id',
    component: BlogPostComponent
  },
  {
    path: 'about',
    component: AboutPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
