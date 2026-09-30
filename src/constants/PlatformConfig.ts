import { SupportedPlatform } from '../types/SupportedPlatform';

export interface PlatformConfig {
  id: SupportedPlatform;
  label: string;
  badgeClass: string;
  dotColor: string;
}
