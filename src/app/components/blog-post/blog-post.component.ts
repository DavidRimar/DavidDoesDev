import { Component, OnInit, Input, ElementRef, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-csharp';
import 'prismjs/themes/prism-okaidia.css';

import { ContentfulServiceService } from '../../services/contentful-service.service';
import { BlogPost } from '../../models/blog-post.model';
import { BlogPostContent } from '../../models/blog-post-content.model';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BlogPostComponent implements OnInit, AfterViewChecked {
  @Input() urlHandle!: string;

  blogPost$: Observable<BlogPost> | undefined;
  blogPostContent$: Observable<SafeHtml> | undefined;

  private highlighted = false;

  constructor(
    private contentfulService: ContentfulServiceService,
    private sanitizer: DomSanitizer,
    private elRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.blogPost$ = this.contentfulService.getByUrlHandle(this.urlHandle).pipe(
      map((entry: any) => ({
        title: entry.fields.title || 'No title'
      }) as BlogPost)
    );

    this.blogPostContent$ = this.contentfulService.getContentByUrlHandle(this.urlHandle).pipe(
      map((entry: any) => {
        let content: string = entry || 'No content';
        // Add a default language class to <code> tags if not present
        content = content.replace(/<code(?![^>]*class=")/g, '<code class="language-csharp"');
        return this.sanitizer.bypassSecurityTrustHtml(content);
      })
    );
  }

  ngAfterViewChecked(): void {
    if (!this.highlighted) {
      setTimeout(() => {
        Prism.highlightAll();
        this.highlighted = true;
        console.log('Prism highlighting done');
      }, 0);
    }
  }
}
