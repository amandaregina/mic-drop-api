import { Module } from '@nestjs/common';
import { SongsModule } from 'src/songs/songs.module';

@Module({
  imports: [SongsModule],
})
export class AppModule {}
