// Example using Express.js
const express = require("express");
const app = express();
const cors = require("cors");
var bodyParser = require("body-parser");
let multer = require("multer");
const fs = require("fs");
var path = require("path");
const mysql = require("mysql2");

let userConnection;

var hostname = "localhost";
var database = "amberalertdb";
var username = "admin";
let password = "adminPassword";

function handleDisconnect() {
  userConnection = mysql.createConnection({
    host: hostname,
    user: username,
    password,
    database,
    port: 3306,
    idleTimeout: -1,
    connectTimeout: 200,
  });

  userConnection.connect(function (err) {
    if (err) {
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000);
    } else {
      console.log("connection is successfull");
    }
  });
  userConnection.on("error", function (err) {
    console.log("db error", err.code);
    setTimeout(function () {
      handleDisconnect();
    }, 1000);
    console.log(err.code);
  });
}

let upload = multer();

app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser());

app.use(
  cors({
    origin: "*", // Allow requests from any origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow specific HTTP methods
    headers: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
      "*",
    ], // Allow specific headers
    credentials: true, // Enable credentials (cookies, authorization headers)
  })
);

app.options("*", cors());

app.post("/api/getrecord", upload.fields([{ name: "Id" }]), (req, res) => {
  handleDisconnect();
  var returnValue;
  userConnection.query(
    `select * from missingperson where Id = '${req.body.Id}'`,
    function (err, result, fields) {
      if (err) throw err;
      else {
        console.log(result[0]);
        returnValue = result[0];
        res.send(returnValue);
      }
    }
  );
  userConnection.end();
});

app.get("/api/getrecords", (req, res) => {
  handleDisconnect();
  var returnValue;
  userConnection.query(
    `select * from missingperson`,
    function (err, result, fields) {
      if (err) throw err;
      else {
        console.log(result[0]);
        returnValue = result;
        res.send(returnValue);
      }
    }
  );
  userConnection.end();
});

app.post(
  "/api/addrecord",
  upload.fields([
    { name: "firstName" },
    { name: "lastName" },
    { name: "image" },
    { name: "report" },
    { name: "description" },
  ]),
  (req, res) => {
    handleDisconnect();
    let requestBody = req.body;
    let maxNumberId;
    console.log(req.body["firstName"]);

    userConnection.query(
      `select max(distinct Id) as max from missingperson`,
      function (err, result, fields) {
        if (err) throw err;
        else {
          console.log(result[0].max);

          maxNumberId = result[0].max + 1;
          fs.writeFileSync(
            "./Resources/" +
              maxNumberId +
              path.extname(req.files["image"][0].originalname),
            req.files["image"][0].buffer
          );
          handleDisconnect();

          userConnection.query(
            `INSERT INTO missingperson (Id, FirstName, LastName, Image, Report, Description) VALUES ('${
              maxNumberId + path.extname(req.files["image"][0].originalname)
            }', '${requestBody.firstName}', '${
              requestBody.lastName
            }', 'public/${
              maxNumberId + path.extname(req.files["image"][0].originalname)
            }', '${requestBody.report}', '${requestBody.description}')`,
            function (err, result2, fields) {
              if (err) throw err;
              else {
                res.send(Response.OK);
              }
            }
          );
        }
      }
    );

    userConnection.end();
  }
);

app.use("/public", express.static(__dirname + "/Resources/"));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

handleDisconnect();
