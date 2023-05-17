"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = exports.imageFileFilter = void 0;
const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};
exports.imageFileFilter = imageFileFilter;
const getToken = async (headers) => {
    var _a;
    const Headers = JSON.parse(JSON.stringify(headers));
    return (_a = Headers.authorization) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
};
exports.getToken = getToken;
//# sourceMappingURL=file-upload.utils.js.map