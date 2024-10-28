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

    this.blogPosts$ = this.contentfulService.getByCategory('SQL').pipe(
      map((entries: any) => {

        if (entries) {
          return entries.map((item: any) => ({
            title: item.fields.title || 'No title',
            summary: item.fields.summary || 'No summary',
            featuredImage: item.fields.featuredImage?.fields?.file?.url || 'No image', // Handle missing featuredImage
            author: item.fields.author || 'Unknown author', // Handle missing author
            dateUpdated: this.formatDate(item.fields.dateUpdated),
            category: item.fields.category
          }) as BlogPost);
        } else {
          throw new Error('Unexpected data structure');
        }
      })
    );

    this.groupedBlogs$ = this.blogPosts$.pipe(
      map(blogs => this.chunkArray(blogs, 3))
    );
  }

  private chunkArray(arr: BlogPost[], chunkSize: number): BlogPost[][] {
    const result: BlogPost[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    };
    return new Intl.DateTimeFormat('en-GB', options).format(date).toUpperCase();
  }
}
