const Image = require("../model/Image");
const fs = require("fs");
const path = require("path");
const User = require("../model/User");

exports.uploadImage = (req, res, next) => {
  const { userId, size, uploaded_date } = req.body;
  const imageName = req.newFileName;
  const image = new Image(userId, imageName, size, "uploads", uploaded_date);
  image
    .save()
    .then((result) => {
      res
        .status(201)
        .send({ msg: "Image uploaded", generatedName: req.newFileName });
    })
    .catch((err) => {
      res.status(500).send({ err: "internal server error" });
    });
};

exports.getImage = (req, res, next) => {
  var apiKey = req.query.api_key;
  const imageName = req.params.imageName;

  User.checkApikey(apiKey)
    .then((result) => {
      if (result) {
        try {
          res.sendFile(path.join(__dirname, "../uploads", imageName));
        } catch (error) {
          console.log(error);
        }
      } else {
        res.status(401).send("Unauthorized");
      }
    })
    .catch((err) => {
      res.status(500).send("Internal Server Error");
    });
};

exports.getAllImages = (req, res, next) => {
  const { userId } = req.body;

  if (userId === undefined) {
    return res.status(400).send({ err: "Invalid Parameter" });
  }

  Image.getAll(userId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({ err: "Internal Server Error" });
    });
};
