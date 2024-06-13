import { Component, OnInit } from '@angular/core';
import { ContentfulServiceService } from '../../services/contentful-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

    constructor(private contentfulService: ContentfulServiceService) {}

    blogPosts$ : Observable<any> | undefined

    ngOnInit(): void {
      this.blogPosts$ = this.contentfulService.getAllEntries();
    }
}
