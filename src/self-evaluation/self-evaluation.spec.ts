import { SelfEvaluation } from "./self-evaluation";

const makeSut = () => {
  const selfEvaluation = new SelfEvaluation();
  return {
    sut: selfEvaluation,
  };
};

describe("SelfEvaluation", () => {
  it("self evaluation expression: should return number if passe data of type number", () => {
    const { sut } = makeSut();
    expect(sut.eva(1)).toBe(1);
  });
  it("self evaluation expression: should return string if passe data of type string", () => {
    const { sut } = makeSut();
    expect(sut.eva(`"hello"`)).toBe("hello");
  });

  it("math operations: should return the correct sum of two numbers", () => {
    const { sut } = makeSut();
    expect(sut.eva(["+", 1, 3])).toBe(1 + 3);
    expect(sut.eva(["+", 190, 3])).toBe(190 + 3);
  });

  it("math operations: should return the correct sum complexeis of  numbers", () => {
    const { sut } = makeSut();
    expect(sut.eva(["+", ["+", 4, 5], 3])).toBe(4 + 5 + 3);
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
  it("math operations: should return the correct sum and multiplication  numbers", () => {
    const { sut } = makeSut();
    expect(sut.eva(["*", ["+", 4, 5], 3])).toBe((4 + 5) * 3);
  });

  it("should return the correct sum and multiplication  numbers", () => {
    const { sut } = makeSut();
    expect(sut.eva(["var", ["x", 10], 10])).toBe(10);
  });
});
