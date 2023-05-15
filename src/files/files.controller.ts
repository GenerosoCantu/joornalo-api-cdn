import { Controller, Get, Post, Put, Delete, Patch, Body, Param, Req, RawBodyRequest } from '@nestjs/common';
import { FilesService } from './files.service';
import { ValidationPipe, ParseUUIDPipe, UploadedFile, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { imageFileFilter, getToken } from '../utils/file-upload.utils';
import { diskStorage } from 'multer';
const fs = require('fs');

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService
  ) { }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './data/tmp',
        filename: (req, file, cb) => {
          // console.log('req==>', req)
          // console.log('file==>', file)
          // console.log('cb==>', cb)
          const extension = file.originalname.split('.').pop();
          // [fieldName]-[date].[ext]
          cb(null, `${file.fieldname}-${Date.now()}.${extension}`);
        },
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@Req() request: RawBodyRequest<Request>, @UploadedFile() file) {
    const Token = await getToken(request.headers);
    const validateToken = await this.filesService.validateToken(Token);
    if (validateToken) {
      if (file.originalname !== 'tmpImage.webp') {
        this.filesService.deleteFile('data/tmp/' + file.originalname);
      }
      const response = {
        originalname: file.originalname,
        filename: file.filename,
        src: `http://localhost:5000/tmp/${file.filename}`
      };
      return response;
    }
  }

  @Delete()
  async delete(@Req() request: RawBodyRequest<Request>) {
    const Token = await getToken(request.headers);
    const validateToken = await this.filesService.validateToken(Token);
    if (validateToken) {
      return this.filesService.deleteFile(request.body);
    }
  }

  @Delete('tmp/:id')
  async deleteTmp(@Req() request: RawBodyRequest<Request>, @Param('id') id): Promise<any> {
    const Token = await getToken(request.headers);
    const validateToken = await this.filesService.validateToken(Token)
    if (validateToken) {
      return this.filesService.deleteFile({ fileName: 'data/tmp/' + id });
    }

  }

  @Patch('moveimages')
  async moveImages(@Req() request: RawBodyRequest<Request>): Promise<any> {
    const Token = await getToken(request.headers);
    const validateToken = await this.filesService.validateToken(Token);
    if (validateToken) {
      return this.filesService.moveImages(request.body);
    }
  }

  @Patch('json')
  async writejson(@Req() request: RawBodyRequest<Request>) {
    const Token = await getToken(request.headers);
    const validateToken = await this.filesService.validateToken(Token);
    if (validateToken) {
      return this.filesService.saveJson(request.body);
    }
  }

}
