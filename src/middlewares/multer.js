import multer from "multer";

const imageStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './src/productsImage');
    }, filename: function (req, file, cb) {
        cb(null,Date.now() + "-" + file.originalname);
    }
});

const uploader = multer({ storage: imageStorage });

export const uploadImages = uploader.array('imagesToUpload', 10);