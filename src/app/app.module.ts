import { Module } from '@nestjs/common';
import { PlaylistModule } from 'src/playlist/playlist.module';
import { MusicModule } from 'src/musics/musics.module';

@Module({
  imports: [MusicModule, PlaylistModule],
})
export class AppModule {}
