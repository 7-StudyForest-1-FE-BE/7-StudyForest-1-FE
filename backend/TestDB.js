const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: "../.env" }); // .env 파일 경로 설정

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어
app.use(cors());
app.use(express.json());

// MongoDB 연결
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB 연결 성공!");
  })
  .catch((error) => {
    console.error("❌ MongoDB 연결 실패:", error);
  });

// 테스트 라우트
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend 서버가 정상적으로 동작중입니다!" });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 서버가 포트 ${PORT}에서 실행중입니다.`);
});
