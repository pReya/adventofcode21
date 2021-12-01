import * as fs from "fs";

let input = fs.readFileSync(new URL("input", import.meta.url), "utf8");
input = input.split("\n");
input = input.map((numberString) => Number(numberString));

let increased = 0;
let decreased = 0;

for (let i = 0; i < input.length - 4; i++) {
  const current = input[i];
  const next = input[i + 1];
  const secondNext = input[i + 2];
  const thirdNext = input[i + 3];

  const sum1 = current + next + secondNext;
  const sum2 = next + secondNext + thirdNext;

  if (sum1 > sum2) {
    decreased++;
  } else if (sum1 < sum2) {
    increased++;
  }
}

console.log(`Increased: ${increased} - Decreased: ${decreased}`);
