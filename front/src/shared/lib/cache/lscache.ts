import lscache from 'lscache';

const get = (name: string) => {
  return lscache.get(name);
};

// ttl default 1 day = 1*24*60
const set = (name: string, value: any, ttl: number = 24 * 60) => {
  return lscache.set(name, value, ttl);
};

const remove = (name: string) => {
  return lscache.remove(name);
};

const flush = () => {
  return lscache.flush();
};

const flushExpired = () => {
  return lscache.flushExpired();
};

export const LocalStorageCache = { get, set, remove, flush, flushExpired };
