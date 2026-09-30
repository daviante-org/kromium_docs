import { EntityKind } from './EntityKind';
import { SupportedPlatform } from './SupportedPlatform';
import { ApiMethod } from './ApiMethod';
import { ApiProperty } from './ApiProperty';
import { ApiExample } from './ApiExample';

export interface ApiEntity {
  id: string;
  name: string;
  kind: EntityKind;
  module: string;
  package: string;
  summary: string;
  description: string;
  signature: string;
  extendsClass?: string;
  implementsInterfaces?: string[];
  constructors?: ApiMethod[];
  properties: ApiProperty[];
  methods: ApiMethod[];
  examples?: ApiExample[];
  sinceVersion: string;
  platforms: SupportedPlatform[];
  sourceUrl?: string;
}
