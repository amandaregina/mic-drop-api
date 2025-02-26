import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MusicsInterface } from './interfaces';
import * as fs from 'fs';

@Injectable()
export class MusicsService {
  private readonly filePath = 'src/musics/musics.json';

  constructor() {}

  addMusics(newMusics: MusicsInterface[]) {
    try {
      let musicList: MusicsInterface[] = [];

      if (fs.existsSync(this.filePath)) {
        const fileContent = fs.readFileSync(this.filePath, 'utf8');
        musicList = fileContent ? JSON.parse(fileContent) : [];
      }

      newMusics.forEach((newMusic) => {
        musicList.map((music) => {
          if (
            music.artist === newMusic.artist &&
            music.title === newMusic.title
          ) {
            console.log(
              `The song ${music.title} by ${music.artist} already registered`,
            );

            const removeMusicIndex = newMusics.findIndex(
              (newMusic) =>
                newMusic.artist === music.artist &&
                newMusic.title === music.title,
            );

            newMusics.splice(removeMusicIndex, 1);
          }
        });
      });

      musicList.push(...newMusics);

      fs.writeFileSync(
        this.filePath,
        JSON.stringify(musicList, null, 2),
        'utf8',
      );

      return {
        message: 'Music(s) added successfully',
        musicList,
      };
    } catch (error) {
      throw new InternalServerErrorException(error, 'Unable to add music');
    }
  }

  listMusics() {
    try {
      if (!fs.existsSync(this.filePath)) {
        return [];
      }

      const fileContent = fs.readFileSync(this.filePath, 'utf8');
      const musicList = fileContent ? JSON.parse(fileContent) : [];

      return musicList;
    } catch (error) {
      throw new InternalServerErrorException(error, 'Unable to get music list');
    }
  }
}
