import { readFileSync } from "fs";

let input = readFileSync(new URL("input", import.meta.url), "utf8");
input = input
  .split(",")
  .filter(Boolean)
  .map((numString) => Number(numString));

let distances = Array(input.length).fill(0);

function calculateGas(n) {
  return (n * (n + 1)) / 2;
}

distances = distances.map((_, i) =>
  input.reduce((acc, cur) => (acc += calculateGas(Math.abs(cur - i))), 0)
);

console.log(Math.min(...distances));
