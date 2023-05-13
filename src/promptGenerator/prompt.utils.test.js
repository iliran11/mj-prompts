import * as utils from "./utils";

const conf = {
  title: "test",
  parts: ["hello", "${name},", "good", "${time}"],
  variants: {
    var1: ["1", "2"],
    var2: ["1", "2", "3"],
    var3: ["1", "2", "3", "4"],
  },
};

describe("prompts generator", () => {
  test("get Base Prompt", () => {
    const result = utils.getBasePrompt(conf.parts);
    expect(result).toBe("hello ${name}, good ${time}");
  });
  test("get sorted arrays", () => {
    const vars = {
      var1: ["1", "2"],
      var2: ["1", "2", "3"],
      var3: ["1", "2", "3", "4"],
    };
    const result = utils.getSortedArrays(vars);
    expect(result[0]).toHaveLength(2);
    expect(result[1]).toHaveLength(3);
    expect(result[2]).toHaveLength(4);
  });
  test("increment counters1", () => {
    const counters = [
      { state: 0, maxLength: 2 },
      { state: 0, maxLength: 3 },
      { state: 0, maxLength: 4 },
      { state: 0, maxLength: 5 },
    ];
    utils.incrementCounters(counters);
    expect(counters[0].state).toBe(1);
    expect(counters[1].state).toBe(0);
    expect(counters[2].state).toBe(0);
    expect(counters[3].state).toBe(0);
  });
  test("increment counters2", () => {
    const counters = [
      { state: 1, maxLength: 2 },
      { state: 0, maxLength: 3 },
      { state: 0, maxLength: 4 },
      { state: 0, maxLength: 5 },
    ];
    utils.incrementCounters(counters);
    expect(counters[0].state).toBe(0);
    expect(counters[1].state).toBe(1);
    expect(counters[2].state).toBe(0);
    expect(counters[3].state).toBe(0);
  });

  test("increment counters3", () => {
    const counters = [
      { state: 1, maxLength: 2 },
      { state: 2, maxLength: 3 },
      { state: 0, maxLength: 4 },
      { state: 0, maxLength: 5 },
    ];
    utils.incrementCounters(counters);
    expect(counters[0].state).toBe(0);
    expect(counters[1].state).toBe(0);
    expect(counters[2].state).toBe(1);
    expect(counters[3].state).toBe(0);
  });
  test("increment counters4", () => {
    const counters = [
      { state: 1, maxLength: 2 },
      { state: 2, maxLength: 3 },
      { state: 0, maxLength: 4 },
      { state: 4, maxLength: 5 },
    ];
    utils.incrementCounters(counters);
    expect(counters[0].state).toBe(0);
    expect(counters[1].state).toBe(0);
    expect(counters[2].state).toBe(1);
    expect(counters[3].state).toBe(4);
  });
  test("increment counters5", () => {
    const counters = [
      { state: 1, maxLength: 2 },
      { state: 2, maxLength: 3 },
      { state: 3, maxLength: 4 },
      { state: 4, maxLength: 5 },
    ];
    utils.incrementCounters(counters);
    expect(counters[0].state).toBe(0);
    expect(counters[1].state).toBe(0);
    expect(counters[2].state).toBe(0);
    expect(counters[3].state).toBe(-1);
  });
  test("combinations1", () => {
    const matrix = [
      { key: "var1", values: ["1"] },
      { key: "var2", values: ["2", "3"] },
      { key: "var3", values: ["4"] },
    ];
    const result = utils.getCombinations(matrix);
    expect(result).toContainEqual(
      expect.arrayContaining([
        { value: "1", key: "var1" },
        { value: "2", key: "var2" },
        { value: "4", key: "var3" },
      ])
    );
    expect(result).toHaveLength(2);
  });
});
