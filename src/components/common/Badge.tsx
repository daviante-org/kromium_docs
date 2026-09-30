import { BadgeProps } from './BadgeProps';
import { cn } from '../../utils/cn';
import { PLATFORM_CONFIGS } from '../../constants/PLATFORM_CONFIGS';
import { ENTITY_KIND_CONFIGS } from '../../constants/ENTITY_KIND_CONFIGS';

export function Badge({
  children,
  variant = 'default',
  platform,
  kind,
  className,
  size = 'md',
}: BadgeProps) {
  const sizeClasses = size === 'sm' 
    ? 'text-[11px] px-1.5 py-0.5 font-medium' 
    : 'text-xs px-2.5 py-0.5 font-medium';

  if (variant === 'platform' && platform && PLATFORM_CONFIGS[platform]) {
    const config = PLATFORM_CONFIGS[platform];
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full border transition-colors',
          config.badgeClass,
          sizeClasses,
          className
        )}
      >
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: config.dotColor }}
        />
        {config.label}
      </span>
    );
  }

  if (variant === 'kind' && kind && ENTITY_KIND_CONFIGS[kind]) {
    const config = ENTITY_KIND_CONFIGS[kind];
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 rounded font-mono border uppercase tracking-wider',
          config.badgeClass,
          sizeClasses,
          className
        )}
      >
        <span className="font-bold opacity-80">{config.shortLabel}</span>
        <span>{config.label}</span>
      </span>
    );
  }

  if (variant === 'deprecated') {
    return (
      <span
        className={cn(
          'inline-flex items-center rounded-md border border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-400 font-medium',
          sizeClasses,
          className
        )}
      >
        Deprecated
      </span>
    );
  }

  if (variant === 'version') {
    return (
      <span
        className={cn(
          'inline-flex items-center rounded-md border border-slate-200 bg-slate-100/80 text-slate-700 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300 font-mono',
          sizeClasses,
          className
        )}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 font-medium',
        sizeClasses,
        className
      )}
    >
      {children}
    </span>
  );
}
