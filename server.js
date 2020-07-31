/**
 * @typedef { import('./utils.js').Utils } Utils
 */

var PROTO_PATH = __dirname + "/stream.proto";

var fs = require("fs");
var grpc = require("grpc");
var utils = require("./utils");

var protoLoader = require("@grpc/proto-loader");
var packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
var streamService = grpc.loadPackageDefinition(packageDefinition).stream_service;

const SERVICE_URL = "0.0.0.0:9090";

function getStream(call) {
  let dataStream = fs.createReadStream("./video/planeta.mp4");
  let pos = 0;
  dataStream
    .on("data", function (chunk) {
      // console.log(chunk);
      utils.printf(`\n server send chunk ${pos} 📡`, utils.CONSOLE_COLOR.RED);
      // process.stdout.write(`\n server send chunk ${pos} 📡`);
      call.write({ stream: chunk, chnum: pos++ });
    })
    .on("end", function () {
      call.end();
    });
}

function getServer() {
  var server = new grpc.Server();
  server.addService(streamService.StreamService.service, {
    getStream: getStream,
  });
  return server;
}

if (require.main === module) {
  // If this is run as a script, start a server on an unused port
  var server = getServer();

  server.bind(SERVICE_URL, grpc.ServerCredentials.createInsecure());
  console.log(`server started on ${SERVICE_URL}`);
  server.start();
}

exports.getServer = getServer;
