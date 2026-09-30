import { ApiParameter } from './ApiParameter';
import { ApiReturnType } from './ApiReturnType';
import { ApiException } from './ApiException';
import { ApiExample } from './ApiExample';
import { SupportedPlatform } from './SupportedPlatform';

export interface ApiMethod {
  id: string;
  name: string;
  signature: string;
  summary: string;
  description?: string;
  parameters: ApiParameter[];
  returnType: ApiReturnType;
  exceptions?: ApiException[];
  examples?: ApiExample[];
  sinceVersion: string;
  platforms?: SupportedPlatform[];
  isDeprecated?: boolean;
  deprecationNotice?: string;
  isSuspend?: boolean;
  isComposable?: boolean;
}
