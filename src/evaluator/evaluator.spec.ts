import { Environment } from "environment";
import { Evaluator } from "evaluator";

const makeSut = () => {
  const environment = new Environment({ age: 18, true: true, false: false, null: null, my_name: "Yazalde Filimone" });
  const sut = new Evaluator();
  const evaluator = new Evaluator(environment);
  return {
    sut,
    evaluator,
    environment,
  };
};

describe("Evaluator", () => {
  it("evaluator: should return number if passe data of type number", () => {
    const { sut } = makeSut();
    expect(sut.eva(1)).toBe(1);
  });
  it("evaluator: should return string if passe data of type string", () => {
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
  it("variable: should return the correct sum and multiplication  numbers", () => {
    const { sut } = makeSut();
    expect(sut.eva(["*", ["+", 4, 5], 3])).toBe((4 + 5) * 3);
  });

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
