import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
    private readonly redis: Redis;
    private readonly ConfigService: ConfigService;

    constructor(configService: ConfigService) {
        this.ConfigService = configService;
        const redisHost = this.ConfigService.get('REDIS_HOST') || 'localhost';
        this.redis = new Redis({
            host: redisHost,
        });
    }

    getClient(): Redis {
        return this.redis;
    }
}