import NodeCache from "node-cache";

class Cache {
  constructor() {
    this.cache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });
  }

  get(key) {
    return this.cache.get(key);
  }

  set(key, value, ttl = 3600) {
    this.cache.set(key, value, ttl);
  }

  del(key) {
    this.cache.del(key);
  }

  delPattern(pattern) {
    const keys = this.cache.keys();
    const matchedKeys = keys.filter((key) => key.includes(pattern));
    this.cache.del(matchedKeys);
  }

  flush() {
    this.cache.flushAll();
  }

  getStats() {
    return this.cache.getStats();
  }
}

export default new Cache();
