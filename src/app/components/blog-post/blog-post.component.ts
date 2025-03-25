import { Component, OnInit, Input, ElementRef, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import Prism from 'prismjs';
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
export class BlogPostComponent implements OnInit {
  @Input() urlHandle!: string;

  blogPost$: Observable<BlogPost> | undefined;
  blogPostContent$: Observable<SafeHtml> | undefined;

  constructor(
    private contentfulService: ContentfulServiceService,
    private sanitizer: DomSanitizer,
    private elRef: ElementRef,
    private cdr: ChangeDetectorRef
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
        // Preprocess: add language class if missing
        content = content.replace(/<code(?![^>]*class=")/g, '<code class="language-csharp"');
        return this.sanitizer.bypassSecurityTrustHtml(content);
      }),
      tap(() => {
        // Force Angular to update view before highlighting
        this.cdr.detectChanges();
        // Delay highlighting slightly to ensure rendering is complete
        setTimeout(() => {
          Prism.highlightAll();
          console.log('Prism.highlightAll() called');
        }, 50);
      })
    );
  }
}
