import * as utils from "./utils";

const getPrompts = (matrix) => {
  const combinations = utils.getCombinations(matrix.variants);
  const basePrompt = matrix.parts.join(" ");
  return combinations.map((comb) => {
    let prompt = basePrompt;
    comb.forEach((variation) => {
      const placeholder = `\$\{${variation.key}\}`;
      prompt = prompt.replace(placeholder, variation.value);
    });
    return prompt
  });
};

export default getPrompts;
