import { ReactNode, useEffect, useState } from 'react';
import { VersionItem } from '../types/VersionItem';
import { VersionManifest } from '../types/VersionManifest';
import { VersionContext } from './VersionContext';

export function VersionProvider({ children }: { children: ReactNode }) {
  const [currentVersion, setCurrentVersion] = useState<string>('v1.0.0.150-b11');
  const [versions, setVersions] = useState<VersionItem[]>([
    {
      version: 'v1.0.0.150-b11',
      name: 'v1.0.0.150-b11 (Cloudflare R2)',
      isLatest: true,
      releaseDate: '2026-09-26',
    },
  ]);
  const [latestVersion, setLatestVersion] = useState<string>('v1.0.0.150-b11');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/data/versions/manifest.json')
      .then((res) => {
        if (!res.ok) throw new Error('Manifest not found');
        return res.json() as Promise<VersionManifest>;
      })
      .then((data) => {
        if (data && data.versions && data.versions.length > 0) {
          setVersions(data.versions);
          setLatestVersion(data.latestVersion);
          const savedVersion = localStorage.getItem('kromium-selected-version');
          if (savedVersion && data.versions.some((v) => v.version === savedVersion)) {
            setCurrentVersion(savedVersion);
          } else {
            setCurrentVersion(data.latestVersion);
          }
        }
      })
      .catch((err) => {
        console.warn('Using default version manifest:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSetVersion = (ver: string) => {
    setCurrentVersion(ver);
    localStorage.setItem('kromium-selected-version', ver);
  };

  return (
    <VersionContext.Provider
      value={{
        currentVersion,
        setVersion: handleSetVersion,
        versions,
        latestVersion,
        isLoading,
      }}
    >
      {children}
    </VersionContext.Provider>
  );
}
