import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'blog',
    loadChildren: () => import('./components/blog-post/blog-post.component').then(m => m.BlogPostComponent)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about-page.component').then(m => m.AboutPageComponent)
  },
  {
    path: '**',
    redirectTo: '' // Redirect to home for unknown routes
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
