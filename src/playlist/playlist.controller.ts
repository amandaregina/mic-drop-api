import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { UpsertPlaylistBodyRequestDto } from './dtos/upsert-playlist.request';
import { RequestValidationPipe } from 'src/pipes/request-validation.pipe';
import { upsertPlaylistBodySchema } from './schemas/upsert-playlist-body.schema';

@Controller('playlist')
export class PlaylistController {
  constructor(
    @Inject(PlaylistService)
    private readonly playlistService: PlaylistService,
  ) {}

  @Get()
  getPlaylist() {
    const playlist = this.playlistService.getPlaylist();
    return playlist;
  }

  @Post('add')
  upsertPlaylist(
    @Body(new RequestValidationPipe(upsertPlaylistBodySchema))
    body: UpsertPlaylistBodyRequestDto,
  ) {
    const response = this.playlistService.upsertPlaylist(body);

    return response;
  }
}
