import { Body, Controller, Delete, Get, Inject, Post } from '@nestjs/common';
import { MusicService } from './musics.service';
import { AddMusicsBodyRequestDto } from './dtos/add-musics.request';
import { addMusicsBodySchema } from './schemas/add-musics-body.schema';
import { RequestValidationPipe } from 'src/pipes/request-validation.pipe';
import { DeleteMusicsBodyRequestDto } from './dtos/delete-music.request';
import { removeMusicBodySchema } from './schemas/remove-music-body.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Music')
@Controller({
  version: '1',
})
export class MusicController {
  constructor(
    @Inject(MusicService)
    private readonly musicService: MusicService,
  ) {}

  @Get('music')
  listMusics() {
    const musicList = this.musicService.listMusics();
    return musicList;
  }

  @Post('music/add')
  addMusics(
    @Body(new RequestValidationPipe(addMusicsBodySchema))
    body: AddMusicsBodyRequestDto[],
  ) {
    const response = this.musicService.addMusics(body);

    return response;
  }

  @Delete('music')
  deleteMusic(
    @Body(new RequestValidationPipe(removeMusicBodySchema))
    body: DeleteMusicsBodyRequestDto,
  ) {
    const response = this.musicService.deleteMusic(body);

    return response;
  }
}
