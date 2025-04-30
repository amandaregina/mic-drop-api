import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MusicInterface } from 'src/musics/interfaces';
import { PlaylistInterface } from './interfaces';
import * as fs from 'fs';

@Injectable()
export class PlaylistService {
  private readonly filePath = 'src/playlist/playlist.json';

  constructor() {}

  upsertPlaylist(music: MusicInterface) {
    try {
      let playlist: PlaylistInterface[] = [];

      if (fs.existsSync(this.filePath)) {
        const fileContent = fs.readFileSync(this.filePath, 'utf8');
        playlist = fileContent ? JSON.parse(fileContent) : [];
      }

      playlist.push(music);

      fs.writeFileSync(
        this.filePath,
        JSON.stringify(playlist, null, 2),
        'utf8',
      );

      return {
        message: 'Music added successfully',
        playlist,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error,
        'Unable to update playlist',
      );
    }
  }

  getPlaylist() {
    try {
      if (!fs.existsSync(this.filePath)) {
        return [];
      }

      const fileContent = fs.readFileSync(this.filePath, 'utf8');
      const playlist = fileContent ? JSON.parse(fileContent) : [];

      return playlist;
    } catch (error) {
      throw new InternalServerErrorException(error, 'Unable to get playlist');
    }
  }

  removeMusic(music: { title: string; artist: string }) {
    try {
      let playlist: PlaylistInterface[] = [];

      if (fs.existsSync(this.filePath)) {
        const fileContent = fs.readFileSync(this.filePath, 'utf8');
        playlist = fileContent ? JSON.parse(fileContent) : [];
      }

      const removeMusicIndex = playlist.findIndex(
        (musicAtPlaylist) =>
          musicAtPlaylist.artist === music.artist &&
          musicAtPlaylist.title === music.title,
      );

      playlist.splice(removeMusicIndex, 1);

      fs.writeFileSync(
        this.filePath,
        JSON.stringify(playlist, null, 2),
        'utf8',
      );

      return {
        message: 'Music removed successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error,
        'Unable to remove music at playlist',
      );
    }
  }
}
