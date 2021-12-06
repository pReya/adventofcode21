import { readFileSync } from "fs";

let input = readFileSync(new URL("input2", import.meta.url), "utf8");
input = input
  .split(",")
  .filter(Boolean)
  .map((numString) => Number(numString));

function step(states) {
  const newFish = [];
  let newStates = states.map((state) => {
    const nextState = state - 1;

    // Spawn new fish
    if (nextState < 0) {
      newFish.push(8);
      return 6;
    }

    return nextState;
  });

  newStates = [...newStates, ...newFish];

  return newStates;
}

for (let day = 0; day < 256; day++) {
  input = step(input);
}

console.log(input.length);
