import multer from 'multer';
import uuid from 'uuid/v4';
import path from 'path'

const storageVideo = multer.diskStorage({
    destination: 'uploads/vid',
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname))
    }
});

export default multer({ storageVideo });