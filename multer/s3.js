const multer = require("multer");
const multerS3 = require("multer-s3"); // 이미지 업로드 시 S3에 업로드 하도록 만들어주는 모듈
const aws = require("aws-sdk"); // AWS 서비스를 연결하기 위한 모듈
const path = require("path");
aws.config.loadFromPath(__dirname + "/awsconfig.json"); // sdk로딩
const s3 = new aws.S3(); // s3객체

const upload = multer({
  storage: multerS3({
    // 어디에 저장할지
    s3: s3,
    bucket: "togongs-bucket",
    key: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
    },
    acl: "public-read-write",
    limits: { fileSize: 5 * 1024 * 1024 },
  }),
});

module.exports = upload;
