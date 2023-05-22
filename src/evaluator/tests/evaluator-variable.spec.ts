import { Environment } from "environment";
import { Evaluator } from "evaluator";

const makeSut = () => {
  const environment = new Environment({ age: 18, true: true, false: false, null: null, my_name: "Yazalde Filimone" });
  const sut = new Evaluator();
  const evaluator = new Evaluator(environment);
  return {
    sut,
    evaluator,
  };
};

describe("Evaluator Math", () => {
  it("variable: should return the correct variable before created", () => {
    const { sut } = makeSut();
    expect(sut.eva(["var", "x", 10])).toBe(10);
  });
  it("variable: should return the correct variable that was created", () => {
    const { sut } = makeSut();
    sut.eva(["var", "x", 10]);
    expect(sut.eva("x")).toBe(10);
  });
  it("variable: should return the correct variable that was created in other environment", () => {
    const environment = new Environment({ age: 18, my_name: "Yazalde Filimone" });
    const sut = new Evaluator(environment);
    expect(sut.eva("age")).toBe(18);
  });
  it("variable: teste with set Environment data", () => {
    const { evaluator } = makeSut();
    evaluator.eva(["var", "isUser", "true"]);
    expect(evaluator.eva("isUser")).toBe(true);
  });
  it("variable: create variable with math operation", () => {
    const { evaluator } = makeSut();
    expect(evaluator.eva(["var", "math", ["*", 2, 2]])).toBe(2 * 2);
    expect(evaluator.eva("math")).toBe(2 * 2);
  });
});
