import { Evaluator } from "evaluator";

const makeSut = () => {
  const sut = new Evaluator();
  return {
    sut,
  };
};

describe("Evaluator Self", () => {
  it("evaluator: should return number if passe data of type number", () => {
    const { sut } = makeSut();
    expect(sut.eva(1)).toBe(1);
  });
  it("evaluator: should return string if passe data of type string", () => {
    const { sut } = makeSut();
    expect(sut.eva(`"hello"`)).toBe("hello");
  });
});
