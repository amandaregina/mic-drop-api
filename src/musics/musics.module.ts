import { Module } from '@nestjs/common';
import { MusicService } from './musics.service';
import { MusicController } from './musics.controller';

@Module({
  controllers: [MusicController],
  providers: [MusicService],
})
export class MusicModule {}
