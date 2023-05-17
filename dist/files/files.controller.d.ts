import { RawBodyRequest } from '@nestjs/common';
import { FilesService } from './files.service';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    uploadedFile(request: RawBodyRequest<Request>, file: any): Promise<{
        originalname: any;
        filename: any;
        src: string;
    }>;
    delete(request: RawBodyRequest<Request>): Promise<void>;
    deleteTmp(request: RawBodyRequest<Request>, id: any): Promise<any>;
    moveImages(request: RawBodyRequest<Request>): Promise<any>;
    writejson(request: RawBodyRequest<Request>): Promise<void>;
}
