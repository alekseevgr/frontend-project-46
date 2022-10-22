import { readFileSync } from 'fs';
const file1 = readFileSync("file1.json", {encoding:'utf8'})
const file2 = readFileSync("file2.json", {encoding:'utf8'})
console.log(typeof(file1))
console.log(file1)
