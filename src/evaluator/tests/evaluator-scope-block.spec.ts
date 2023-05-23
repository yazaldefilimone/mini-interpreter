import { Environment } from "environment";
import { Evaluator } from "evaluator";

const makeSut = () => {
  const sut = new Evaluator();
  const evaluator = new Evaluator();
  return {
    sut,
    evaluator,
  };
};

describe("Evaluator Block Scope", () => {
  it("evaluator scope block: should  can be access value in scope", () => {
    const { sut } = makeSut();
    const result = sut.eva(["begin", ["var", "x", 10], ["var", "y", 20], ["*", "x", "y"]]);
    expect(result).toBe(10 * 20);
  });
  it("evaluator scope block: it must be possible to access value in other block scope", () => {
    const { sut } = makeSut();
    const result = sut.eva(["begin", ["var", "x", 10], ["begin", ["var", "x", 20]], "x"]);
    expect(result).toBe(10);
  });

  it("evaluator scope block: it must be possible to access the return value of another scoped block", () => {
    const { sut } = makeSut();
    const secondScop = ["begin", ["var", "x", 20], ["*", "x", "y"]];
    const firstScop = ["begin", ["var", "y", 10], ["var", "calc", secondScop], "calc"];
    const result = sut.eva(firstScop);
    expect(result).toBe(10 * 20);
  });

  it("evaluator scope block: it must be possible to modify the variable in another scoped block using set", () => {
    const { sut } = makeSut();
    const secondScop = ["begin", ["set", "value", 200]];
    const firstScop = ["begin", ["var", "value", 10], secondScop, "value"];
    const result = sut.eva(firstScop);
    expect(result).toBe(200);
  });
});
