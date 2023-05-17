import { HttpService } from '@nestjs/axios';
export declare class FilesService {
    private readonly httpService;
    constructor(httpService: HttpService);
    deleteFile(body: any): Promise<void>;
    moveImages(body: any): Promise<void>;
    saveJson(body: any): Promise<void>;
    validateToken(token: any): Promise<boolean>;
}
