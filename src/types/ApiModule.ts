import { SupportedPlatform } from './SupportedPlatform';
import { ApiEntity } from './ApiEntity';

export interface ApiModule {
  id: string;
  name: string;
  artifact: string;
  summary: string;
  description: string;
  platforms: SupportedPlatform[];
  entities: ApiEntity[];
}
