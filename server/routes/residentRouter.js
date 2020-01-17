const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const residentRouter = express.Router();

residentRouter
  .route("/")

  .get((req, res, next) => {
    Residents.find({})
      .then(
        residents => {
          res.statusCode = 200;

          res.json(residents);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .post((req, res, next) => {
    Residents.create(req.body)
      .then(
        resident => {
          console.log("resident Created ", resident);
          res.statusCode = 200;

          res.json(resident);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /residents");
  })
  .delete((req, res, next) => {
    Residents.remove({})
      .then(
        resp => {
          res.statusCode = 200;

          res.json(resp);
        },
        err => next(err)
      )
      .catch(err => next(err));
  });

residentRouter
  .route("/:residentNo")
  .get((req, res, next) => {
    Residents.findById(req.params.residentNo)
      .then(
        resident => {
          res.statusCode = 200;

          res.json(resident);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end(
      "POST operation not supported on /resident/" + req.params.residentNo
    );
  })
  .put((req, res, next) => {
    Residents.findByIdAndUpdate(
      req.params.residentNo,
      {
        $set: req.body
      },
      { new: true }
    )
      .then(
        resident => {
          res.statusCode = 200;

          res.json(resident);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .delete((req, res, next) => {
    Residents.findByIdAndRemove(req.params.residentNo)
      .then(
        resp => {
          res.statusCode = 200;

          res.json(resp);
        },
        err => next(err)
      )
      .catch(err => next(err));
  });
module.exports = residentRouter;
