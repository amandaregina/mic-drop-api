import { Injectable } from '@nestjs/common';
import * as ffmpeg from 'fluent-ffmpeg';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ffmpegStatic = require('ffmpeg-static');

import * as fs from 'fs';
import * as path from 'path';
import { UnsplashService } from 'src/unsplash/unsplash.service';
import { downloadImage } from 'src/shared/utils/download-images.utils';

@Injectable()
export class FfmpegService {
  private unsplashService = new UnsplashService();

  constructor() {
    ffmpeg.setFfmpegPath(ffmpegStatic);
  }

  async createMicDropVideo(song: string) {
    try {
      //const images = await this.unsplashService.getRandomPhoto();
      const images = [
        {
          url: 'https://images.unsplash.com/photo-1728519616666-d092572850f9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3Mjg5MzJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDMwODQwMzl8&ixlib=rb-4.0.3&q=85',
        },
        {
          url: 'https://images.unsplash.com/photo-1734799081043-e94d698bd6a2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3Mjg5MzJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDMwODQwMzl8&ixlib=rb-4.0.3&q=85',
        },
        {
          url: 'https://images.unsplash.com/photo-1738253145888-e8f1e20ab05b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3Mjg5MzJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDMwODQwMzl8&ixlib=rb-4.0.3&q=85',
        },
        {
          url: 'https://images.unsplash.com/photo-1740920988406-aa608bf80c63?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3Mjg5MzJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDMwODQwMzl8&ixlib=rb-4.0.3&q=85',
        },
        {
          url: 'https://images.unsplash.com/photo-1742466851711-24e957c6f2a8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3Mjg5MzJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDMwODQwMzl8&ixlib=rb-4.0.3&q=85',
        },
      ];

      const tempFolder = path.join(__dirname, 'temp');
      const outputVideo = path.join(tempFolder, 'karaoke_video.mp4');

      if (!fs.existsSync(tempFolder)) {
        fs.mkdirSync(tempFolder, { recursive: true });
      }

      const imagePaths: string[] = [];

      //TODO: refatorar isso aqui
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const imagePath = path.join(tempFolder, `image_${i}.jpg`);

        try {
          await downloadImage(image.url, imagePath);
          const stats = fs.statSync(imagePath);
          if (stats.size === 0) {
            throw new Error(`Arquivo ${imagePath} está vazio`);
          }
          imagePaths.push(imagePath);
        } catch (err) {
          console.error(`Erro ao baixar imagem ${i}:`, err);
          throw err;
        }
      }

      const listFilePath = path.join(tempFolder, 'imagePaths.txt');

      const fileContent = imagePaths
        .map((imgPath) => `file '${imgPath}'`)
        .join('\n');

      fs.writeFileSync(listFilePath, fileContent, { encoding: 'utf8' });

      ffmpeg()
        .input(listFilePath)
        .inputOptions([
          '-framerate',
          '1',
          '-err_detect',
          'ignore_err',
          '-thread_queue_size',
          '512',
        ])
        .outputOptions([
          '-vf',
          `fps=25,drawtext=text='${song}':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:fontsize=24:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2`,
          '-movflags',
          '+faststart',
        ])
        .output(outputVideo)
        .on('end', () => {
          console.log('Vídeo gerado com sucesso!');
        })
        .on('error', (err) => {
          console.error('Erro ao gerar vídeo:', err);
          throw err;
        })
        .run();
    } catch (error) {
      console.error('Unable to create mic drop video', error);
      throw error;
    }
  }
}
