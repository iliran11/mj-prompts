import getPrompts from "./";

const conf = {
  title: "test",
  parts: ["hello", "${name},", "good", "${time}"],
  variants: [
    { key: "name", values: ["john", "chris"] },
    { key: "time", values: ["morning", "evening"] },
  ],
};

describe("prompts", () => {
  test("simple prompt", () => {
    const result = getPrompts(conf);
    expect(result).toContain("hello john, good morning");
    expect(result).toContain("hello john, good evening");
    expect(result).toContain("hello chris, good evening");
    expect(result).toContain("hello chris, good morning");
    expect(result).toHaveLength(4);
  });
});
