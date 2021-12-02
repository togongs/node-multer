const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    // 어디에 저장할지
    s3: s3,
    bucket: "",
    acl: "",
    key: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
    },
    limits: { fileSize: 5 * 1024 * 1024 },
  }),
});

module.exports = upload;
