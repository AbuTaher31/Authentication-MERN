import multer from "multer";

//create multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images/"));
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const studentPhotomulter = multer({ storage }).array("student_photo", 10);

export default storage;
