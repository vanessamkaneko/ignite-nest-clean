import { Module } from "@nestjs/common";
import { EnvModule } from "../env/env.module";
import { EnvService } from "../env/env.service";
import { ICacheRepository } from "./ICache.repository";
import { RedisCacheRepository } from "./redis/redis-cache.repository";
import { RedisService } from "./redis/redis.service";

@Module({
  imports: [EnvModule],
  providers: [
    RedisService,
    {
      provide: ICacheRepository,
      useClass: RedisCacheRepository,
    }
  ],
  exports: [ICacheRepository]
})
export class CacheModule {}