const { Redis } = require('@upstash/redis');

let redisClient = null;

const hasRedisConfig = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);
const shouldUseRedis = process.env.USE_REDIS !== 'false';

if (hasRedisConfig && shouldUseRedis) {
  try {
    redisClient = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  } catch (error) {
    redisClient = null;
  }
}

const safeRedis = new Proxy({}, {
  get(_target, prop) {
    if (!redisClient) {
      if (prop === 'ping') {
        return async () => false;
      }

      if (prop === 'keys') {
        return async () => [];
      }

      if (prop === 'get') {
        return async () => null;
      }

      if (prop === 'set') {
        return async () => true;
      }

      if (prop === 'del') {
        return async () => true;
      }

      return undefined;
    }

    const value = redisClient[prop];

    if (typeof value !== 'function') {
      return value;
    }

    return async (...args) => {
      try {
        return await value.apply(redisClient, args);
      } catch (error) {
        console.warn(`Redis operation failed (${String(prop)}):`, error.message);
        if (prop === 'keys') return [];
        if (prop === 'get') return null;
        if (prop === 'set') return true;
        if (prop === 'del') return true;
        return null;
      }
    };
  }
});

module.exports = safeRedis;
