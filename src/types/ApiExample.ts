export interface ApiExample {
  language: 'kotlin' | 'java' | 'gradle' | 'xml';
  code: string;
  title?: string;
  description?: string;
}
