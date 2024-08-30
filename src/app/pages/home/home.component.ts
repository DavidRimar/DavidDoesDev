import { Component, OnInit } from '@angular/core';
import { ContentfulServiceService } from '../../services/contentful-service.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlogPost } from '../../models/blog-post.model';  // Import the BlogPost interface

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blogPosts$: Observable<BlogPost[]> | undefined;
  groupedBlogs$: Observable<BlogPost[][]> | undefined;

  constructor(private contentfulService: ContentfulServiceService) {}

  ngOnInit(): void {
    this.blogPosts$ = this.contentfulService.getAllEntries().pipe(
      map((entries: any) => entries as any[]),  // First, cast the unknown type to any[]
      map((entries: any[]) => entries.map(entry => ({
        title: entry.title,
        summary: entry.summary,
        author: entry.author,
        date: entry.date,
      }) as BlogPost))  // Then map to BlogPost[]
    );

    console.log("blogPosts: ", this.blogPosts$);

    this.groupedBlogs$ = this.blogPosts$.pipe(
      map(blogs => this.chunkArray(blogs, 3))
    );
  }

  chunkArray(arr: BlogPost[], chunkSize: number): BlogPost[][] {
    const result: BlogPost[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }
}
