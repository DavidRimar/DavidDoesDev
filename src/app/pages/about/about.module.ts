import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutPageComponent } from './about-page.component';
import { SocialMediaLinkModule } from '../../components/social-media-links/social-media-link.module';

@NgModule({
  declarations: [AboutPageComponent],
  imports: [
    CommonModule,
    SocialMediaLinkModule  // Import the module to use app-social-media-link in this component
  ]
})
export class AboutModule { }
