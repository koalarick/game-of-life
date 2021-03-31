const express = require("express");
const path = require("path");
const AWS = require("aws-sdk");
const crypto = require("crypto");

require("dotenv").config("../../.env");
const { uuidv4 } = require("uuid");

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../dist")));

//DB config
const config = {
  aws_table_name: "game-of-life-photos",
  aws_remote_config: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION_NAME,
  },
};

app.get("/photos", (req, res) => {
  AWS.config.update(config.aws_remote_config);
  const docClient = new AWS.DynamoDB.DocumentClient();

  var params = {
    TableName: config.aws_table_name,
  };

  docClient.scan(params, function (err, data) {
    if (err) {
      console.log(err);
      res.send({
        success: false,
        message: err,
      });
    } else {
      const { Items } = data;
      res.send({
        success: true,
        photos: Items,
      });
    }
  });
});

app.post("/photos", (req, res) => {
  AWS.config.update(config.aws_remote_config);
  const docClient = new AWS.DynamoDB.DocumentClient();

  const Item = { ...req.body };
  Item.id = crypto.randomBytes(16).toString("hex");
  var params = {
    TableName: config.aws_table_name,
    Item: Item,
  };

  docClient.put(params, function (err, data) {
    if (err) {
      res.send({
        success: false,
        message: err,
      });
    } else {
      res.send({
        success: true,
        message: "Added photo",
        photo: data,
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
