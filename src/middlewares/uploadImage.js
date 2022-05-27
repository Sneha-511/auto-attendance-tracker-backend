const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const config = require('../config/config');

const { cloudinary } = config;

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'auto-attendance-tracker',
    public_id: (req) => {
      req.publicId = Date.now().toString();
      return req.publicId;
    },
  },
});

const imageFilter = function (req, file, cb) {
  const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/jpg', 'image/png'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    req.errorMessage = 'Invalid file type. Only jpg, png image files are allowed.';
    cb(null, false, req.errorMessage);
  }
};

const uploadImage = multer({ storage, fileFilter: imageFilter });

module.exports = {
  uploadImage,
};
