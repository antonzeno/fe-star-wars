import { LRUCache } from 'lru-cache';

export class CacheService {
  private static instance: CacheService;
  private cache: LRUCache<string, Record<string, unknown>>;

  private constructor() {
    this.cache = new LRUCache<string, Record<string, unknown>>({
      max: 500, 
      ttl: 1000 * 60 * 60,
      updateAgeOnGet: true,
      allowStale: false,
    });
  }

  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  get(key: string) {
    return this.cache.get(key);
  }

  set(key: string, value: Record<string, unknown>) {
    return this.cache.set(key, value);
  }

  clear() {
    return this.cache.clear();
  }

  delete(key: string) {
    return this.cache.delete(key);
  }

  has(key: string) {
    return this.cache.has(key);
  }
}

export const cacheService = CacheService.getInstance();