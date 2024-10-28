import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-social-media-link',
  templateUrl: './social-media-link.component.html',
  styleUrls: ['./social-media-link.component.css']
})
export class SocialMediaLinkComponent {
  @Input() src!: string;
  @Input() alt!: string;
  @Input() href!: string;
  @Input() width: string = '36px';
  @Input() height: string = '36px';
}
