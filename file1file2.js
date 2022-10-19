const file1 = {
    "host": "hexlet.io",
    "timeout": 50,
    "proxy": "123.234.53.22",
    "follow": false
  };
const file2 = {
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
};
const newFile = Object.assign(file1, file2);
const newFileTwo = {...file1, ...file2};
console.log(newFile);
console.log(newFileTwo);