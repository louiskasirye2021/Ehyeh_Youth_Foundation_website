import { Fragment, type ReactNode } from 'react';

// Turns the plain text typed in the admin panel into formatted content.
//
//   - A blank line starts a new paragraph.
//   - A line starting with "- " becomes a bullet point.
//   - **double stars** make text bold.
//   - [link text](https://example.com) makes a link.
//
// Everything is rendered as React elements, never as raw HTML, so nothing
// typed into the admin panel can inject scripts into the page.

/** Only allow links that are safe to put in an href. */
export function safeHref(url: string | undefined | null): string | null {
  const value = (url || '').trim();
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) return value;
  if (/^(mailto|tel):/i.test(value)) return value;
  if (value.startsWith('#/') || value.startsWith('/#')) return value;
  return null;
}

function renderInline(text: string, strongClass?: string, linkClass?: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[1] !== undefined) {
      nodes.push(
        <strong key={key++} className={strongClass}>
          {match[1]}
        </strong>
      );
    } else {
      const href = safeHref(match[3]);
      const external = href && /^https?:/i.test(href);
      nodes.push(
        href ? (
          <a
            key={key++}
            href={href}
            className={linkClass ?? 'text-[#C39223] underline underline-offset-2 hover:no-underline'}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {match[2]}
          </a>
        ) : (
          <Fragment key={key++}>{match[2]}</Fragment>
        )
      );
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

interface RichTextProps {
  text: string | undefined | null;
  className?: string;
  paragraphClassName?: string;
  listClassName?: string;
  strongClassName?: string;
  linkClassName?: string;
}

export function RichText({
  text,
  className,
  paragraphClassName,
  listClassName = 'list-disc pl-5 space-y-1',
  strongClassName,
  linkClassName,
}: RichTextProps) {
  const value = (text || '').replace(/\r\n/g, '\n').trim();
  if (!value) return null;

  const blocks = value.split(/\n\s*\n/);
  const output: ReactNode[] = [];

  blocks.forEach((block, blockIndex) => {
    const lines = block.split('\n');
    let paragraph: string[] = [];
    let bullets: string[] = [];

    const flushParagraph = () => {
      if (!paragraph.length) return;
      output.push(
        <p key={`p-${blockIndex}-${output.length}`} className={paragraphClassName}>
          {paragraph.map((line, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              {renderInline(line, strongClassName, linkClassName)}
            </Fragment>
          ))}
        </p>
      );
      paragraph = [];
    };

    const flushBullets = () => {
      if (!bullets.length) return;
      output.push(
        <ul key={`ul-${blockIndex}-${output.length}`} className={listClassName}>
          {bullets.map((item, i) => (
            <li key={i}>{renderInline(item, strongClassName, linkClassName)}</li>
          ))}
        </ul>
      );
      bullets = [];
    };

    for (const rawLine of lines) {
      const line = rawLine.trimEnd();
      const bullet = line.match(/^\s*[-•*]\s+(.*)$/);
      if (bullet) {
        flushParagraph();
        bullets.push(bullet[1]);
      } else if (line.trim()) {
        flushBullets();
        paragraph.push(line.trim());
      }
    }
    flushParagraph();
    flushBullets();
  });

  return <div className={className}>{output}</div>;
}

/** "2025-02-19" -> "19 Feb 2025". Leaves anything else as typed. */
export function formatStoryDate(date: string | undefined) {
  if (!date) return '';
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date.trim());
  if (!match) return date;
  const d = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
