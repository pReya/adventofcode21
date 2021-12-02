import { readFileSync } from "fs";

let input = readFileSync(new URL("input", import.meta.url), "utf8");
input = input.split("\n");

let hPos = 0;
let aim = 0;
let depth = 0;

input.forEach((move) => {
  let [direction, value] = move.split(" ");
  value = Number(value);
  switch (direction) {
    case "forward":
      hPos = hPos + value;
      depth = depth + aim * value;
      break;
    case "up":
      aim = aim - value;
      break;
    case "down":
      aim = aim + value;
      break;
    default:
      console.log("Invalid:", { direction, value });
  }
});

console.log(
  `Horizontal Position: ${hPos} – Depth: ${depth} Product: ${hPos * depth}`
);
