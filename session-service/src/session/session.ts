import { Injectable } from '@nestjs/common';

@Injectable()
export class Session {
    id: string;
    userId: string;
    createdAt: Date;

    constructor(userId: string) {
        this.id = userId; // UUID.randomUUID().toString();
        this.userId = userId;
        this.createdAt = new Date();
    }
}