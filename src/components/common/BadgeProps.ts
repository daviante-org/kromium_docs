import { ReactNode } from 'react';
import { SupportedPlatform } from '../../types/SupportedPlatform';
import { EntityKind } from '../../types/EntityKind';

export interface BadgeProps {
  children?: ReactNode;
  variant?: 'default' | 'platform' | 'kind' | 'version' | 'deprecated';
  platform?: SupportedPlatform;
  kind?: EntityKind;
  className?: string;
  size?: 'sm' | 'md';
}
