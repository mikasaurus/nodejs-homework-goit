import multer from "multer";

export const uploadImage = multer.diskStorage({
  destination: ".tmp",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: uploadImage });
