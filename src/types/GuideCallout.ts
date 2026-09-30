export interface GuideCallout {
  type: 'info' | 'warning' | 'tip' | 'note';
  title?: string;
  message: string;
}
