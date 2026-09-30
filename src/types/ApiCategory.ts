import { ApiSymbol } from './ApiSymbol';

export interface ApiCategory {
  id: string;
  name: string;
  count: number;
  symbols: ApiSymbol[];
}
