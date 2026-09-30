import { EntityKind } from '../types/EntityKind';
import { EntityKindConfig } from './EntityKindConfig';

export const ENTITY_KIND_CONFIGS: Record<EntityKind, EntityKindConfig> = {
  interface: {
    label: 'Interface',
    shortLabel: 'I',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
  },
  class: {
    label: 'Class',
    shortLabel: 'C',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800',
  },
  enum: {
    label: 'Enum',
    shortLabel: 'E',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
  },
  object: {
    label: 'Object',
    shortLabel: 'O',
    badgeClass: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800',
  },
  composable: {
    label: 'Composable',
    shortLabel: '@C',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800',
  },
  typealias: {
    label: 'Type Alias',
    shortLabel: 'T',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800',
  },
};
