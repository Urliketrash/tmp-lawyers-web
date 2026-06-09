import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitizes raw HTML strings to protect against Cross-Site Scripting (XSS) vulnerabilities.
 * Permits clean semantic HTML markup suitable for news articles and blog contents.
 *
 * @param dirty The raw/unsafe HTML input
 * @returns The sanitized, safe HTML string
 */
export function sanitizeHtml(dirty: string): string {
  if (!dirty) return "";
  
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      "p", "br", "strong", "em", "u", "ul", "ol", "li", "span", "div",
      "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre", "code", "a"
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "class", "style"],
  }) as string;
}
export default sanitizeHtml;
