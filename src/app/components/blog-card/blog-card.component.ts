import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent {
  @Input() title!: string;
  @Input() image!: string;
  @Input() summary!: string;
  @Input() author!: string;
  @Input() dateUpdated!: string;
  @Input() id!: string;
  @Input() urlHandle!: string;
  @Input() altText: string = '';
}
