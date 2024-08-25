export const localStore = {
  getData(key: string) {
    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : null;
  },

  update(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove(key: string): void {
    localStorage.removeItem(key);
  },

  clear(): void {
    localStorage.clear();
  },
};
