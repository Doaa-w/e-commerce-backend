import multer from 'multer';

const productStorge = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/products");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now().toString().replace(/\\/g, "/") + '-' + file.originalname);
  }
});

export const upload = multer({ storage: productStorge });