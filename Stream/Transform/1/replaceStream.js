// 읽고,쓰기 가능하며 중간에 변환도 가능한 스트림
import { Transform } from "stream";

/**
 * 사용자 정의 스트림 생성시에
 * _transform(), _flush() 함수를 구현해야한다
 */

export class ReplaceStream extends Transform {
  constructor(searchStr, replaceStr, options) {
    super({ ...options });
    this.searchStr = searchStr;
    this.replaceStr = replaceStr;
    this.tail = "";
  }

  _transform(chunk, encoding, callback) {
    console.log("========================================");
    console.log(`[Before] this.tail : ${this.tail}`);
    console.log(`chunk : ${chunk}`);
    console.log(`this.tail + chunk : ${this.tail + chunk}`);
    const pieces = (this.tail + chunk).split(this.searchStr); // 1
    const lastPiece = pieces[pieces.length - 1]; // 2
    const tailLen = this.searchStr.length - 1; // 검색어 길이
    this.tail = lastPiece.slice(-tailLen);
    pieces[pieces.length - 1] = lastPiece.slice(0, -tailLen);
    console.log(`[After] this.tail : ${this.tail}`);
    console.log("========================================");

    this.push(pieces.join(this.replaceStr)); // 3
    callback();
  }

  _flush(callback) {
    this.push(this.tail);
    callback();
  }
}
