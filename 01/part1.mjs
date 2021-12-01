import * as fs from "fs";

let input = fs.readFileSync(new URL("input", import.meta.url), "utf8");
input = input.split("\n");
input = input.map((numberString) => Number(numberString));

let increased = 0;
let decreased = 0;

for (let i = 0; i < input.length - 1; i++) {
  if (input[i - 1] > input[i]) {
    decreased++;
  } else if (input[i - 1] < input[i]) {
    increased++;
  }
}

console.log(`Increased: ${increased} - Decreased: ${decreased}`);
