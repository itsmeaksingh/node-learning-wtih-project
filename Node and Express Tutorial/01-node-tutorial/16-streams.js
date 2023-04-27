const { createReadStream } = require("fs");

const stream = createReadStream("../content/big.txt", "utf-8");

stream.on("data", (res) => {
  console.log(res);
});

stream.on("error", (res) => {
  console.log(res);
});
// default 64kb
// last buffer - remainder
// highWaterMark - control size
// const stream = createReadStream("./content/big.txt", {highWaterMark: 90000});
// const stream = createReadStream("../content/big.txt", {encoding: "utf-8"});
