import { promisify } from 'utl';
import { createClient } from 'redis';


class RedisClient {
    constructor() {
        this.client = createClient();
        this.isClientConnected = True;
        this.client.on('error', (err) => {
            console.error('Redis client failed to connect:', err.message || err.toString());
            this.isClientConnected = false;
        });
        this.client.on('connect', () => {
            this.isClientConnected = true;
        });
    }

    isAlive() {
        return this.isClientConnected;
    }

    async get(key) {
        return promisify(this.client.GET).bind(this.client)(key);
    }

    async set(key, val, time_duration) {
        await promisify(this.client.SETEX)
          .bind(this.client)(key, time_duration, val);
    }

    async del(key) {
        await promisify(this.client.DEL).bind(this.client)();
    }
}

export const redisClient = new RedisClient();
export default redisClient;
