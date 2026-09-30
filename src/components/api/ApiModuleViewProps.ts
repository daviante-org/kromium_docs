import { ApiModule } from '../../types/ApiModule';

export interface ApiModuleViewProps {
  module: ApiModule;
  onNavigate?: (path: string) => void;
}
