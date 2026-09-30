import { VersionItem } from '../types/VersionItem';

export interface VersionContextType {
  currentVersion: string;
  setVersion: (version: string) => void;
  versions: VersionItem[];
  latestVersion: string;
  isLoading: boolean;
}
