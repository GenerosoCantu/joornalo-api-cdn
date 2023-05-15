import { extname } from 'path';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const getToken = async (headers) => {
  const Headers = JSON.parse(JSON.stringify(headers));
  return Headers.authorization?.replace('Bearer ', '')
};
