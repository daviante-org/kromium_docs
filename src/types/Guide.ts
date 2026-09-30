import { GuideSection } from './GuideSection';

export interface Guide {
  id: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  lastUpdated: string;
  sections: GuideSection[];
  relatedApis?: { name: string; path: string }[];
}
