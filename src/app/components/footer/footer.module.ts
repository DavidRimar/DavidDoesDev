import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { SocialMediaLinkModule } from '../social-media-links/social-media-link.module';

@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    SocialMediaLinkModule
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }
