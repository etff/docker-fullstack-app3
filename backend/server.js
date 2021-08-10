const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const { restart } = require("nodemon");
const app = express();

// json 형태 오는 본문을 해석할 수 있게 등록
app.use(bodyParser.json());

// 테이블 생성하기
// db.pool.query(
//   `CREATE TABLE lists (
//     id INTEGER AUTO INCREMENT
//     value TEXT,
//     PRIMARY KEY (id)
//     )`,
//   (err, results, fields) => {
//     console.log("results", results);
//   }
// );

//DB lists 테이블에 있는 모든 데이터를 프론트 서베에 보내주기
app.get("/api/hi", function (req, res) {
  //데이테베이스에서 모든 정보 가져오기
  res.status(200).send("good");
});

// DB lists
app.get("/api/values", function (req, res) {
  // 데이터베이스에서 모든 정보 가져오기
  db.pool.query("SELECT * FROM lists;", (err, results, fields) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.json(results);
    }
  });
});

// 클라이언트에서 입력한 값을 넣주기
app.post("/api/value", function (req, res, next) {
  db.pool.query(
    `INSERT INTO lists (values) VALUES("${req.body.values})`,
    (err, results, fields) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.json({ success: true, value: req.body.value });
      }
    }
  );
});

app.listen(5000, () => {
  console.log("application starts on port 5000");
});
