import { createReadStream, createWriteStream } from "fs";
import { createGzip } from "zlib";

const filename = process.argv[2];

createReadStream(filename)
  .pipe(createGzip())
  .pipe(createWriteStream(`${filename}.gz`))
  .on("finish", () => {
    console.log("파일 압축 완료");
  });
