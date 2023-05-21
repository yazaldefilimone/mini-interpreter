import { Environment } from "~/environment/environment";

type exType<T = any | unknown> = T;

export class SelfEvaluation {
  private globalEnv: Environment;

  constructor() {
    this.globalEnv = new Environment();
  }

  eva(ex: exType, env = this.globalEnv) {
    if (isNumber(ex)) {
      return ex;
    }

    if (isString(ex)) {
      return ex.slice(1, -1);
    }

    if (ex.at(0) === "+") {
      return this.eva(ex.at(1)) + this.eva(ex.at(2));
    }
    if (ex.at(0) === "*") {
      return this.eva(ex.at(1)) * this.eva(ex.at(2));
    }

    if (ex.at(0) === "var") {
      return this.globalEnv.define(ex.at(1), ex.at(2));
    }
    throw `Type Error: ${JSON.stringify(ex)}: unimplemented!`;
  }
}

function isNumber(ex: exType<number>) {
  return typeof ex === "number";
}
function isString(ex: exType<string>) {
  return typeof ex === "string" && ex[0] === '"' && ex.at(-1) === '"';
}
