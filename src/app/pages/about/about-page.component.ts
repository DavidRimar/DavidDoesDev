import { Component } from '@angular/core';
import { ContentfulServiceService } from '../../services/contentful-service.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent {

  blogPost$ : Observable<any> | undefined;
  blogPostContent$ : Observable<any> | undefined;

  constructor(private contentfulService: ContentfulServiceService) {}

  ngOnInit(): void {
    this.blogPost$ = this.contentfulService.getById(environment.aboutMeId);
    this.blogPostContent$ = this.contentfulService.getContentById(environment.aboutMeId);
  }
}
