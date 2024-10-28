import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
 // {
 //   path: 'blog',
 //   loadChildren: () => import('./components/blog-post/blog-post.component').then(m => m.BlogPostComponent)
 // },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule)
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
