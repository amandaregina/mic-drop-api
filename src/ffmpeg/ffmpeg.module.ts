// src/ffmpeg/ffmpeg.module.ts
import { Module } from '@nestjs/common';
import { FfmpegService } from './ffmpeg.service';
import { FfmpegController } from './ffmpeg.controller';

@Module({
  providers: [FfmpegService],
  controllers: [FfmpegController],
})
export class FfmpegModule {}
