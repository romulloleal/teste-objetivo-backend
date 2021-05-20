import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const imagesFolder = path.resolve(__dirname, '..', '..', 'images');

export default {
  directory: imagesFolder,

  storage: multer.diskStorage({
    destination: imagesFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
