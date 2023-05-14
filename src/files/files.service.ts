import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
// import * as config from 'config';
import * as fs from 'fs';
// import * as path from 'path';
import { moveFile, deleteFile } from '../utils/file-json.utils';

@Injectable()
export class FilesService {
  constructor() { }

  // async uploadFile(file) {
  //   console.log('filename: ', file[0]);
  //   console.log('filename: ', file[0].filename);
  //   fs.rename('data/tmp/' + file[0].filename, 'data/b/' + file[0].originalname, (err) => {
  //     if (err) console.log(err);
  //     fs.unlink('data/tmp/' + file[0].filename, (err) => {
  //       // if (err) console.log(err);
  //       console.log('originalname: ', file[0].originalname);
  //       console.log('Download complete!');
  //       return { file: file[0].originalname };
  //     });
  //   });
  // }

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
    console.log('body::::', body)
    console.log('path::::', path);
    console.log('fileName::::', fileName);
    console.log('obj::::', obj);

    await fs.writeFile(path + fileName + '.json', JSON.stringify(obj), { flag: 'w' }, function (err) {
      if (err) console.log(err);
    });

    return;
  }


}
