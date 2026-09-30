import React from 'react';
import { CodeBlock } from '../components/common/CodeBlock';

export function renderInline(text: string): React.ReactNode {
  // Regex to match bold (**text**), inline code (`code`), markdown links ([text](url)), and italics (*text*)
  const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*[^*]+\*)/g);

  return tokens.map((token, index) => {
    if (token.startsWith('**') && token.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold text-[var(--ms-text)]">
          {renderInline(token.slice(2, -2))}
        </strong>
      );
    }
    if (token.startsWith('`') && token.endsWith('`')) {
      return (
        <code key={index} className="ms-inline-code">
          {token.slice(1, -1)}
        </code>
      );
    }
    if (token.startsWith('[') && token.includes('](') && token.endsWith(')')) {
      const match = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (match) {
        const [, label, href] = match;
        return (
          <a
            key={index}
            href={href}
            className="text-[var(--ms-text-link)] hover:underline"
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {label}
          </a>
        );
      }
    }
    if (token.startsWith('*') && token.endsWith('*')) {
      return <em key={index}>{token.slice(1, -1)}</em>;
    }
    return token;
  });
}

export function parseMarkdown(markdown: string): React.ReactNode[] {
  const lines = markdown.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // 1. Fenced Code Blocks: ```lang ... ```
    if (trimmed.startsWith('```')) {
      const language = trimmed.slice(3).trim() || 'text';
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length && lines[i].trim().startsWith('```')) {
        i++;
      }
      elements.push(
        <div key={`code-${elements.length}`} className="my-4">
          <CodeBlock code={codeLines.join('\n')} language={language} />
        </div>
      );
      continue;
    }

    // 2. Table: starts and ends with '|' and next line is a separator row
    if (trimmed.startsWith('|') && trimmed.endsWith('|') && i + 1 < lines.length) {
      const nextTrimmed = lines[i + 1].trim();
      if (nextTrimmed.startsWith('|') && nextTrimmed.includes('---')) {
        const tableLines: string[] = [trimmed, nextTrimmed];
        i += 2;
        while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
          tableLines.push(lines[i].trim());
          i++;
        }

        const parseRow = (rowLine: string) => {
          let cleaned = rowLine.trim();
          if (cleaned.startsWith('|')) cleaned = cleaned.substring(1);
          if (cleaned.endsWith('|')) cleaned = cleaned.substring(0, cleaned.length - 1);
          return cleaned.split('|').map((c) => c.trim());
        };

        const headers = parseRow(tableLines[0]);
        const alignments = parseRow(tableLines[1]).map((s) => {
          const left = s.startsWith(':');
          const right = s.endsWith(':');
          if (left && right) return 'center' as const;
          if (right) return 'right' as const;
          return 'left' as const;
        });

        const rows = tableLines.slice(2).map(parseRow);

        elements.push(
          <div key={`table-${elements.length}`} className="ms-table-wrapper my-4">
            <table className="ms-table w-full">
              <thead>
                <tr>
                  {headers.map((h, colIdx) => (
                    <th key={colIdx} style={{ textAlign: alignments[colIdx] }}>
                      {renderInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIdx) => (
                  <tr key={rowIdx}>
                    {row.map((cell, colIdx) => (
                      <td key={colIdx} style={{ textAlign: alignments[colIdx] }}>
                        {renderInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    // 3. Headings: #, ##, ###, ####
    if (trimmed.startsWith('#')) {
      const match = trimmed.match(/^(#{1,6})\s+(.*)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2];
        if (level <= 2) {
          elements.push(
            <h3 key={`h-${elements.length}`} className="ms-article-h3 text-lg font-semibold mt-6 mb-2.5 text-[var(--ms-text)]">
              {renderInline(text)}
            </h3>
          );
        } else {
          elements.push(
            <h4 key={`h-${elements.length}`} className="ms-article-h4 text-base font-semibold mt-5 mb-2 text-[var(--ms-text)]">
              {renderInline(text)}
            </h4>
          );
        }
        i++;
        continue;
      }
    }

    // 4. Unordered Lists
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const listItems: { text: string; indent: number }[] = [];
      while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))) {
        const itemLine = lines[i];
        const leadingSpaces = itemLine.search(/\S/);
        const indent = Math.max(0, Math.floor(leadingSpaces / 2));
        listItems.push({ text: itemLine.trim().substring(2), indent });
        i++;
      }
      elements.push(
        <ul key={`ul-${elements.length}`} className="list-disc pl-5 my-3 space-y-1.5 text-sm text-[var(--ms-text)]">
          {listItems.map((item, itemIdx) => (
            <li
              key={itemIdx}
              style={{
                marginLeft: item.indent > 0 ? `${item.indent * 1.25}rem` : undefined,
                listStyleType: item.indent > 0 ? 'circle' : 'disc'
              }}
            >
              {renderInline(item.text)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // 5. Ordered Lists
    if (/^\d+\.\s/.test(trimmed)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s/, ''));
        i++;
      }
      elements.push(
        <ol key={`ol-${elements.length}`} className="list-decimal pl-5 my-3 space-y-1.5 text-sm text-[var(--ms-text)]">
          {listItems.map((item, itemIdx) => (
            <li key={itemIdx}>{renderInline(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // 6. Regular Paragraph
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith('```') &&
      !lines[i].trim().startsWith('|') &&
      !lines[i].trim().startsWith('#') &&
      !lines[i].trim().startsWith('- ') &&
      !lines[i].trim().startsWith('* ') &&
      !/^\d+\.\s/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }

    if (paraLines.length > 0) {
      elements.push(
        <p key={`p-${elements.length}`} className="ms-article-p my-2.5 leading-relaxed">
          {renderInline(paraLines.join(' '))}
        </p>
      );
    } else {
      // Invariant: i must ALWAYS advance, even if a line doesn't match above categories
      elements.push(
        <p key={`p-${elements.length}`} className="ms-article-p my-2.5 leading-relaxed">
          {renderInline(trimmed)}
        </p>
      );
      i++;
    }
  }

  return elements;
}
