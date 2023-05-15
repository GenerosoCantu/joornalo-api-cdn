import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesModule } from './files/files.module';
import config from './config/keys'

@Module({
  imports: [
    MongooseModule.forRoot(config.MONGO_URI),
    FilesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }