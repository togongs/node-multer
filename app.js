const express = require("express");
const app = express();
const upload = require("./multer/s3");
const path = require("path");

// 클라이언트에서 넘어온 파일에 대한 정보가 req.file에 "File 객체"로 저장

app.get("/upload", (req, res) => {
  res.sendFile(path.join(__dirname, "multipart.html"));
});

// 파일 하나만 업로드 (multipart.html)
app.post("/upload", upload.single("image"), (req, res) => {
  console.log("req.file 찍히는곳", req.file, "req.body 찍히는곳", req.body);
  console.log("location이 이미지 저장되는 위치", req.file.location);
  res.send("ok");
});

// 파일 여러개를 배열로 업로드 (multipart2.html)
// ex) { img: [File,File,File,...] }
app.post("/uploadArray", upload.array("many", 4), (req, res) => {
  console.log(req.files);
});

// 파일을 여러개의 객체로 업로드 (multipart3.html)
app.post(
  "/uploadFields",
  upload.fields([{ name: "image1" }, { name: "image2" }, { name: "img3" }]),
  (req, res) => {
    console.log(req.files);
  }
);

module.exports = app;
