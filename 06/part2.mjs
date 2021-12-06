import { readFileSync } from "fs";

let input = readFileSync(new URL("input2", import.meta.url), "utf8");
input = input
  .split(",")
  .filter(Boolean)
  .map((numString) => Number(numString));

const days = 256;

let fishesByAge = Array(9).fill(0);

input.forEach((fish) => {
  fishesByAge[fish]++;
});

// console.table(fishesByAge);

for (let day = 0; day < days; day++) {
  const clone = [...fishesByAge];
  for (let i = 0; i < fishesByAge.length; i++) {
    clone[i] = fishesByAge[i + 1];
    if (i === fishesByAge.length - 1) {
      clone[fishesByAge.length - 1] = fishesByAge[0];
      clone[6] += fishesByAge[0];
    }
  }
  fishesByAge = clone;
  // console.table(fishesByAge);
}

function arraySum(arr) {
  return arr.reduce((curr, prev) => curr + prev, 0);
}

console.log(arraySum(fishesByAge));
