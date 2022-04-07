import { promises as fs } from "fs";
import { gzip } from "zlib";
import { promisify } from "util";

const gzipPromise = promisify(gzip);

const filename = process.argv[2];

async function main() {
  const data = await fs.readFile(filename);
  const gzippedData = await gzipPromise(data);
  // 만약 컴퓨터가 가진 메모리보다 큰 버퍼의 사이즈를 갖었다면 에러가난다
  await fs.writeFile(`${filename}.gz`, gzippedData);
  console.log("파일 압축 완료");
}

main();
