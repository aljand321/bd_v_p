import multer from 'multer';
import uuid from 'uuid/v4';
import path from 'path'

const storageA = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname))
    }
});
//console.log(storage, "   asdasd esto es storage")
const storageB = multer.diskStorage({
    destination: 'uploads/vid',
    filename: (req, file, cb) => {
        console.log(file, " <<<<<<<<<<<<<")
        cb(null, uuid() + path.extname(file.originalname))
    }
}); 

export default multer({ storageA, storageB });