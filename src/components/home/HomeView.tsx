import { HomeViewProps } from './HomeViewProps';
import { HomeHero } from './HomeHero';
import { HomeFeatures } from './HomeFeatures';
import { HomeExploreDocs } from './HomeExploreDocs';
import { HomeCta } from './HomeCta';

export function HomeView({ onNavigate, version }: HomeViewProps) {
  return (
    <div className="w-full">
      <HomeHero onNavigate={onNavigate} version={version} />
      <HomeFeatures onNavigate={onNavigate} />
      <HomeExploreDocs onNavigate={onNavigate} />
      <HomeCta onNavigate={onNavigate} />
    </div>
  );
}
