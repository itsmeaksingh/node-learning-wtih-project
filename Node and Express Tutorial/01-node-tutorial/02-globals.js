//  GLOBALS - NO window !!!

/*
    __dirname  - path to current directory
    __filename - file name
    require    - funtion to use modules(CommonJS)
    module     - info about current module (file)
    process    - info about env where the program is being executed (imp.)
*/

console.log(__dirname);
console.log(__filename);
console.log(require);
console.log(module);
console.log(process);

setInterval(() => {
  console.log("hi");
}, 1000);
