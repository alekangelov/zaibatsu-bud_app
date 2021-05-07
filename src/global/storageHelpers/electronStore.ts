import Store from "electron-store";

const store = new Store();

export default (function createWebStorage() {
  let storage = store;
  console.log(store);
  return {
    getItem: (key: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        // console.log({ [key]: storage.get(key) });
        resolve(storage.get(key) as string);
      });
    },
    setItem: (key: string, item: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        // console.log({ key, item });
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
