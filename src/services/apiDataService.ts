import { TocData } from '../types/TocData';
import { NavNode } from '../types/NavNode';
import { ApiModule } from '../types/ApiModule';
import { ApiEntity } from '../types/ApiEntity';
import { Guide } from '../types/Guide';
import { ApiSymbol } from '../types/ApiSymbol';

class ApiDataService {
  private tocCache = new Map<string, TocData>();
  private moduleCache = new Map<string, ApiModule>();
  private entityCache = new Map<string, ApiEntity>();
  private guideCache = new Map<string, Guide>();
  private symbolsCache = new Map<string, ApiSymbol[]>();

  async getTableOfContents(version: string): Promise<TocData> {
    if (this.tocCache.has(version)) {
      return this.tocCache.get(version)!;
    }

    const response = await fetch(`/data/versions/${version}/toc.json`);
    if (!response.ok) {
      throw new Error(`Failed to load TOC for version ${version} (HTTP ${response.status})`);
    }

    const data: TocData = await response.json();
    this.tocCache.set(version, data);
    return data;
  }

  async getApiSymbols(version: string): Promise<ApiSymbol[]> {
    if (this.symbolsCache.has(version)) {
      return this.symbolsCache.get(version)!;
    }

    try {
      const response = await fetch(`/data/versions/${version}/api-symbols.json`);
      if (response.ok) {
        const symbols: ApiSymbol[] = await response.json();
        this.symbolsCache.set(version, symbols);
        return symbols;
      }
    } catch {
      // Fallback below
    }

    // Dynamic fallback: extract all symbol IDs from toc.json and load individual symbol files
    try {
      const toc = await this.getTableOfContents(version);
      const symbolIds: string[] = [];
      const extractEntities = (nodes: NavNode[]) => {
        for (const node of nodes) {
          if (node.type === 'entity') {
            symbolIds.push(node.id);
          }
          if (node.children) {
            extractEntities(node.children);
          }
        }
      };
      extractEntities(toc.items);

      const symbols = (
        await Promise.all(symbolIds.map((id) => this.getApiSymbol(version, id)))
      ).filter((s): s is ApiSymbol => s !== null);

      this.symbolsCache.set(version, symbols);
      return symbols;
    } catch {
      return [];
    }
  }

  private individualSymbolCache = new Map<string, ApiSymbol>();

  async getApiSymbol(version: string, symbolId: string): Promise<ApiSymbol | null> {
    const cacheKey = `${version}:${symbolId.toLowerCase()}`;
    if (this.individualSymbolCache.has(cacheKey)) {
      return this.individualSymbolCache.get(cacheKey)!;
    }

    const normalizedId = symbolId.toLowerCase();
    const candidatePaths = [
      `/data/versions/${version}/symbols/${symbolId}.json`,
      `/data/versions/${version}/symbols/${normalizedId}.json`,
      `/data/versions/${version}/objects/${symbolId}.json`,
      `/data/versions/${version}/objects/${normalizedId}.json`,
      `/data/versions/${version}/api/${symbolId}.json`,
      `/data/versions/${version}/api/${normalizedId}.json`,
      `/data/symbols/${symbolId}.json`,
      `/data/symbols/${normalizedId}.json`,
      `/data/objects/${symbolId}.json`,
      `/data/objects/${normalizedId}.json`,
    ];

    for (const path of candidatePaths) {
      try {
        const response = await fetch(path);
        if (response.ok) {
          const raw = await response.json();
          let symbol: ApiSymbol = raw;

          // If the object file stores version-keyed data
          if (raw.versions && typeof raw.versions === 'object' && !Array.isArray(raw.versions)) {
            const versionData =
              raw.versions[version] ||
              raw.versions[raw.latestVersion] ||
              Object.values(raw.versions)[0];

            if (versionData) {
              symbol = {
                ...raw,
                ...versionData,
                versionHistory: raw.versionHistory || versionData.versionHistory,
              };
            }
          }

          this.individualSymbolCache.set(cacheKey, symbol);
          return symbol;
        }
      } catch {
        // Continue to next candidate path
      }
    }

    // Fallback: check monolithic api-symbols.json
    try {
      const symbols = await this.getApiSymbols(version);
      const found =
        symbols.find(
          (s) =>
            s.id.toLowerCase() === normalizedId ||
            s.name.toLowerCase() === normalizedId
        ) || null;

      if (found) {
        this.individualSymbolCache.set(cacheKey, found);
      }
      return found;
    } catch {
      return null;
    }
  }

  async getModule(version: string, moduleId: string): Promise<ApiModule> {
    const key = `${version}:${moduleId}`;
    if (this.moduleCache.has(key)) {
      return this.moduleCache.get(key)!;
    }

    const response = await fetch(`/data/versions/${version}/api/${moduleId}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load module ${moduleId} for version ${version}`);
    }

    const data: ApiModule = await response.json();
    this.moduleCache.set(key, data);

    if (data.entities) {
      for (const entity of data.entities) {
        this.entityCache.set(`${version}:${entity.id}`, entity);
      }
    }

    return data;
  }

  async getEntity(version: string, moduleId: string, entityId: string): Promise<ApiEntity | null> {
    const key = `${version}:${entityId}`;
    if (this.entityCache.has(key)) {
      return this.entityCache.get(key)!;
    }

    const mod = await this.getModule(version, moduleId);
    const entity = mod.entities.find((e) => e.id === entityId) || null;
    if (entity) {
      this.entityCache.set(key, entity);
    }
    return entity;
  }

  async getGuide(version: string, guideId: string): Promise<Guide> {
    const key = `${version}:${guideId}`;
    if (this.guideCache.has(key)) {
      return this.guideCache.get(key)!;
    }

    const response = await fetch(`/data/versions/${version}/guides/${guideId}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load guide ${guideId} for version ${version}`);
    }

    const data: Guide = await response.json();
    this.guideCache.set(key, data);
    return data;
  }

  clearCache(): void {
    this.tocCache.clear();
    this.moduleCache.clear();
    this.entityCache.clear();
    this.guideCache.clear();
    this.symbolsCache.clear();
    this.individualSymbolCache.clear();
  }
}

export const apiDataService = new ApiDataService();
