/**
 * Convert structured JSON content to clean HTML
 * Handles backward compatibility for existing brand data
 */

interface StructuredContent {
  heading?: string;
  subheading?: string;
  intro?: string[];
  sections?: Array<{ title: string; text: string }>;
  whyUsHeading?: string;
  whyUs?: Array<{ subheading: string; desc: string }>;
  popularEngines?: {
    heading: string;
    description: string;
    items: Array<{ name: string; desc: string }>;
  };
  amgEngines?: {
    heading: string;
    description: string;
    items: Array<{ name: string; spec: string }>;
  };
  buyGuide?: {
    heading: string;
    description: string;
    checks: string[];
  };
}

/**
 * Convert structured content object to HTML
 * Skips empty sections and handles missing data safely
 */
export function convertStructuredToHTML(content: any): string {
  if (!content || typeof content === 'string') {
    return '';
  }

  const data = content as StructuredContent;
  let html = '';

  // Heading
  if (data.heading) {
    html += `<h2>${escapeHtml(data.heading)}</h2>\n`;
  }

  // Subheading
  if (data.subheading) {
    html += `<h3>${escapeHtml(data.subheading)}</h3>\n`;
  }

  // Intro paragraphs
  if (data.intro && Array.isArray(data.intro) && data.intro.length > 0) {
    data.intro.forEach((paragraph) => {
      if (paragraph && paragraph.trim()) {
        html += `<p>${escapeHtml(paragraph)}</p>\n`;
      }
    });
  }

  // Sections
  if (data.sections && Array.isArray(data.sections) && data.sections.length > 0) {
    data.sections.forEach((section) => {
      if (section.title) {
        html += `<h3>${escapeHtml(section.title)}</h3>\n`;
      }
      if (section.text) {
        html += `<p>${escapeHtml(section.text)}</p>\n`;
      }
    });
  }

  // Popular Engines
  if (data.popularEngines) {
    if (data.popularEngines.heading) {
      html += `<h2>${escapeHtml(data.popularEngines.heading)}</h2>\n`;
    }
    if (data.popularEngines.description) {
      html += `<p>${escapeHtml(data.popularEngines.description)}</p>\n`;
    }
    if (data.popularEngines.items && Array.isArray(data.popularEngines.items)) {
      html += '<ul>\n';
      data.popularEngines.items.forEach((item) => {
        if (item.name) {
          const desc = item.desc ? ` - ${escapeHtml(item.desc)}` : '';
          html += `  <li><strong>${escapeHtml(item.name)}</strong>${desc}</li>\n`;
        }
      });
      html += '</ul>\n';
    }
  }

  // AMG Engines
  if (data.amgEngines) {
    if (data.amgEngines.heading) {
      html += `<h2>${escapeHtml(data.amgEngines.heading)}</h2>\n`;
    }
    if (data.amgEngines.description) {
      html += `<p>${escapeHtml(data.amgEngines.description)}</p>\n`;
    }
    if (data.amgEngines.items && Array.isArray(data.amgEngines.items)) {
      html += '<ul>\n';
      data.amgEngines.items.forEach((item) => {
        if (item.name) {
          const spec = item.spec ? ` - ${escapeHtml(item.spec)}` : '';
          html += `  <li><strong>${escapeHtml(item.name)}</strong>${spec}</li>\n`;
        }
      });
      html += '</ul>\n';
    }
  }

  // Buy Guide
  if (data.buyGuide) {
    if (data.buyGuide.heading) {
      html += `<h2>${escapeHtml(data.buyGuide.heading)}</h2>\n`;
    }
    if (data.buyGuide.description) {
      html += `<p>${escapeHtml(data.buyGuide.description)}</p>\n`;
    }
    if (data.buyGuide.checks && Array.isArray(data.buyGuide.checks)) {
      html += '<ul>\n';
      data.buyGuide.checks.forEach((check) => {
        if (check && check.trim()) {
          html += `  <li>${escapeHtml(check)}</li>\n`;
        }
      });
      html += '</ul>\n';
    }
  }

  // Why Us Points
  if (data.whyUsHeading) {
    html += `<h2>${escapeHtml(data.whyUsHeading)}</h2>\n`;
  }
  if (data.whyUs && Array.isArray(data.whyUs) && data.whyUs.length > 0) {
    html += '<ul>\n';
    data.whyUs.forEach((point) => {
      if (point.subheading) {
        const desc = point.desc ? ` - ${escapeHtml(point.desc)}` : '';
        html += `  <li><strong>${escapeHtml(point.subheading)}</strong>${desc}</li>\n`;
      }
    });
    html += '</ul>\n';
  }

  return html;
}

