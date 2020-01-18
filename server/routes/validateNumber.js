const express = require("express");
const mongoose = require("mongoose");
const Residents = require("../models/residents");
const validateNumberRouter = express.Router();
const myEmitter = require("../util/emitter");
validateNumberRouter
  .route("/")

  .post((req, res, next) => {
    var regex = /^[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}$/;
    if (regex.test(req.body.number)) {
      Residents.findOne({ vehicle_numbers: req.body.number }, (err, result) => {
        if (err) return next(err);
        myEmitter.emit("vehicle", req.body.number, Boolean(result));
        if (!result) {
          res.redirect("http://localhost:3000");
        } else {
          res.redirect("http://localhost:3000");
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Not a valid number"
      });
    }
  })

  .get((req, res, next) => {
    res.statusCode = 403;
    res.end("GET operation not supported on /ValidateResident");
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
