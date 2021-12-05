import { readFileSync } from "fs";

let input = readFileSync(new URL("input", import.meta.url), "utf8");
input = input.split("\n").filter(Boolean);

// Convert every line into an array of numbers
input = input.map((line) =>
  line.split("").map((lineAsString) => Number(lineAsString))
);

// Setup Done

let oxygenCandidates = JSON.parse(JSON.stringify(input));

for (let i = 0; i < 12; i++) {
  if (oxygenCandidates.length === 1) {
    break;
  }

  const col = getColumn(oxygenCandidates, i);

  // [countZeros, countOnes]
  const counts = [0, 0];

  for (const num of col) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }

  console.log(`Counts ${counts} on line ${i}`);

  if (counts[0] > counts[1]) {
    oxygenCandidates = oxygenCandidates.filter(
      (candidate) => candidate[i] === 0
    );
  } else {
    oxygenCandidates = oxygenCandidates.filter(
      (candidate) => candidate[i] === 1
    );
  }
}
console.log(parseInt(oxygenCandidates[0].join(""), 2));

let scrubberCandidates = JSON.parse(JSON.stringify(input));

for (let i = 0; i < 12; i++) {
  if (scrubberCandidates.length === 1) {
    break;
  }

  const col = getColumn(scrubberCandidates, i);

  // [countZeros, countOnes]
  const counts = [0, 0];

  for (const num of col) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }

  console.log(`Counts ${counts} on line ${i}`);

  // 0 is submissive, keep it
  if (counts[0] <= counts[1]) {
    scrubberCandidates = scrubberCandidates.filter(
      (candidate) => candidate[i] === 0
    );
  } else {
    // 1 is submissive, keep it
    scrubberCandidates = scrubberCandidates.filter(
      (candidate) => candidate[i] === 1
    );
  }
}

console.log(scrubberCandidates);
console.log(parseInt(scrubberCandidates[0].join(""), 2));

function getColumn(arr, index) {
  return arr.map((line) => line[index]);
}

console.log(
  parseInt(scrubberCandidates[0].join(""), 2) *
    parseInt(oxygenCandidates[0].join(""), 2)
);
