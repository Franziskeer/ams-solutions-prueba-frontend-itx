import { z } from "zod";

const STORAGE_PREFIX = "catalog:";
export const CATALOG_CACHE_TTL_MS = 60 * 60 * 1000;

const cacheRecordSchema = z.object({
  savedAt: z.number(),
  data: z.unknown(),
});

function storageKey(key: string): string {
  return `${STORAGE_PREFIX}${key}`;
}

export function readCachedPayload(key: string, now = Date.now()): unknown | null {
  try {
    const raw = localStorage.getItem(storageKey(key));
    if (raw === null) {
      return null;
    }

    const record = cacheRecordSchema.safeParse(JSON.parse(raw));
    if (!record.success || now - record.data.savedAt >= CATALOG_CACHE_TTL_MS) {
      return null;
    }

    return record.data.data;
  } catch {
    return null;
  }
}

export function writeCachedPayload(key: string, data: unknown, now = Date.now()): void {
  try {
    localStorage.setItem(storageKey(key), JSON.stringify({ savedAt: now, data }));
  } catch {
    // Ignore quota and private-mode failures. The next read goes back to the API.
  }
}

export function removeCachedPayload(key: string): void {
  try {
    localStorage.removeItem(storageKey(key));
  } catch {
    // Ignore private-mode failures.
  }
}
