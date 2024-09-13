import type { Nullable } from './nullable';

export interface KvStorage {
  set(key: string, value: string): void;
  get(key: string): Nullable<string>;
  remove(key: string): void;
  addListener(listener: (e: StorageEvent) => void): () => void;
}
