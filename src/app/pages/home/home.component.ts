import { Component, OnInit } from '@angular/core';
import { ContentfulServiceService } from '../../services/contentful-service.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlogCard } from '../../models/blog-card.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  blogPosts$: Observable<BlogCard[]> | undefined;
  groupedBlogs$: Observable<BlogCard[][]> | undefined;

  constructor(private contentfulService: ContentfulServiceService) {}

  ngOnInit(): void {

    this.blogPosts$ = this.contentfulService.getByCategory('SQL').pipe(
      map((entries: any) => {

        if (entries) {

          console.log('entries', entries);

          return entries.map((item: any) => ({
            id: item.sys.id,
            title: item.fields.title || 'No title',
            summary: item.fields.summary || 'No summary',
            featuredImage: `${item.fields.featuredImage?.fields?.file?.url}?w=340&q=100&fm=webp` || 'No image',
            author: item.fields.author || 'Unknown author',
            dateUpdated: this.formatDate(item.fields.dateUpdated),
            category: item.fields.category,
            urlHandle: item.fields.urlHandle
          }) as BlogCard);

        } else {
          throw new Error('Unexpected data structure');
        }
      })
    );

    this.groupedBlogs$ = this.blogPosts$.pipe(
      map(blogs => this.chunkArray(blogs, 3))
    );
  }

  private chunkArray(arr: BlogCard[], chunkSize: number): BlogCard[][] {
    const result: BlogCard[][] = [];
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
