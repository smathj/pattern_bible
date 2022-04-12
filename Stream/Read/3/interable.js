import { Readable } from "stream";

/**
 * 이터러블하다면 이 패턴을 사용할 수 있다
 */

const pizza = ["콤비네이션", "페퍼로니", "포테이토베이컨", "고구마"];

const pizzaStream = Readable.from(pizza);

pizzaStream.on("data", (pizza) => {
  console.log(`pizza : ${pizza}`);
});
