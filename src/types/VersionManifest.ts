import { VersionItem } from './VersionItem';

export interface VersionManifest {
  latestVersion: string;
  versions: VersionItem[];
}
