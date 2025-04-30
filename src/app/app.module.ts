import { Module } from '@nestjs/common';
import { PlaylistModule } from 'src/playlist/playlist.module';
import { MusicModule } from 'src/musics/musics.module';
import { FfmpegModule } from 'src/ffmpeg/ffmpeg.module';
import { UnsplashModule } from 'src/unsplash/unsplash.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MusicModule,
    PlaylistModule,
    FfmpegModule,
    UnsplashModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
})
export class AppModule {}
