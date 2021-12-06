import { readFileSync } from "fs";

let input = readFileSync(new URL("input2", import.meta.url), "utf8");
input = input
  .split("\n")
  .filter(Boolean)
  .map((line) =>
    line
      .split(" -> ")
      .map((tuple) => tuple.split(",").map((num) => Number(num)))
  );

// Filter for horizontal or vertical lines only
input = input.filter((pair) => {
  const [x1, y1] = pair[0];
  const [x2, y2] = pair[1];

  return (x1 === x2) | (y1 === y2);
});

// Check needed array size
const arrSize = Math.max(...input.flat(2)) + 1;

const allPoints = input.map((tuplePair) => findPointsOnLine(tuplePair));

function findPointsOnLine(tuplePair) {
  const [x1, y1] = tuplePair[0];
  const [x2, y2] = tuplePair[1];

  // One of the dimensions changes -> find out which, and find the low/high values
  const diff = Math.abs(x1 - x2)
    ? { direction: "x", low: Math.min(x1, x2), high: Math.max(x1, x2) }
    : { direction: "y", low: Math.min(y1, y2), high: Math.max(y1, y2) };

  const staticDimension = diff.direction === "x" ? y1 : x1;

  const pointsOnLine = [];

  for (let i = diff.low; i < diff.high + 1; i++) {
    const newPoint =
      diff.direction === "x" ? [i, staticDimension] : [staticDimension, i];
    pointsOnLine.push(newPoint);
  }

  return pointsOnLine;
}

const field = Array(arrSize)
  .fill()
  .map(() => Array(arrSize).fill(0));

allPoints.forEach((line) => {
  line.forEach((tuple) => {
    field[tuple[0]][tuple[1]]++;
  });
});

console.log(
  "Found at least 2 crossings this many times: ",
  field.flat(2).filter((x) => x >= 2).length
);
