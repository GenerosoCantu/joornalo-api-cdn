"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const fs = require("fs");
const file_json_utils_1 = require("../utils/file-json.utils");
let FilesService = class FilesService {
    constructor(httpService) {
        this.httpService = httpService;
    }
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
        const { path, oldImages, newImages } = body;
        const oldFilename = oldImages.map((img) => img.filename);
        const newFilename = newImages.map((img) => img.filename);
        const removedImages = oldFilename.filter((filename) => !newFilename.includes(filename));
        const moveImages = newFilename.filter((filename) => !oldFilename.includes(filename));
        await moveImages.forEach(filename => (0, file_json_utils_1.moveFile)(`data/tmp/${filename}`, `${path}${filename}`));
        await removedImages.forEach(filename => (0, file_json_utils_1.deleteFile)(`${path}${filename}`));
        return;
    }
    async saveJson(body) {
        const { path, fileName, obj } = body;
        await fs.writeFile(path + fileName + '.json', JSON.stringify(obj), { flag: 'w' }, function (err) {
            if (err)
                console.log(err);
        });
        return;
    }
    async validateToken(token) {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        };
        const { status } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${process.env.JOORNALO_API_URL}auth/validate`, axiosConfig).pipe((0, rxjs_1.catchError)((error) => {
            console.log('Token not valid!');
            throw new common_1.HttpException(error.response.data, error.response.status);
        })));
        return true;
    }
};
FilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], FilesService);
exports.FilesService = FilesService;
//# sourceMappingURL=files.service.js.map