export interface ApiVersionHistoryItem {
  version: string;
  date?: string;
  description?: string;
  changes?: string[];
  breaking?: boolean;
  deprecated?: boolean;
  docsUrl?: string;
}
