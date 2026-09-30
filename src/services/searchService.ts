import MiniSearch from 'minisearch';
import { SearchResult } from '../types/SearchResult';
import { NavNode } from '../types/NavNode';
import { apiDataService } from './apiDataService';

class SearchService {
  private indexes = new Map<string, MiniSearch<SearchResult>>();
  private building = new Map<string, Promise<void>>();

  async buildIndex(version: string): Promise<void> {
    if (this.indexes.has(version)) return;

    if (this.building.has(version)) {
      return this.building.get(version);
    }

    const promise = (async () => {
      try {
        const toc = await apiDataService.getTableOfContents(version);
        const searchItems: SearchResult[] = [];

        const processNode = async (node: NavNode) => {
          if (node.type === 'guide') {
            searchItems.push({
              id: `guide-${node.id}`,
              title: node.title,
              type: 'guide',
              summary: node.description || `Guide: ${node.title}`,
              path: node.path,
              version,
            });
          } else if (node.type === 'entity') {
            searchItems.push({
              id: `entity-${node.id}`,
              title: node.title,
              type: 'entity',
              entityKind: node.entityKind,
              module: node.module,
              summary: node.description || `${node.entityKind || 'API'} in ${node.module || 'Kromium'}`,
              path: node.path,
              version,
            });
          }

          if (node.children && Array.isArray(node.children)) {
            for (const child of node.children) {
              await processNode(child);
            }
          }
        };

        for (const item of toc.items) {
          await processNode(item);
        }

        try {
          const symbols = await apiDataService.getApiSymbols(version);
          for (const sym of symbols) {
            if (sym.methods && Array.isArray(sym.methods)) {
              for (const method of sym.methods) {
                searchItems.push({
                  id: `method-${sym.id}-${method.name}`,
                  title: `${sym.name}.${method.name}()`,
                  type: 'method',
                  containerName: sym.name,
                  module: sym.module || 'kromium-api',
                  summary: method.description || method.signature || method.name,
                  path: `/api/${sym.id}#methods`,
                  version,
                });
              }
            }
            if (sym.properties && Array.isArray(sym.properties)) {
              for (const prop of sym.properties) {
                searchItems.push({
                  id: `prop-${sym.id}-${prop.name}`,
                  title: `${sym.name}.${prop.name}`,
                  type: 'property',
                  containerName: sym.name,
                  module: sym.module || 'kromium-api',
                  summary: prop.description || prop.type || prop.name,
                  path: `/api/${sym.id}#properties`,
                  version,
                });
              }
            }
            if (sym.variants && Array.isArray(sym.variants)) {
              for (const variant of sym.variants) {
                searchItems.push({
                  id: `variant-${sym.id}-${variant.name}`,
                  title: `${sym.name}.${variant.name}`,
                  type: 'entity',
                  entityKind: 'enum',
                  containerName: sym.name,
                  module: sym.module || 'kromium-api',
                  summary: variant.description || `${sym.name} variant ${variant.name}`,
                  path: `/api/${sym.id}#states-and-variants`,
                  version,
                });
              }
            }
          }
        } catch {
          // Ignore if symbols fail to load
        }

        const miniSearch = new MiniSearch<SearchResult>({
          fields: ['title', 'summary', 'containerName', 'module'],
          storeFields: ['id', 'title', 'type', 'entityKind', 'module', 'containerName', 'summary', 'path', 'version'],
          searchOptions: {
            boost: { title: 3, containerName: 2, summary: 1 },
            fuzzy: 0.2,
            prefix: true,
          },
        });

        miniSearch.addAll(searchItems);
        this.indexes.set(version, miniSearch);
      } finally {
        this.building.delete(version);
      }
    })();

    this.building.set(version, promise);
    return promise;
  }

  async search(query: string, version: string, limit = 10): Promise<SearchResult[]> {
    if (!query.trim()) return [];

    await this.buildIndex(version);
    const index = this.indexes.get(version);
    if (!index) return [];

    const results = index.search(query, {
      fuzzy: 0.2,
      prefix: true,
      boost: { title: 3, containerName: 2 },
    });

    return results.slice(0, limit).map((res) => ({
      id: res.id,
      title: res.title,
      type: res.type,
      entityKind: res.entityKind,
      module: res.module,
      containerName: res.containerName,
      summary: res.summary,
      path: res.path,
      version: res.version,
    }));
  }
}

export const searchService = new SearchService();
