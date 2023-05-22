import { Environment } from "environment";

const makeSut = () => {
  const record = {};
  const environment = new Environment(record);
  return {
    sut: environment,
    record,
  };
};

describe("Environment", () => {
  it("should save name and value in storage and returned", () => {
    const { sut, record } = makeSut();
    expect(sut.define("name", 10)).toBe(10);
    expect(record).toHaveProperty("name");
    expect(record).toEqual({ name: 10 });
  });
});
