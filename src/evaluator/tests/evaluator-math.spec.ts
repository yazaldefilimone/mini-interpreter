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
    expect(sut.eva(["+", 1, 3])).toBe(1 + 3);
    expect(sut.eva(["+", 190, 3])).toBe(190 + 3);
  });

  it("math operations: should return the correct sum complexeis of  numbers", () => {
    const { sut } = makeSut();
    expect(sut.eva(["+", ["+", 4, 5], 3])).toBe(4 + 5 + 3);
  });

  it("math operations: -", () => {
    const { sut } = makeSut();
    expect(sut.eva(["-", 2, 3])).toBe(2 - 3);
  });

  it("math operations: should return the correct multiplication of two numbers", () => {
    const { sut } = makeSut();
    expect(sut.eva(["*", 1, 3])).toBe(1 * 3);
    expect(sut.eva(["*", 190, 3])).toBe(190 * 3);
  });

  it("math operations: should return the correct multiplication complexeis of  numbers", () => {
    const { sut } = makeSut();
    expect(sut.eva(["*", ["*", 4, 5], 3])).toBe(4 * 5 * 3);
  });
  it("variable: should return the correct sum and multiplication  numbers", () => {
    const { sut } = makeSut();
    expect(sut.eva(["*", ["+", 4, 5], 3])).toBe((4 + 5) * 3);
  });
});