/**
 * Escape HTML special characters to prevent XSS
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Clean up unwanted HTML tags and empty elements
 * Removes empty paragraphs, excessive line breaks, etc.
 */
export function cleanHTML(html: string): string {
  if (!html) return '';

  let cleaned = html
    // Remove empty paragraphs with only whitespace or <br>
    .replace(/<p>\s*(<br\s*\/?>\s*)*<\/p>/gi, '')
    // Remove multiple consecutive line breaks
    .replace(/(<br\s*\/?>\s*){3,}/gi, '<br>\n')
    // Remove trailing/leading whitespace in tags
    .replace(/<p>\s+/g, '<p>')
    .replace(/\s+<\/p>/g, '</p>')
    // Remove empty divs
    .replace(/<div>\s*<\/div>/gi, '')
    // Normalize line breaks
    .replace(/\r\n/g, '\n')
    // Remove excessive whitespace between block elements
    .replace(/>\s{2,}</g, '>\n<');

  return cleaned.trim();
}

/**
 * Check if content is structured JSON or HTML
 */
export function isStructuredContent(content: any): boolean {
  if (typeof content === 'string') {
    return false;
  }
  if (!content || typeof content !== 'object') {
    return false;
  }
  // Check for known structured field indicators
  const structuredKeys = [
    'intro',
    'sections',
    'whyUs',
    'popularEngines',
    'amgEngines',
    'buyGuide',
  ];
  return structuredKeys.some((key) => key in content);
}

/**
 * Get appropriate content for editor
 * Returns rich_content if available, otherwise converts structured content
 */
export function getEditorContent(brand: any): string {
  // If rich_content exists and is not empty, use it
  if (brand.rich_content && typeof brand.rich_content === 'string' && brand.rich_content.trim()) {
    return brand.rich_content;
  }

  // Otherwise, convert structured content if it exists
  if (brand.content) {
    return convertStructuredToHTML(brand.content);
  }

  return '';
}

/**
 * Parse HTML content to extract structured format sections
 * Uses regex to identify key sections by headings and extracts items/checks
 */
