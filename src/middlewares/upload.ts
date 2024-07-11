import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 }, // 1MB limit
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image file (jpg, jpeg, or png)"));
    }
    cb(null, true);
  },
});

export default upload;
