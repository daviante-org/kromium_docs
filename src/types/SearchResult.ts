import { EntityKind } from './EntityKind';

export interface SearchResult {
  id: string;
  title: string;
  type: 'guide' | 'entity' | 'method' | 'property' | 'module';
  entityKind?: EntityKind;
  module?: string;
  containerName?: string;
  summary: string;
  path: string;
  version: string;
}
