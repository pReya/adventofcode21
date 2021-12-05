import { readFileSync } from "fs";

let input = readFileSync(new URL("input", import.meta.url), "utf8");
input = input.split("\n\n");

// Convert first line into number array
const moves = input
  .shift()
  .split(",")
  .map((move) => Number(move));

// Convert fields into number arrays
let fields = input.map((field) =>
  field
    .split("\n")
    .filter(Boolean)
    .map((row) =>
      row
        .replace(/  /g, " ")
        .trim()
        .split(" ")
        .map((val) => Number(val))
    )
);

function crossNumber(field, num) {
  return field.map((row) =>
    row.map((candidate) => (candidate === num ? "x" : candidate))
  );
}

function getColumn(arr, index) {
  return arr.map((line) => line[index]);
}

function calculateScore(field) {
  return field.reduce((prevRow, curRow) => {
    const rowScore = curRow.reduce((prevNumber, curNumber) => {
      if (typeof curNumber === "number") {
        return prevNumber + curNumber;
      }
      return prevNumber;
    }, 0);
    return prevRow + rowScore;
  }, 0);
}

function findBingo(field) {
  let foundBingo = false;
  // Check rows
  for (const row of field) {
    if (row.join("") === "xxxxx") {
      foundBingo = true;
      break;
    }
  }

  // Check columns
  if (!foundBingo) {
    for (let i = 0; i < field[0].length; i++) {
      const column = getColumn(field, i);
      if (column.join("") === "xxxxx") {
        console.log("Found Bingo column");
        foundBingo = true;
        break;
      }
    }
  }
  return foundBingo;
}

loopMoves: for (const move of moves) {
  fields = fields.map((field) => crossNumber(field, move));
  for (const [i, field] of fields.entries()) {
    if (findBingo(field)) {
      console.log("Winning field:", field);
      console.log("Found Bingo on move:", move);
      console.log("Field Sum: ", calculateScore(field));
      const score = calculateScore(field) * move;
      console.log("Score: ", score);
      console.log("---");
      // Remove array
      fields.splice(i, 1);
    }
  }
}
