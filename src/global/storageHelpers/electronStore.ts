import Store from "electron-store";

const store = new Store();

export default (function createWebStorage() {
  let storage = store;
  return {
    getItem: (key: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        resolve(storage.get(key) as string);
      });
    },
    setItem: (key: string, item: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        resolve(storage.set(key, item));
      });
    },
    removeItem: (key: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        resolve(storage.delete(key));
      });
    },
  };
})();
