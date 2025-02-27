import { Body, Controller, Delete, Get, Inject, Post } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { UpsertPlaylistBodyRequestDto } from './dtos/upsert-playlist.request';
import { RequestValidationPipe } from 'src/pipes/request-validation.pipe';
import { upsertPlaylistBodySchema } from './schemas/upsert-playlist-body.schema';
import { DeleteMusicsBodyRequestDto } from 'src/musics/dtos/delete-music.request';
import { removeMusicBodySchema } from 'src/musics/schemas/remove-music-body.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Playlist')
@Controller({
  version: '1',
})
export class PlaylistController {
  constructor(
    @Inject(PlaylistService)
    private readonly playlistService: PlaylistService,
  ) {}

  @Get('playlist')
  getPlaylist() {
    const playlist = this.playlistService.getPlaylist();
    return playlist;
  }

  @Post('playlist/add')
  upsertPlaylist(
    @Body(new RequestValidationPipe(upsertPlaylistBodySchema))
    body: UpsertPlaylistBodyRequestDto,
  ) {
    const response = this.playlistService.upsertPlaylist(body);

    return response;
  }

  @Delete('playlist')
  removeMusic(
    @Body(new RequestValidationPipe(removeMusicBodySchema))
    body: DeleteMusicsBodyRequestDto,
  ) {
    const response = this.playlistService.removeMusic(body);

    return response;
  }
}
