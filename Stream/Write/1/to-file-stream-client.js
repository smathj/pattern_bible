import { join } from "path";
import { ToFileStream } from "./to-file-stream.js";
// 스트림 소비자
const tfs = new ToFileStream();

tfs.write({
  path: join("files", "file1.txt"),
  content: "Hello",
});

tfs.write({
  path: join("files", "file2.txt"),
  content: "Node.js",
});

tfs.write({
  path: join("files", "file3.txt"),
  content: "stream",
});

tfs.end(() => {
  console.log("All files created");
});
