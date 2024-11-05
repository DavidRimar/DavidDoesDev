import { Injectable } from '@angular/core';
import { createClient, Entry} from 'contentful';
import { from } from 'rxjs';
import { APP_CONFIG } from '../config';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { contentfulRichTextOptions } from '../utilities/contentfulRichTextOptions';

@Injectable({
  providedIn: 'root'
})
export class ContentfulServiceService {

  private client : any;

  constructor() {
    this.client = createClient({
      space: APP_CONFIG.spaceId,
      accessToken: APP_CONFIG.accessToken
    })
   }

  getAllEntries() {
    const promise = this.client.getEntries()
    return from(promise);
  }

  getById(id: string) {
    const promise = this.client.getEntry(id)
      .then((entry: any) => {
        console.log('Entry fetched from service:', entry); // Log in the service
        return entry;
      })
      .catch(console.error);

    return from(promise);
  }

  getContentById(id: string) {
    const promise = this.client.getEntry(id)
      .then((entry: any) => {
        const rawRichTextField = entry.fields.content;
        return documentToHtmlString(rawRichTextField, contentfulRichTextOptions);
      })
      .catch((error: any) => console.log(error));

    return from(promise);
  }

   getByUrlHandle(urlHandle: string) {
    const promise = this.client
      .getEntries({
        content_type: 'dddPosts',
        'fields.urlHandle': urlHandle,
        limit: 1,
      })
      .then((response: any) => {
        if (response.items.length > 0) {
          console.log('Entry fetched by title from service:', response.items[0]);
          return response.items[0];
        } else {
          console.log('No entry found with the given title');
          return null;
        }
      })
      .catch(console.error);

    return from(promise);
  }

  getContentByUrlHandle(urlHandle: string) {
    const promise = this.client
      .getEntries({
        content_type: 'dddPosts',
        'fields.urlHandle': urlHandle,
        limit: 1,
      })
      .then((response: any) => {
        if (response.items.length > 0) {
          const rawRichTextField = response.items[0].fields.content;
          return documentToHtmlString(rawRichTextField, contentfulRichTextOptions);
        } else {
          console.log('No content found with the given title');
          return null;
        }
      })
      .catch((error: any) => console.log(error));

    return from(promise);
  }

  // Fetch entries by category
  getByCategory(category: string) {
    const promise = this.client.getEntries({
      content_type: 'dddPosts',
      'fields.category': category
    }).then((response: any) => {
      return response.items;
    }).catch((error: any) => console.error(error));

    return from(promise);
  }
}
