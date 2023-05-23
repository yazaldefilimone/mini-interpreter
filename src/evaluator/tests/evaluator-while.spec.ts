import { Evaluator } from "evaluator";

const makeSut = () => {
  const sut = new Evaluator();
  return {
    sut,
  };
};

describe("Evaluator", () => {
  it("while: should return the correct sum of two numbers", () => {
    const { sut } = makeSut();
    const secondScop = [
      "begin",
      ["var", "y", 0],
      ["var", "counter", 0],
      [
        "while",
        ["<", "y", 10],
        ["begin", ["set", "y", ["+", "x", 1]]],
        ["set", "counter", ["+", "counter", 1]],
        "counter",
      ],
    ];

    expect(sut.eva(secondScop)).toBe(10);
  });
});