export function parseHTMLToStructured(htmlContent: string): StructuredContent | null {
  if (!htmlContent || typeof htmlContent !== 'string') {
    return null;
  }

  try {
    const result: StructuredContent = {};
    
    // Helper to extract text from HTML tags
    const extractText = (html: string): string => {
      return html
        .replace(/<[^>]*>/g, '') // Remove all HTML tags
        .replace(/&nbsp;/g, ' ')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .trim();
    };

    // Helper to extract list items
    const extractListItems = (html: string): string[] => {
      const items: string[] = [];
      const liMatches = html.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
      liMatches.forEach((li) => {
        const content = extractText(li);
        if (content) items.push(content);
      });
      return items;
    };

    // Extract all h2 and h3 headings with their content
    const headingPattern = /<h[2-3][^>]*>([\s\S]*?)<\/h[2-3]>/gi;
    const headings: Array<{ level: number; text: string; index: number }> = [];
    let match;

    while ((match = headingPattern.exec(htmlContent)) !== null) {
      headings.push({
        level: parseInt(match[0][2]),
        text: extractText(match[1]),
        index: match.index,
      });
    }

    // Extract intro paragraphs (any <p> tags before the first recognized section heading)
    if (headings.length > 0) {
      const firstHeadingIndex = headings[0].index;
      const introContent = htmlContent.substring(0, firstHeadingIndex);
      const introParagraphs: string[] = [];
      
      const introParaPattern = /<p[^>]*>([\s\S]*?)<\/p>/gi;
      let introMatch;
      while ((introMatch = introParaPattern.exec(introContent)) !== null) {
        const paraText = extractText(introMatch[1]);
        if (paraText.trim()) {
          introParagraphs.push(paraText);
        }
      }
      
      if (introParagraphs.length > 0) {
        result.intro = introParagraphs;
      }
    }

    // Identify sections by heading text
    headings.forEach((heading, idx) => {
      const headingLower = heading.text.toLowerCase();
      const nextHeadingIndex =
        idx + 1 < headings.length ? headings[idx + 1].index : htmlContent.length;
      const sectionContent = htmlContent.substring(heading.index, nextHeadingIndex);

      // Extract description (first paragraph after heading)
      const descMatch = sectionContent.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
      const description = descMatch ? extractText(descMatch[1]) : '';

      // Popular Engines section
      if (headingLower.includes('popular') && headingLower.includes('engine')) {
        const listMatch = sectionContent.match(/<ul[^>]*>([\s\S]*?)<\/ul>/i);
        const items = listMatch ? extractListItems(listMatch[1]) : [];

        result.popularEngines = {
          heading: heading.text,
          description,
          items: items.map((item) => {
            const parts = item.split(/[-–]\s*/, 2);
            return {
              name: parts[0].replace(/<strong[^>]*>|<\/strong>/gi, '').trim(),
              desc: parts[1]?.trim() || '',
            };
          }),
        };
      }

      // AMG/Variants Engines section
      else if (
        (headingLower.includes('amg') || headingLower.includes('variant')) &&
        headingLower.includes('engine')
      ) {
        const listMatch = sectionContent.match(/<ul[^>]*>([\s\S]*?)<\/ul>/i);
        const items = listMatch ? extractListItems(listMatch[1]) : [];

        result.amgEngines = {
          heading: heading.text,
          description,
          items: items.map((item) => {
            const parts = item.split(/[-–]\s*/, 2);
            return {
              name: parts[0].replace(/<strong[^>]*>|<\/strong>/gi, '').trim(),
              spec: parts[1]?.trim() || '',
            };
          }),
        };
      }

      // Buy Guide section
      else if (headingLower.includes('buy') || headingLower.includes('guide')) {
        const listMatch = sectionContent.match(/<ul[^>]*>([\s\S]*?)<\/ul>/i);
        const checks = listMatch ? extractListItems(listMatch[1]) : [];

        result.buyGuide = {
          heading: heading.text,
          description,
          checks: checks.filter((c) => c.trim()),
        };
      }

      // Why Us section
      else if (headingLower.includes('why') && headingLower.includes('us')) {
        const listMatch = sectionContent.match(/<ul[^>]*>([\s\S]*?)<\/ul>/i);
        const items = listMatch ? extractListItems(listMatch[1]) : [];

        result.whyUsHeading = heading.text;
        result.whyUs = items.map((item) => {
          const parts = item.split(/[-–]\s*/, 2);
          return {
            subheading: parts[0].replace(/<strong[^>]*>|<\/strong>/gi, '').trim(),
            desc: parts[1]?.trim() || '',
          };
        });
      }

      // Generic heading (first one becomes main heading)
      else if (!result.heading && idx === 0) {
        result.heading = heading.text;
      }
    });

    // Return null if no meaningful structure was found
    if (
      !result.heading &&
      !result.popularEngines &&
      !result.amgEngines &&
      !result.buyGuide &&
      !result.whyUs
    ) {
      return null;
    }

    return result;
  } catch (error) {
    console.warn('Error parsing HTML to structured format:', error);
    return null;
  }
}

/**
 * Get content for rendering on frontend
 * Parses rich_content (HTML) to structured format for UI rendering
 */
export function getRenderContent(brand: any): { html: string | null; structured: any } {
  let structured = null;

  // Parse rich_content HTML to structured format
  if (brand.rich_content && typeof brand.rich_content === 'string' && brand.rich_content.trim()) {
    structured = parseHTMLToStructured(brand.rich_content);
  }

  return {
    html: brand.rich_content || null,
    structured: structured,
  };
}