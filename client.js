var PROTO_PATH = __dirname + "/stream.proto";

var grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");
var utils = require("./utils");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
var vs = grpc.loadPackageDefinition(packageDefinition).stream_service;

const REMOTE_URL = "localhost:9090";
let client = new vs.StreamService(REMOTE_URL, grpc.credentials.createInsecure());

client
  .getStream({})
  .on("data", function (response) {
    utils.printf(`    🆗 📬 client receive chunk ${response.chnum}`, utils.CONSOLE_COLOR.MAGENTA);
    // console.log(response.stream);
  })
  .on("end", function () {
    console.log("eof");
  });
