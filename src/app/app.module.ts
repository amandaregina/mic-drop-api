import { Module } from '@nestjs/common';
import { PlaylistModule } from 'src/playlist/playlist.module';
import { MusicsModule } from 'src/musics/musics.module';

@Module({
  imports: [MusicsModule, PlaylistModule],
})
export class AppModule {}
