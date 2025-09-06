import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm"; // This adds table support

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function markdownToHtml(markdown: any) {
  const result = await remark()
    .use(remarkGfm) // Enable GitHub Flavored Markdown (includes tables)
    .use(html, { sanitize: true })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    .process(markdown);

  let htmlString = result.toString();

  // 1) Replace <p><img></p>\n<p><strong>Source:</strong> <a href="...">Label</a></p>
  htmlString = htmlString.replace(
    /<p>\s*(<img[^>]+>)\s*<\/p>\s*<p>\s*(?:<strong>\s*Source:\s*<\/strong>\s*)?<a\s+href="([^"]+)"[^>]*>(.*?)<\/a>\s*<\/p>/gi,
    (_m, imgTag, href, linkText) =>
      `<figure class="markdown-figure">${imgTag}<figcaption class="markdown-figcaption"><a href="${href}" rel="noopener noreferrer" target="_blank">${linkText}</a></figcaption></figure>`,
  );

  // 2) Replace case when image and caption are in the same paragraph:
  //    <p><img ...> <strong>Source:</strong> <a href="...">Label</a></p>
  htmlString = htmlString.replace(
    /<p>\s*(<img[^>]+>)\s*(?:<strong>\s*Source:\s*<\/strong>\s*)?<a\s+href="([^"]+)"[^>]*>(.*?)<\/a>\s*<\/p>/gi,
    (_m, imgTag, href, linkText) =>
      `<figure class="markdown-figure">${imgTag}<figcaption class="markdown-figcaption"><a href="${href}" rel="noopener noreferrer" target="_blank">${linkText}</a></figcaption></figure>`,
  );

  return htmlString;
}
