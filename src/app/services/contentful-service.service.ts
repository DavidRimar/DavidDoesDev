import { Injectable } from '@angular/core';
import { createClient, Entry} from 'contentful';
import { from } from 'rxjs';
import { APP_CONFIG } from '../config';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { richTextFromMarkdown } from '@contentful/rich-text-from-markdown';

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
    return from(promise);
  }

  getContentById(id: string) {
    const promise = this.client.getEntry(id)
    .then((entry: any) => {
      const rawRichTextField = entry.fields.content;
      return documentToHtmlString(rawRichTextField);
    }).catch((error: any) => console.log(error));

    return from(promise);
  }
}
