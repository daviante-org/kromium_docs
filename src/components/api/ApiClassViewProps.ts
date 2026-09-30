import { ApiSymbol } from '../../types/ApiSymbol';

export interface ApiClassViewProps {
  symbol: ApiSymbol;
  previousSymbol?: { name: string; id: string } | null;
  nextSymbol?: { name: string; id: string } | null;
  onNavigate: (path: string) => void;
}
