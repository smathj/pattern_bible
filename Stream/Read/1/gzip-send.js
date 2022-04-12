// 클라이언트 측 소스

import { request } from "http";
import { createGzip } from "zlib";
import { createReadStream } from "fs";
import { basename } from "path";
import { createDecipheriv, randomBytes } from 'crypto'


const filename = process.argv[2];
const serverHost = process.argv[3];
const secret = Buffer.from(process.argv[4], 'hex')
const iv = randomBytes(16)

const httpRequestOptions = {
  hostname: serverHost,
  port: 3000,
  path: "/",
  method: "PUT",
  headers: {
    "Content-Type": "application/octet-stream",
    "Content-Encoding": "gzip",
    "X-Filename": basename(filename),
    'X-Initialization-Vector': iv.toString('hex')
  },
};

const req = request(httpRequestOptions, (res) => {
  console.log(`서버로부터 응답을 받았습니다: ${res.statusCode}`);
});

createReadStream(filename)
  .pipe(createGzip())
  .pipe(createCipheriv('aes192', secret, iv))
  .pipe(req)
  .on("finish", () => {
    console.log("파일이 서버로 성공적으로 보내졌습니다");
  });
