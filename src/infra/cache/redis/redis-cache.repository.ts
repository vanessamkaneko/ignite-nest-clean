import { Injectable } from "@nestjs/common";
import { ICacheRepository } from "../ICache.repository";
import { RedisService } from "./redis.service";

@Injectable()
export class RedisCacheRepository implements ICacheRepository {
  constructor(private redis: RedisService) { }

  get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  async set(key: string, value: string): Promise<void> {
    await this.redis.set(key, value, 'EX', 60 * 15); // info em cache expirará em 15 min
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(key);
  }
}