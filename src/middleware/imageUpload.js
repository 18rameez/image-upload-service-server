const multer = require("multer");
const path = require("path");

function generateUniqueId() {
  const min = 10000;
  const max = 99999;
  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum.toString();
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueId = generateUniqueId();
    const ext = path.extname(file.originalname);
    const fileName = path.parse(file.originalname).name;
    req.newFileName = fileName + uniqueId + ext;
    cb(null, fileName + uniqueId + ext);
  },
});
const upload = multer({
   storage: storage,
   fileFilter: function (req, file, cb) {
    // Check if uploaded file is an image
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const err = JSON.stringify({error : 'Invalid file type. Only JPEG, PNG, and GIF files are allowed.'} ) 
      return cb(err, false);
    }
  }
 });

exports.imageUpload = upload;
