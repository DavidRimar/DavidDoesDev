import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContentfulServiceService } from '../../services/contentful-service.service';
import { BlogPost } from '../../models/blog-post.model';
import { BlogPostContent } from '../../models/blog-post-content.model';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css'],
})
export class BlogPostComponent implements OnInit {
  @Input() urlHandle!: string;

  blogPost$: Observable<BlogPost> | undefined;
  blogPostContent$: Observable<SafeHtml> | undefined;

  constructor(
    private contentfulService: ContentfulServiceService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.blogPost$ = this.contentfulService.getByUrlHandle(this.urlHandle).pipe(
      map((entry: any) => ({
        title: entry.fields.title || 'No title',
      }) as BlogPost)
    );

    // Pre-process the HTML string:
    this.blogPostContent$ = this.contentfulService
      .getContentByUrlHandle(this.urlHandle)
      .pipe(
        map((entry: any) => {
          let content: string = entry || 'No content';
          // Regex to add a default language if <code> doesn't have one.
          // This assumes code tags look like <code>...</code>
          content = content.replace(
            /<code(?![^>]*class=")/g,
            '<code class="language-csharp"'
          );
          return this.sanitizer.bypassSecurityTrustHtml(content);
        })
      );
  }
}
