import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialMediaLinkComponent } from './social-media-link.component';

@NgModule({
  declarations: [SocialMediaLinkComponent],
  exports: [SocialMediaLinkComponent],  // Export the component so it can be used in other modules
  imports: [CommonModule]  // Import CommonModule to use directives like *ngIf and *ngFor
})
export class SocialMediaLinkModule { }
