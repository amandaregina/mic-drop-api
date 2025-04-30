import { Controller, Param, Post } from '@nestjs/common';
import { FfmpegService } from './ffmpeg.service';

@Controller('Ffmpeg')
export class FfmpegController {
  constructor(private readonly ffmpegService: FfmpegService) {}

  @Post('create/:songName')
  async createKaraokeVideo(
    @Param('songName') songName: string,
  ): Promise<string> {
    await this.ffmpegService.createMicDropVideo(songName);
    return `Vídeo de karaokê criado para a música: ${songName}`;
  }
}
