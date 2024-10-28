import { BLOCKS } from '@contentful/rich-text-types';

export const contentfulRichTextOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const imageUrl = node.data.target.fields.file.url;
      const optimizedImageUrl = `${imageUrl}?w=650&q=100&fm=webp`;
      const imageAlt = node.data.target.fields.title || 'Embedded image';

      return `<div class="image-container"><img src="${optimizedImageUrl}" alt="${imageAlt}" loading="lazy" /></div>`;
    }
  }
};
