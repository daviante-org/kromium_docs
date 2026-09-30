import { ApiOption } from './ApiOption';
import { ApiVariant } from './ApiVariant';
import { ApiPropertyItem } from './ApiPropertyItem';
import { ApiMethodItem } from './ApiMethodItem';
import { ApiExceptionItem } from './ApiExceptionItem';
import { ApiFrameworkExample } from './ApiFrameworkExample';
import { ApiVersionHistoryItem } from './ApiVersionHistoryItem';

export interface ApiSymbol {
  id: string;
  name: string;
  module: string;
  category: string;
  description: string;
  declaration: string;
  kind?: string;
  summary?: string;
  sourceUrl?: string;
  since?: string;
  deprecated?: boolean | string;
  deprecatedMessage?: string;
  versionHistory?: ApiVersionHistoryItem[];
  versions?: string[] | Record<string, Partial<ApiSymbol>>;
  whenToUse?: string;
  options?: ApiOption[];
  properties?: ApiPropertyItem[];
  methods?: ApiMethodItem[];
  exceptions?: ApiExceptionItem[];
  variants?: ApiVariant[];
  frameworkExamples?: ApiFrameworkExample[];
  package?: string;
  versionMap?: Record<string, Partial<ApiSymbol>>;
}
