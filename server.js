const mysql = require("mysql");
const express = require("express");
var cors = require("cors");
var app = express();
app.use(cors());
const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mekhla",
  database: "student",
});
connection.connect((err) => {
  if (!err) console.log("DB connection succeded.");
  else
    console.log(
      "DB connection failed \n Error : " + JSON.stringify(err, undefined, 2)
    );
});

//Get all history
app.get("/history", (req, res) => {
  connection.query("SELECT * FROM kbc_game", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

// Get all leadership board
app.get("/board", (req, res) => {
  connection.query("SELECT Name,Prize FROM kbc_game", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

app.get("/name/add", (req, res) => {
  var { name, prize, time } = req.body;
  const insertQuery =
    "INSERT INTO kbc_game (NAME,Prize,Time) VALUES ('" +
    mysql.escape(name) +
    "'," +
    mysql.escape(prize) +
    "," +
    mysql.escape(time) +
    ")";
  connection.query(insertQuery, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("Successfully added product");
    }
  });
});

// app.get("/name/add", (req, res) => {
//   var { name, prize, time } = req.query;
//   const insertQuery = `INSERT INTO kbc_game (NAME,Prize,Time) VALUES ('"${name}"',"${prize}" , "${time}")`;
//   connection.query(insertQuery, (err, results) => {
//     if (err) {
//       return res.send(err);
//     } else {
//       return res.send("Successfully added product");
//     }
//   });
// });

app.post("/name/add", function (req, res) {
  var postData = req.body;
  connection.query(
    "INSERT INTO kbc_game (NAME,PRIZE,Time) SET ?",
    postData,
    function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    }
  );
});

app.listen(process.env.PORT || 8080, () =>
  console.log("Express server is runnig at port no : 8080")
);
