import { createServer } from "http";
import { createWriteStream } from "fs";
import { createGunzip } from "zlib";
import { basename, join } from "path";

const server = createServer((req, res) => {
  // {
  //     'content-type': 'application/octet-stream',
  //     'content-encoding': 'gzip',
  //     'x-filename': 'drama.txt',
  //     host: 'localhost:3000',
  //     connection: 'close',
  //     'transfer-encoding': 'chunked'
  // }

  const fileName = basename(req.headers["x-filename"]); // 헤더에는 소문자로 온다
  const destFileName = join("received_files", fileName);
  console.log(`fileName : ${fileName}`);
  console.log(`destFileName : ${destFileName}`);
  console.log(`클라이언트로부터 파일을 받았습니다: ${fileName}`);

  req
    .pipe(createGunzip()) // 압축 해제
    .pipe(createWriteStream(destFileName)) // 쓰기
    .on("finish", () => {
      res.writeHead(201, { "Content-Type": "text/plain" });
      res.end("OK\n");
      console.log(`File saved: ${destFileName}`);
    });
});

server.listen(3000, () => {
  console.log(basename("/a/b/c"));
  console.log("서버 작동중 http://localhost:3000");
});
