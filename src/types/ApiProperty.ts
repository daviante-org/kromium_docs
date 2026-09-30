import { SupportedPlatform } from './SupportedPlatform';

export interface ApiProperty {
  id: string;
  name: string;
  type: string;
  summary: string;
  description?: string;
  isReadOnly?: boolean;
  defaultValue?: string;
  sinceVersion: string;
  platforms?: SupportedPlatform[];
  isDeprecated?: boolean;
}
