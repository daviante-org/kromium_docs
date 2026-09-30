import { useState, useMemo } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-groovy';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import { Check, Copy } from 'lucide-react';
import { CodeBlockProps } from './CodeBlockProps';
import { cn } from '../../utils/cn';

export function CodeBlock({
  code,
  language = 'kotlin',
  title,
  showLineNumbers: _showLineNumbers = false,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const highlightedCode = useMemo(() => {
    const lang = language.toLowerCase();
    const grammar = Prism.languages[lang] || Prism.languages.clike || Prism.languages.javascript;
    if (grammar) {
      try {
        return Prism.highlight(code.trim(), grammar, lang);
      } catch {
        return code.trim();
      }
    }
    return code.trim();
  }, [code, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  return (
    <div className={cn('ms-code-block', className)}>
      <div className="ms-code-header">
        <span className="ms-code-lang">
          {title || language}
        </span>

        <button
          type="button"
          onClick={handleCopy}
          className="ms-code-copy-btn"
          title="Copy code snippet"
          aria-label="Copy code snippet"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-500 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 opacity-70" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <pre className="ms-code-pre">
        <code
          className={`language-${language}`}
          dangerouslySetInnerHTML={{ __html: highlightedCode || code }}
        />
      </pre>
    </div>
  );
}
