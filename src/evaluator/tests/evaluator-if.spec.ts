import { Evaluator } from "evaluator";

const makeSut = () => {
  const sut = new Evaluator();
  return {
    sut,
  };
};

describe("Evaluator", () => {
  it("math operations: should return the correct sum of two numbers", () => {
    const { sut } = makeSut();
    const secondScop = ["begin", ["var", "y", 2], ["var", "x", 2], ["if", [">", "y", 1], ["set", "x", 10], "x"]];

    expect(sut.eva(secondScop)).toBe(10);
  });
});
