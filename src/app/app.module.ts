import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutPageComponent } from './pages/about/about-page.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { SocialMediaLinkComponent } from './components/social-media-links/social-media-link.component';
import { BlogCardComponent } from './components/blog-card/blog-card.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AboutPageComponent,
    BlogPostComponent,
    SocialMediaLinkComponent,
    BlogCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MdbCollapseModule,
    MatCardModule
  ],
  providers: [
    provideAnimationsAsync('noop')
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
