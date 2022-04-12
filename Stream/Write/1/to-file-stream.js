import { Writable } from "stream";
import { promises as fs } from "fs";
import { dirname } from "path";
import mkdirp from "mkdirp-promise";

// 직접 스트림을 만들어보자
// ToFileStream 은 하위스트림이라 부르자
export class ToFileStream extends Writable {
  constructor(options) {
    super({ ...options, objectMode: true }); // 객체모드
  }

  /**
   * ToFileStream 인스턴스를 생성하여
   * write 메서드를 실행하면
   * 내부적으로 _write 메서드가 실행된다
   */

  // 오버라이딩
  _write(chunk, encoding, cb) {
    console.log(chunk);
    fs.mkdir(dirname(chunk.path))
      .then(() => console.log("폴더를 생성했습니다 /files"))
      .catch((err) => {
        console.log("폴더가 이미 존재합니다");
      })
      .then(() => fs.writeFile(chunk.path, chunk.content))
      .then(() => cb());

    // 책에나온 mkdirp 이거 좀이상해 위에껄로 쓰자
    // mkdirp(dirname(chunk.path))
    //   .then(() => fs.writeFile(chunk.path, chunk.content))
    //   .then(() => cb())
    //   .catch(cb);
  }
}
