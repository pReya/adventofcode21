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

// Check needed array size
const arrSize = Math.max(...input.flat(2)) + 1;

const allPoints = input.map((tuplePair) => findPointsOnLine(tuplePair));

function findPointsOnLine(tuplePair) {
  const [x1, y1] = tuplePair[0];
  const [x2, y2] = tuplePair[1];

  const stepsLength = Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2)) + 1;

  // console.log("Pair: ", tuplePair);
  // console.log("Steps length: ", stepsLength);

  let xSteps = Array(stepsLength).fill(x1);
  if (x1 !== x2) {
    if (x1 < x2) {
      for (let i = 0; i < xSteps.length; i++) {
        xSteps[i] = x1 + i;
      }
    } else {
      for (let i = 0; i < xSteps.length; i++) {
        xSteps[i] = x1 - i;
      }
    }
  }

  let ySteps = Array(stepsLength).fill(y1);
  if (y1 !== y2) {
    if (y1 < y2) {
      for (let i = 0; i < ySteps.length; i++) {
        ySteps[i] = y1 + i;
      }
    } else {
      for (let i = 0; i < ySteps.length; i++) {
        ySteps[i] = y1 - i;
      }
    }
  }

  // console.log("xSteps", xSteps);
  // console.log("ySteps", ySteps);
  // console.log("---");

  const pointsOnLine = [];

  for (let i = 0; i < xSteps.length; i++) {
    pointsOnLine.push([xSteps[i],ySteps[i]]);
  }

  return pointsOnLine;
}

const field = Array(arrSize)
  .fill()
  .map(() => Array(arrSize).fill(0));

// console.log(allPoints);

allPoints.forEach((line) => {
  line.forEach((tuple) => {
    field[tuple[0]][tuple[1]]++;
  });
});

console.log(
  "Found at least 2 crossings this many times: ",
  field.flat(2).filter((x) => x >= 2).length
);
