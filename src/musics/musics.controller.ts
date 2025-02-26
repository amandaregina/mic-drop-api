import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { AddMusicsBodyRequestDto } from './dtos/add-musics.request';

@Controller('musics')
export class MusicsController {
  constructor(
    @Inject(MusicsService)
    private readonly musicsService: MusicsService,
  ) {}

  @Get()
  listMusics() {
    const musicList = this.musicsService.listMusics();
    return musicList;
  }

  @Post('add')
  addMusics(@Body() body: AddMusicsBodyRequestDto[]) {
    const response = this.musicsService.addMusics(body);

    return response;
  }
}
