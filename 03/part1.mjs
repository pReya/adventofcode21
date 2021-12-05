import { readFileSync } from "fs";

let input = readFileSync(new URL("input", import.meta.url), "utf8");
input = input.split("\n").filter(Boolean);

// Convert every line into an array of numbers
input = input.map((line) =>
  line.split("").map((lineAsString) => Number(lineAsString))
);

// Transpose 2d array, so we can iterate more easily
const transposed = input[0].map((_, colIndex) =>
  input.map((row) => row[colIndex])
);

let gammaRate = transposed.map((line) => {
  // [countZeros, countOnes]
  const counts = [0, 0];

  for (const num of line) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }

  return counts[0] < counts[1] ? 0 : 1;
});

const epsilonRate = gammaRate.map((bit) => (bit === 0 ? 1 : 0)).join("");

gammaRate = gammaRate.join("");

console.log(`Gamma Rate: ${gammaRate} (${parseInt(gammaRate, 2)})`);
console.log(`Epsilon Rate: ${epsilonRate} (${parseInt(epsilonRate, 2)})`);
console.log(`Product: ${parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)}`);
