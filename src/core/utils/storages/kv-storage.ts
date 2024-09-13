import { KvStorage, Nullable } from '../../types';

export class KvStorageImpl implements KvStorage {
  set(key: string, newValue: string) {
    const oldValue = this.get(key);

    window.localStorage.setItem(key, newValue);
    window.dispatchEvent(
      new StorageEvent('storage', {
        storageArea: window.localStorage,
        url: window.location.href,
        key,
        newValue,
        oldValue,
      }),
    );
  }

  remove(key: string) {
    window.localStorage.removeItem(key);
    window.dispatchEvent(
      new StorageEvent('storage', {
        storageArea: window.localStorage,
        url: window.location.href,
        key,
      }),
    );
  }

  get(key: string): Nullable<string> {
    return window.localStorage.getItem(key);
  }

  addListener = (listener: (e: StorageEvent) => void) => {
    window.addEventListener('storage', listener);

    return () => window.removeEventListener('storage', listener);
  };
}
