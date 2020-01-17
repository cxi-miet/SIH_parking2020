const express = require("express");
const mongoose = require("mongoose");
const Residents = require("../models/residents");
const validateNumberRouter = express.Router();

validateNumberRouter
  .route("/")

  .get((req, res, next) => {
    var regex = /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/;
    if (regex.test(req.body.number)) {
      Residents.findOne({ family_members: 5 }, (err, result) => {
        if (err) return next(err);
        if (!result) {
          res
            .status(401)

            .json({
              success: false,
              message: "User is not a resident of this building"
            });
        } else {
          res
            .status(200)

            .json({
              success: true,
              message: "User is a Resident of this building!"
            });
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Not a valid number"
      });
    }
  })

  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /ValidateResident");
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /ValidateResident");
  })
  .delete((req, res, next) => {
    res.statusCode = 403;
    res.end("DELETE operation not supported on /ValidateResident");
  });

module.exports = validateNumberRouter;
