import {Module} from '@nestjs/common';
import {SessionService} from './session.service';
import {SessionController} from './session.controller';
import {RedisService} from "../redis.service";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [ConfigModule.forRoot()],
    providers: [SessionService, RedisService],
    controllers: [SessionController],
})
export class SessionModule {}