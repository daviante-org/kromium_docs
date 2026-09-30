import { SupportedPlatform } from '../types/SupportedPlatform';
import { PlatformConfig } from './PlatformConfig';

export const PLATFORM_CONFIGS: Record<SupportedPlatform, PlatformConfig> = {
  compose: {
    id: 'compose',
    label: 'Compose Multiplatform',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/60',
    dotColor: '#a855f7',
  },
  swing: {
    id: 'swing',
    label: 'Swing',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/60',
    dotColor: '#f59e0b',
  },
  javafx: {
    id: 'javafx',
    label: 'JavaFX',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/60',
    dotColor: '#3b82f6',
  },
  swt: {
    id: 'swt',
    label: 'Eclipse SWT',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/60',
    dotColor: '#10b981',
  },
  awt: {
    id: 'awt',
    label: 'Pure AWT',
    badgeClass: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800/60',
    dotColor: '#f97316',
  },
  jvm: {
    id: 'jvm',
    label: 'Universal JVM',
    badgeClass: 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    dotColor: '#64748b',
  },
};
