import { Injectable } from '@nestjs/common';
import { Session } from './session';
import {RedisService} from "../redis.service";

@Injectable()
export class SessionService {
    constructor(private readonly redisService: RedisService) {}

    async saveSession(session: Session): Promise<void> {
        const redis = this.redisService.getClient();
        const exists = await redis.exists(`session:${session.id}`);
        if (exists) {
            throw new Error('SessionExistsException');
        }
        await redis.hmset(`session:${session.id}`, {
            id: session.id,
            userId: session.userId,
            createdAt: session.createdAt.toISOString(),
        });
    }

    async getSession(id: string): Promise<Session | null> {
        const redis = this.redisService.getClient();
        const data = await redis.hgetall(`session:${id}`) as unknown as Session;
        if (Object.keys(data).length === 0) {
            return null;
        }
        const session = new Session(data.userId);
        session.id = data.id;
        session.createdAt = new Date(data.createdAt);
        return session;
    }
}