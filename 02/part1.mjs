import { readFileSync } from "fs";

let input = readFileSync(new URL("input", import.meta.url), "utf8");
input = input.split("\n");

let depth = 0;
let hPos = 0;

input.forEach((move) => {
  let [direction, value] = move.split(" ");
  value = Number(value);
  switch (direction) {
    case "forward":
      hPos = hPos + value;
      break;
    case "up":
      depth = depth - value;
      break;
    case "down":
      depth = depth + value;
      break;
    default:
      console.log("Invalid:", { direction, value });
  }
});

console.log(
  `Horizontal Position: ${hPos} – Depth: ${depth} - Product: ${hPos * depth}`
);
