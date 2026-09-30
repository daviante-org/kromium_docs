import { parseMarkdown } from '../../utils/markdown';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  if (!content) return null;

  return <div className={`ms-markdown-body ${className}`}>{parseMarkdown(content)}</div>;
}
