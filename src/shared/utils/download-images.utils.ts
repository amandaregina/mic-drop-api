import axios from 'axios';
import * as fs from 'fs';

export async function downloadImage(
  url: string,
  filePath: string,
): Promise<void> {
  const writer = fs.createWriteStream(filePath);
  const response = await axios.get(url, { responseType: 'stream' });
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}
