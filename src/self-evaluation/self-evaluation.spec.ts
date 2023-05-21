import { SelfEvaluation } from "./self-evaluation";

const makeSut = () => {
  const selfEvaluation = new SelfEvaluation();
  return {
    sut: selfEvaluation,
  };
};

describe("SelfEvaluation", () => {
  it("should return number if passe data of type number", () => {
    const { sut } = makeSut();
    expect(sut.eva(1)).toBe(1);
  });
  it("should return string if passe data of type string", () => {
    const { sut } = makeSut();
    expect(sut.eva(`"hello"`)).toBe("hello");
  });
});
