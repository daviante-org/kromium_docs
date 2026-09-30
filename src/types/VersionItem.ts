export interface VersionItem {
  version: string;
  name: string;
  isLatest: boolean;
  isPrerelease?: boolean;
  releaseDate: string;
  notes?: string;
}
