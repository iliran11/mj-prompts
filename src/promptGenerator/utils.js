import * as _ from "lodash";

export const getBasePrompt = (parts) => {
  return parts.join(" ");
};

export const getSortedArrays = (vars) => {
  const keys = Object.keys(vars);
  const arrays = [];
  for (const key of keys) {
    arrays.push(vars[key]);
  }
  arrays.sort((a, b) => a.length - b.length);
  return arrays;
};

export const incrementCounters = (counters) => {
  let index = 0;
  let previousReset = true;
  while (index < counters.length) {
    const counter = counters[index];
    if (previousReset) {
      counter.state += 1;
      if (counter.state > counter.maxLength - 1) {
        counter.state = 0;
        previousReset = true;
        if (index === counters.length - 1) {
          counter.state = -1;
        }
      } else {
        previousReset = false;
      }
    }
    index += 1;
  }
};
export const getVariatonsMatrix = (variations) => {
  const combinations = [];
  const arrays = getSortedArrays(variations);
  const counters = arrays.map((x) => ({ state: 0, maxLength: x.length }));
  while (_.last(counters) <= _.last(arrays).length) {
    combinations.push(
      variations.map((variation, index) => {
        variation[index];
      })
    );
    // bump the counters.
    incrementCounters(counters);
  }
};

export const isFinished = (counters) => {
  return _.last(counters).state === -1;
};

export const constructCounters = (variants) => {
  return variants.map((x) => {
    return {
      state: 0,
      maxLength: x.values.length,
      key: x.key,
    };
  });
};

export const getCombinations = (matrix) => {
  const combinations = [];
  const counters = constructCounters(matrix);
  const map = {};
  matrix.forEach((x) => {
    map[x.key] = x;
  });
  while (!isFinished(counters)) {
    combinations.push(
      counters.map((counter) => {
        return { value: map[counter.key].values[counter.state], key: counter.key };
      })
    );
    incrementCounters(counters);
  }
  return combinations;
};
