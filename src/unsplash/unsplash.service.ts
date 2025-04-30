import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class UnsplashService {
  constructor() {}

  async getRandomPhoto() {
    const unsplashApiUrl = `${process.env.UNSPLASH_URL}/photos/random/?client_id=${process.env.UNSPLASH_ACCESS_KEY}&count=5`;

    try {
      const response = await axios.get(unsplashApiUrl);
      return response.data.map((image: any) => ({
        url: image.urls.full,
      }));
    } catch (error) {
      console.error('Unable to get image from unsplash', error);
      throw error;
    }
  }
}
