import { GuideCallout } from './GuideCallout';

export interface GuideSection {
  id: string;
  title: string;
  content: string;
  callout?: GuideCallout;
  codeSnippet?: {
    language: string;
    code: string;
  };
  codeTabs?: {
    id: string;
    label: string;
    language: string;
    code: string;
  }[];
}
