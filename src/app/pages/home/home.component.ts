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
      map((entries: any) => {

        console.log(entries);  // Inspect the structure of entries

        if (entries.items) {
          return entries.items.map((item: any) => ({
            title: item.fields.title,
            featuredImage: item.fields.featuredImage.fields.file.url,
            summary: item.fields.summary,
            author: item.fields.author,
            dateUpdated: this.formatDate(item.fields.dateUpdated),
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
