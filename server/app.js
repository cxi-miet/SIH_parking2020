var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var app = express();
//var traffic = require("./routes/traffic");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var residentRouter = require("./routes/residentRouter");
var validateNumberRouter = require("./routes/validateNumber");
var myEmitter = require("./util/emitter");
const mongoose = require("mongoose");

var dev_db_url =
  "mongodb+srv://sihuser:sih_2020@cluster0-mwvql.mongodb.net/parking?retryWrites=true&w=majority";
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/register", residentRouter);
app.use("/validateNumber", validateNumberRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", function(ws) {
  ws.send("<h5>MONITORING...</h5>");
  myEmitter.on("vehicle", (number, result) => {
    console.log(number, result);
    ws.send(number + " is a resident : " + result);
  });
  ws.on("message", function(message) {
    console.log("received: %s", message);
  });
});

module.exports = app;

/*// Node.js WebSocket server script
const http = require('http');
const WebSocketServer = require('websocket').server;
const server = http.createServer();
server.listen(9898);
const wsServer = new WebSocketServer({
    httpServer: server
});
wsServer.on('request', function(request) {
    const connection = request.accept(null, request.origin);
    connection.on('message', function(message) {
      console.log('Received Message:', message.utf8Data);
      connection.sendUTF('Hi this is WebSocket server!');
    });
    connection.on('close', function(reasonCode, description) {
        console.log('Client has disconnected.');
    });
});*/
