import { Controller, Post, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { SessionService } from './session.service';
import { Session } from './session';

@Controller('sessions')
export class SessionController {
    constructor(private readonly sessionService: SessionService) {}

    @Post('users/:userId')
    async createSession(@Param('userId') userId: string): Promise<Session> {
        const session = new Session(userId);
        try {
            await this.sessionService.saveSession(session);
        } catch (e) {
            if (e.message === 'SessionExistsException') {
                throw new HttpException('Conflict', HttpStatus.CONFLICT);
            }
            throw e;
        }
        return session;
    }

    @Get(':id')
    async getSession(@Param('id') id: string): Promise<Session> {
        const session = await this.sessionService.getSession(id);
        if (!session) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        return session;
    }
}