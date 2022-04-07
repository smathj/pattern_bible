import { request } from "http";
import { createGzip } from "zlib";
import { createReadStream } from "fs";
import { basename } from "path";

const filename = process.argv[2];
const serverHost = process.argv[3];

const httpRequestOptions = {
  hostname: serverHost,
  port: 3000,
  path: "/",
  method: "PUT",
  headers: {
    "Content-Type": "application/octet-stream",
    "Content-Encoding": "gzip",
    "X-Filename": basename(filename),
  },
};

const req = request(httpRequestOptions, (res) => {
  console.log(`서버로부터 응답을 받았습니다: ${res.statusCode}`);
});

createReadStream(filename)
  .pipe(createGzip())
  .pipe(req)
  .on("finish", () => {
    console.log("파일이 서버로 성공적으로 보내졌습니다");
  });
