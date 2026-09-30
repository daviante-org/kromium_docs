import { Box, ArrowRight } from 'lucide-react';
import { ApiModuleViewProps } from './ApiModuleViewProps';
import { Breadcrumb } from '../common/Breadcrumb';
import { Badge } from '../common/Badge';
import { CodeBlock } from '../common/CodeBlock';

export function ApiModuleView({ module, onNavigate }: ApiModuleViewProps) {
  const breadcrumbItems = [
    { label: 'API Reference', path: '/api' },
    { label: module.name },
  ];

  const gradleSnippet = `// build.gradle.kts
dependencies {
    implementation("${module.artifact}")
}`;

  return (
    <article className="space-y-8 pb-12">
      <Breadcrumb items={breadcrumbItems} onNavigate={onNavigate} />

      <div>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            <Box className="w-3.5 h-3.5" />
            Module
          </span>
          {module.platforms.map((plat) => (
            <Badge key={plat} variant="platform" platform={plat} />
          ))}
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-mono">
          {module.name}
        </h1>
      </div>

      <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed border-l-2 border-brand-500 pl-4 py-1.5 bg-brand-50/40 dark:bg-brand-950/20 rounded-r-md">
        {module.summary}
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        {module.description}
      </p>

      {/* Dependency coordinates */}
      <section className="space-y-2">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          Dependency Coordinates
        </h2>
        <CodeBlock code={gradleSnippet} language="kotlin" title="Gradle (Kotlin DSL)" />
      </section>

      {/* Classes & Interfaces in this module */}
      <section className="space-y-4 pt-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-200 dark:border-slate-800">
          Entities in {module.name}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {module.entities.map((entity) => (
            <div
              key={entity.id}
              onClick={() => onNavigate && onNavigate(`/api/${module.id}/${entity.id}`)}
              className="group p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-brand-500 dark:hover:border-brand-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="kind" kind={entity.kind} />
                  <span className="text-[11px] font-mono text-slate-400">
                    Since {entity.sinceVersion}
                  </span>
                </div>

                <h3 className="text-sm font-semibold font-mono text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {entity.name}
                </h3>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {entity.summary}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-1 text-xs font-medium text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform">
                <span>View Reference</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
