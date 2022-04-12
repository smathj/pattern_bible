import { createServer } from "http";
import Chance from "chance";

/**
 * 배압 패턴 적용 : 병목 현상 제거
 *
 */
const chance = new Chance();
const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });

  function generateMore() {
    while (chance.bool({ likelihood: 95 })) {
      const randomChunk = chance.string({
        length: 16 * 1024 - 1,
      });
      const shouldContinue = res.write(`${chance.string()}\n`);
      if (!shouldContinue) {
        console.log("back-pressure");
        return res.once("drain", generateMore);
      }
    }
    res.end("\n\n");
  }
  generateMore();

  res.on("finish", () => {
    console.log("All data sent");
  });
});

server.listen(8080, () => {
  console.log("서버 http://localhost:8080");
});
