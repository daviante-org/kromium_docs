export interface ApiMethodItem {
  name: string;
  signature: string;
  description: string;
  returns?: string;
  isSuspend?: boolean;
  throws?: string[];
}
