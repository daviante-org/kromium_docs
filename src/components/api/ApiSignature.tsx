import { ApiSignatureProps } from './ApiSignatureProps';
import { CodeBlock } from '../common/CodeBlock';

export function ApiSignature({
  signature,
  language = 'kotlin',
}: ApiSignatureProps) {
  return (
    <div className="my-3">
      <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
        Syntax
      </div>
      <CodeBlock code={signature} language={language} className="my-1 border-slate-700" />
    </div>
  );
}
