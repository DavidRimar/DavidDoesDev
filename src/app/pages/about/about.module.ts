import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './about-page.component';
import { SocialMediaLinkModule } from '../../components/social-media-links/social-media-link.module';

const routes: Routes = [
  {
    path: '',
    component: AboutPageComponent
  }
];

@NgModule({
  declarations: [AboutPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),  // Use RouterModule.forChild to add routing in feature modules
    SocialMediaLinkModule  // Import module for social media links
  ]
})
export class AboutModule { }
