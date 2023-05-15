import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { catchError, firstValueFrom } from 'rxjs';
import config from '../config/keys'
import * as fs from 'fs';
import { moveFile, deleteFile } from '../utils/file-json.utils';

@Injectable()
export class FilesService {
  constructor(
    private readonly httpService: HttpService
  ) { }

  async deleteFile(body) {
    fs.unlink(body.fileName, (err) => {
      if (err) {
        console.log(err);
      }
      console.log("Delete File successfully...", body.fileName);
      return;
    });
  }

  async moveImages(body) {
    // path, oldStory['images'], story['images']
    const { path, oldImages, newImages } = body;

    const oldFilename = oldImages.map((img) => img.filename)
    const newFilename = newImages.map((img) => img.filename)
    const removedImages = oldFilename.filter((filename) => !newFilename.includes(filename));
    const moveImages = newFilename.filter((filename) => !oldFilename.includes(filename));

    // Move tmp images that are in newImages but not in oldImages
    await moveImages.forEach(filename => moveFile(`data/tmp/${filename}`, `${path}${filename}`));
    // Delete images that are in oldImages but not in newImages
    await removedImages.forEach(filename => deleteFile(`${path}${filename}`));

    return;
  }

  async saveJson(body) {
    const { path, fileName, obj } = body;
    // console.log('body::::', body)
    // console.log('path::::', path);
    // console.log('fileName::::', fileName);
    // console.log('obj::::', obj);

    await fs.writeFile(path + fileName + '.json', JSON.stringify(obj), { flag: 'w' }, function (err) {
      if (err) console.log(err);
    });

    return;
  }

  async validateToken(token) {
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }
    const { status } = await firstValueFrom(
      this.httpService.get(`${config.JOORNALO_API_URL}auth/validate`, axiosConfig).pipe(
        catchError((error) => {
          console.log('Token not valid!');
          throw new HttpException(error.response.data, error.response.status);
        }),
      )
    );
    return true;
  }

}
