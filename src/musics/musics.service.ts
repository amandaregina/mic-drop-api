import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { MusicInterface } from './interfaces';
import * as fs from 'fs';

@Injectable()
export class MusicService {
  private readonly filePath = 'src/musics/musics.json';

  constructor() {}

  addMusics(newMusics: MusicInterface[]) {
    try {
      if (!fs.existsSync(this.filePath)) {
        fs.writeFileSync(this.filePath, JSON.stringify([], null, 2), 'utf8');
      }

      const fileContent = fs.readFileSync(this.filePath, 'utf8');
      const musicList: MusicInterface[] = fileContent
        ? JSON.parse(fileContent)
        : [];

      // Filter out duplicates using case-insensitive comparison
      const uniqueNewMusics = newMusics.filter((newMusic) => {
        const isDuplicate = musicList.some(
          (existingMusic) =>
            existingMusic.artist.toLowerCase() ===
              newMusic.artist.toLowerCase() &&
            existingMusic.title.toLowerCase() === newMusic.title.toLowerCase(),
        );

        if (isDuplicate) {
          console.warn(
            `Skipping duplicate: "${newMusic.title}" by ${newMusic.artist}`,
          );
        }

        return !isDuplicate;
      });

      if (uniqueNewMusics.length === 0) {
        return {
          message: 'No new music added - all entries already exist',
          musicList,
        };
      }

      const updatedMusicList = [...musicList, ...uniqueNewMusics];

      fs.writeFileSync(
        this.filePath,
        JSON.stringify(updatedMusicList, null, 2),
        'utf8',
      );

      return {
        message: `Successfully added ${uniqueNewMusics.length} music(s)`,
        added: uniqueNewMusics,
        musicList: updatedMusicList,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'Unknown error',
        'Unable to add music',
      );
    }
  }

  listMusics() {
    try {
      if (!fs.existsSync(this.filePath)) {
        return {
          message: 'No music database found',
          musics: [],
        };
      }

      const fileContent = fs.readFileSync(this.filePath, 'utf8');
      const musicList = fileContent ? JSON.parse(fileContent) : [];

      return {
        message: `Found ${musicList.length} music(s)`,
        musics: musicList,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'Unknown error',
        'Unable to get music list',
      );
    }
  }

  deleteMusic(music: { title: string; artist: string }) {
    try {
      if (!fs.existsSync(this.filePath)) {
        throw new NotFoundException('Music database file not found');
      }

      const fileContent = fs.readFileSync(this.filePath, 'utf8');
      const musicList: MusicInterface[] = fileContent
        ? JSON.parse(fileContent)
        : [];

      const removeMusicIndex = musicList.findIndex(
        (musicAtList) =>
          musicAtList.artist.toLowerCase() === music.artist.toLowerCase() &&
          musicAtList.title.toLowerCase() === music.title.toLowerCase(),
      );

      if (removeMusicIndex === -1) {
        throw new Error(`Music "${music.title}" by ${music.artist} not found`);
      }

      const removedMusic = musicList.splice(removeMusicIndex, 1)[0];

      fs.writeFileSync(
        this.filePath,
        JSON.stringify(musicList, null, 2),
        'utf8',
      );

      return {
        message: 'Music deleted successfully',
        deletedMusic: removedMusic,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'Unknown error',
        'Unable to delete music',
      );
    }
  }
}
